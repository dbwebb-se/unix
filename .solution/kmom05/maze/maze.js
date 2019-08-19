/**
 *
 */

import Router from '../router/router';

var router = new Router();

var fs = require('fs');
var http = require('http');

var maps = [];
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
        case 'zip':
            contentType = {
                'Content-Type': 'application/octet-stream'
            };
            break;
        case 'csv':
            contentType = {
                'Content-Type': 'text/csv'
            };

            var temp = [];
            var values = [];
            for (var t in content) {
                if (t === 'directions') {
                    for (var dir in content[t]) {
                        temp.push(dir);
                        values.push(content[t][dir]);
                    }
                } else {
                    temp.push(t);
                    values.push(content[t]);
                }
            }
            content = '';
            temp.forEach((t) => {
                content += t += ',';
            });
            content = content.replace(/,$/g, '\n');
            values.forEach((t) => {
                content += t += ',';
            });
            content = content.replace(/,$/g, '\n');
            break;
    }
    resObj.writeHead(code, contentType);
    resObj.write(content);
    resObj.end();
}

/**
 * Initialize the maze
 * @param Object req The request
 * @param Object res The response
 */
router.get('/', (req, res) => {
    var type = req.query.type;
    var gameid = ((String)(Math.random() * 100)).replace('.', '').substr(0, 5);
    var content = {
        text: 'New game initialized',
        gameid: gameid
    };

    games[gameid] = {
        currentMap: null,
        lastRoom: null
    };

    sendResponse(res, content, 200, type);
});

/**
 * Retuns list of all avaliable maps
 * @param Object req The request
 * @param Object res The response
 */
router.get('/map', (req, res) => {
    maps = fs.readdirSync(__dirname + '/maps');
    var type = req.query.type;

    // Filter away all non json-files
    maps = maps.filter((map) => map.includes('.json'));

    sendResponse(res, maps, 200, type);
});

/**
 * Loads the map to the maze
 * @param Object req The request
 * @param Object res The response
 */
router.get('/:gameid/map/:map', (req, res) => {
    var map = req.params.map;
    var gameid = req.params.gameid;
    var type = req.query.type;

    if (!map.includes('.json')) {
        map += '.json';
    }

    if (maps.indexOf(map) === -1)  {
        sendResponse(res, 'Map not found', 404, 'plain');
        games[gameid].currentMap = null;
        return;
    }

    var path = __dirname + '/maps/' + map;
    // creates a unique game
    games[gameid] = {};

    // Reads the new map json
    games[gameid].currentMap = require(path);
    //console.log(games[gameid]);
    sendResponse(res, {
        'text': 'New map selected.'
    }, 200, type);
});

/**
 * Gets content of first room
 * @param Object req The request
 * @param Object res The response
 */
router.get('/:gameid/maze', (req, res) => {
    var gameid = req.params.gameid;
    var type = req.query.type;

    if (games[gameid] === undefined) {
        sendResponse(res, {
            'text': 'A game with that gameid don\'t exist'
        }, 500, type);
        return;
    }

    if (games[gameid].currentMap === null) {
        sendResponse(res, {
            'text': 'Map not selected.',
            'hint': 'Call /map/:map first'
        }, 500, type);
        return;
    }

    games[gameid].lastRoom = games[gameid].currentMap[0];

    sendResponse(res, games[gameid].lastRoom, 200, type);
});

/**
 * Gets info about the room
 * @param Object req The request
 * @param Object res The response
 */
router.get('/:gameid/maze/:roomId', (req, res) => {
    var gameid = req.params.gameid;
    var type = req.query.type;

    if (games[gameid] === undefined) {
        sendResponse(res, {
            'text': 'A game with that gameid don\'t exist'
        }, 500, type);
        return;
    }

    if (games[gameid].currentMap === null) {
        sendResponse(res, 'Content not loaded', 404, type);
        return;
    }
    var id = req.params.roomId;

    games[gameid].current = games[gameid].currentMap[id];

    if (games[gameid].current === undefined) {
        sendResponse(res, 'Room not found', 404, 'plain');
        return;
    }

    sendResponse(res, games[gameid].current, 200, type);
});

/**
 * Walks into next room from given roomId and gives the next rooms info.
 * @param Object req The request
 * @param Object res The response
 */
router.get('/:gameid/maze/:roomId/:direction', (req, res) => {
    var gameid = req.params.gameid;
    var id = req.params.roomId;
    var dir = req.params.direction;
    var type = req.query.type;

    if (games[gameid] === undefined) {
        sendResponse(res, {
            'text': 'A game with that gameid don\'t exist'
        }, 500, type);
        return;
    }

    if (games[gameid].currentMap === null) {
        sendResponse(res, 'Content not loaded', 404, 'plain');
        return;
    }

    var current = games[gameid].currentMap[id];

    // Check if its not a valid path choosen
    if (current.directions[dir] === undefined) {
        current.error = 'Direction not allowed';
        sendResponse(res, current, 404, type);
        return;
    }

    var temp = games[gameid].lastRoom;
    // Gets the room next room
    var lastRoom = games[gameid].currentMap[current.directions[dir]];

    if (lastRoom === undefined) {
        lastRoom = temp;
        current.error = 'Path dont exist';
        sendResponse(res, current, 404, type);
        return;
    }

    games[gameid].lastRoom = lastRoom;
    sendResponse(res, lastRoom, 200, type);
});

var server = http.createServer((req, res) => {
        router.route(req, res);
});

export default server;
