
class Game {
    constructor(core) {
        process.stdin.setEncoding('utf8');
        this.core = core;
        this.started = false;
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
        try {
            var playa = this.core.getCurrentPlayer();
            this.core.place(x, y);
            var winner = this.core.getWinner();
            this.core.printMap();
            if (winner) {
                this.write('WE HAVE A WINNER!!!: ' + winner + '\n');
                process.exit(0);
            } else {
                this.write(playa + ' placed. ' + this.core.getCurrentPlayer() + ' turn now\n');
            }
        } catch (e) {
            this.write('\t' + e.message + '\n');
            this.write('\t' + this.core.getCurrentPlayer() + ' turn again\n');
        }
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
                            this.core.printMap();
                            this.write(this.core.getCurrentPlayer() + ' starts\n');
                            this.started = true;
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
                        this.core.printMap();
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

export default Game;
