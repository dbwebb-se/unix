var http = require('http');
var querystring = require('querystring');

class RestGame {
    constructor() {
        process.stdin.setEncoding('utf8');
        this.started = false;
    }

    printMap(board) {
        process.stdout.write('\n ');
        for (var i = 0; i < board.length; i += 1) {
            process.stdout.write(' ' + i);
        }
        process.stdout.write('\n');
        for (var x = 0; x < board.length; x += 1) {
            process.stdout.write(x + '|');
            for (var y = 0; y < board.length; y += 1) {
                process.stdout.write(board[x][y] + '|');
            }
            process.stdout.write('\n');
        }
    }
    /**
     * Print usage for a command or the game
     * @param String command default = none
     */
    usage(command = false) {
        if (command instanceof String) {
            command = command.toLowerCase();
        }
        switch (command) {
            case 'place':
                this.write(
                    '\tPlaces a mark on the gameboard.\n' +
                    '\tUsage: place row column\n' +
                    '\tExample: place 1 2\n'
                );
                break;
            case 'clear':
                this.write(
                    '\tClears the screen\n' +
                    '\tUsage: clear\n'
                );
                break;
            case 'start':
                this.write(
                    '\tStarts a new game\n' +
                    '\tUsage: start\n'
                );
                break;
            case 'current':
                this.write(
                    '\tDisplays the current player\n' +
                    '\tUsage: current'
                );
                break;
            case 'quit':
                this.write(
                    '\tExit the program\n' +
                    'Usage: quit\n'
                );
                break;
            default:
                this.write(
                    '\tHelp | Help [command]:\tDisplays usage about the command or the game\n' +
                    '\tQuit:\t\t\tExit the program\n' +
                    '\tStart:\t\t\tStarts a new game\n' +
                    '\tPrint:\t\t\tPrints the gameboard\n' +
                    '\tPlace [arguments]:\tCurrent player place a mark on the game board\n' +
                    '\tCurrent:\t\tDisplays the current player\n' +
                    '\tClear:\t\t\tClears the screen\n'
                );
        }
    }

    /**
     * Writes to the output stream
     * @param  String str what should be written
     */
    write(str) {
        process.stdout.write(str);
    }

    /**
     * Places a mark on given params
     * @param  Integer x
     * @param  Integer y
     */
    place(x, y) {
        var postData = querystring.stringify({
            row: x,
            col: y,
            gameid: this.gameid
        });

        var options = {
          hostname: 'localhost',
          port: 1337,
          path: '/place',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
          }
      };

      var req = http.request(options, (res) => {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', () => {
                var parsed = JSON.parse(body);
                this.printMap(parsed.board);
                this.write(parsed.text + '\n');
                this.write(': ');
            });
        });

        req.on('error', (e) => {
        console.log('problem with request: ' + e.message);
        });

        // write data to request body
        req.write(postData);
        req.end();
    }

    /**
     * Starts the game loop
     */
    run() {
        process.stdin.on('readable', () => {
            var chunk = process.stdin.read();

            if (chunk !== null) {
                var parts = chunk.replace('\n', '').toLowerCase().split(' ');

                switch (parts[0]) {
                    case 'place':
                        if (this.started) {
                            if (parts[1] && parts[2]) {
                                this.place(parts[1], parts[2]);
                            } else {
                                this.write('\tError: x or y missing!\n\n');
                                this.usage('place');
                            }
                        } else {
                            this.write('\tGame not started yet\n');
                        }
                        break;
                    case 'start':
                        if (!this.started) {
                            this.write('New game started!\n');
                            http.get({
                                host: '127.0.0.1',
                                port: 1337,
                                path: '/'
                            }, (response) => {
                                var body = '';
                                response.on('data', (d) => {
                                    body += d;
                                });
                                response.on('end', () => {
                                    var parsed = JSON.parse(body);
                                    if (parsed.code === 200) {
                                        this.gameid = parsed.gameid;
                                        this.started = true;
                                        this.printMap(parsed.board);
                                        this.write(parsed.next + ' starts\n: ');
                                    }
                                });
                            });
                        } else {
                            this.write('Game already started\n');
                        }
                        break;
                    case 'current':
                        if (this.started) {
                            this.write(this.core.getCurrentPlayer() + '\'s turn.\n');
                        } else {
                            this.write('Game not started.\n');
                        }
                        break;
                    case 'help':
                        this.usage(parts[1]);
                        break;
                    case 'print':
                        http.get({
                            host: '127.0.0.1',
                            port: 1337,
                            path: '/map/?gameid=' + this.gameid
                        }, (response) => {
                            var body = '';
                            response.on('data', (d) => {
                                body += d;
                            });
                            response.on('end', () => {
                                var parsed = JSON.parse(body);
                                if (parsed.code === 200) {
                                    this.printMap(parsed.board);
                                    this.write(': ');
                                }
                            });
                        });
                        break;
                    case 'exit':
                    case 'quit':
                        process.exit(0);
                        break;
                    case 'clear':
                        for (var i = 0; i < 50; i += 1) {
                            this.write('\n');
                        }
                        break;
                    default:
                        this.write('\nArgument don\'t match any menu-option\n');
                        break;
                }
            } else {
                this.write(
                    'Options:\n' +
                    '\tHelp)\n' +
                    '\tQuit)\n' +
                    '\tStart)\n'
                );
            }
            this.write(': ');
        });
    }
}

export default RestGame;
