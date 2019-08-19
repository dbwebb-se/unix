/**
 * To run this file ou need to have these installed globaly:
 * npm install -g babel
 * npm install -g nodemon
 *
 * Then run this command:
 * nodemon --exec babel-node --stage 0 -- server.js
 */

var url  = require('url');
var http = require('http');
var fs   = require('fs');

var PORT = 1337;
var code = 200;

/**
 * Wrapper function for sending a response
 * @param  Object        resObj  The response object
 * @param  Object/String content What should be written to the response
 * @param  Integer       code    HTTP status code
 * @param  String        type    Content-Type of the response
 */
function sendResponse(resObj, content, code = 200, type = 'json') {
    // SKA STUDENTEN FÅ DETTA?
    var contentType = null;
    switch (type) {
        default:
        case 'json':
            contentType = { 'Content-Type': 'application/json' };
            content = JSON.stringify(content);
            break;
        case 'plain':
            contentType = { 'Content-Type': 'text/plain' };
            break;
        case 'html':
            contentType = { 'Content-Type': 'text/html' };
            break;
        case 'zip':
            contentType = { 'Content-Type': 'application/zip' };
            break;
    }
    resObj.writeHead(code, contentType);
    resObj.write(content);
    resObj.end();
}

/**
 * Returns the status of the system
 * @return Object
 */
function getStatus() {
    var status = {};
    // Student defined logic
    status.time = new Date();
    status.message = 'I\'m fine :-D';
    return status;
}

/**
 * Get file content of a file
 * @param  String filename
 * @param  String directory The directory where to find the file
 * @return Object           The content of the file
 */
function readFile(filename, directory = 'public/') {
    var content = "";
    try {
        content = fs.readFileSync(__dirname + '/' + directory + filename);
    } catch (e) {
        console.log(e.name + ': node' + e.message);
        return e.message;
    }

    return content;
}

// Creates the server object
var server = http.createServer((request, response) => {
    // Gets the request url
    var path = url.parse(request.url).pathname;
    // Gets the query string as an object
    var queryObject = (url.parse(request.url, true)).query;

    // Switches on given path
    switch (path) {
        /**
         * Respond to the server with a plain word
         */
        case '/':
            // Student defined logic
            sendResponse(response, 'Hello world', code, 'plain');
            break;

        /**
         * Respondes with a zip file
         */
        case '/zip':
            var zipedFile = readFile('myZip.zip');

            // if we got an error from the readFile the html will be a String
            // and there for need to change Content-Type to plain
            if (zipedFile instanceof String) {
                sendResponse(response, zipedFile, 404, 'plain');
            } else {
                // Send the zip file
                sendResponse(response, zipedFile, code, 'zip');
            }
            break;

        /**
         * Respond with an html-page
         */
        case '/index.html':
            // Student defined logic

            var html = readFile('index.html');
            var type = 'html';

            // if we got an error from the readFile the html will be a String
            // and there for need to change Content-Type to plain
            if (html instanceof String) {
                type = 'plain';
                code = 500;
            }
            sendResponse(response, html, code, type);
            break;

        /**
         * Returns the status of the system
         */
        case '/status':
            var status = getStatus();
            sendResponse(response, status, code, 'json');
            break;

        /**
         * Summarize the query paramters and return the sum
         */
        case '/sum':
            // Student defined logic
            var content = {};
            var sum = 0;

            if (queryObject.a && queryObject.b && queryObject.c) {
                sum = parseInt(queryObject.a) + parseInt(queryObject.b) + parseInt(queryObject.c);

                content.sum = sum;
                if (sum === 42) {
                    content.message = 'Answer to everything';
                }
            } else {
                code = 406;
                content.message = '406 Not Acceptable';
                content.verbose = 'Missing query parameters';
            }
            sendResponse(response, content, code);
            break;

        /**
         * Filter away every query param that is larger than 42
         */
        case '/filter':
            // Student defined logic
            code = 200;
            content = {};

            var arr = Object.values(queryObject).filter((i) => i > 42);

            content.arr = arr;
            sendResponse(response, content, code);
            break;

        /**
         * Nothing match the path. Send 404
         */
        default:
            sendResponse(response, '404 File not found', 404, 'plain');
            break;
    }
});

server.listen(PORT);
console.log('Server is now listening on port: ' + PORT);
