import Router from './router/router';
import Core from './core';

var router = new Router();

var games = [];

/**
 * Wrapper function for sending a response
 * @param  Object        resObj  The response
 * @param  Object/String content What should be written to the response
 * @param  Integer       code    HTTP status code
 * @param  String        type    Content-Type of the response
 */
function sendResponse(resObj, content, code = 200, type = 'json') {
    var contentType;
    switch (type) {
        default:
        case 'json':
            contentType = {
                'Content-Type': 'application/json'
            };
            content = JSON.stringify(content);
            break;
        case 'plain':
            contentType = {
                'Content-Type': 'text/plain'
            };
            break;
        case 'html':
            contentType = {
                'Content-Type': 'text/html'
            };
            break;
    }
    resObj.writeHead(code, contentType);
    resObj.write(content);
    resObj.end();
}

router.get('/', (req, res) => {
    var size = req.query.size || 10;
    var id = games.length;
    games[id] = new Core(size);
    sendResponse(res, {
        text: 'New game initialized',
        gameid: id,
        board: games[id].getMap(),
        next: games[id].getCurrentPlayer(),
        code: 200
    }, 200);
});

/**
 * Returns the gameboard
 */
router.get('/map/', (req, res) => {
    var id = req.query.gameid;

    if (!id) {
        sendResponse(res, {
            'text': 'Missing gameid',
            'code': 500
        }, 500);
        return;
    }

    if (games[id] === undefined) {
        sendResponse(res, {
            'text': 'A game with that game id don\'t exist',
            'code': 500
        });
        return ;
    }

    var board = games[id].getMap();

    var content = {
        text: 'Game board',
        gameid: id,
        board: board,
        code: 200
    };
    sendResponse(res, content);
});

router.post('/place', (req, res) => {
    var body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        var params = require('querystring').parse(body);

        var row = params.row;
        var col = params.col;
        var id = params.gameid;

        if (!id) {
            sendResponse(res, {
                text: 'Missing gameid',
                code: 500
            }, 500);
            return;
        }

        if (games[id] === undefined) {
            sendResponse(res, {
                text: 'A game with that game id don\'t exist',
                code: 404
            }, 404);
            return;
        }
        try {
            var text;
            var playa = games[id].getCurrentPlayer();
            games[id].place(col, row);
            var winner = games[id].getWinner();
            games[id].printMap();
            if (winner) {
                text = 'We have a winner!' + winner + ' after ' + games[id].getNrOfMarksPlaced() + ' rounds.';
                sendResponse(res, {
                    text: text,
                    board: games[id].getMap(),
                    code: 200
                }, 200);

                // removes the old game.
                games[id] = null;
                console.log(text);
            } else {
                text = playa + ' placed. ' + games[id].getCurrentPlayer() + ' turn now';
                console.log(text);
                sendResponse(res, {
                    text: text,
                    board: games[id].getMap(),
                    code: 200
                }, 200);
            }
        } catch (e) {
            text = e.message + '. ' + games[id].getCurrentPlayer() + ' turn again';
            sendResponse(res, {
                text: text,
                board: games[id].getMap(),
                code: 200
            }, 200);
        }
    });
});

require('http').createServer((req, res) => {
    router.route(req, res);
}).listen(1337);
