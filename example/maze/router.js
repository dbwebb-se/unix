/**
 * Router
 *
 * Example usage..
 *
 * var http = require('http');
 * var router = new Router();
 *
 * // Write a simple route..
 * router.get('/', function(req, res) {
 *  res.end('hello');
 * });
 *
 * http.createServer(function (req, res) {
 *    router.route(req, res);
 * }).listen(1337);
 *
 */
"use strict";

const url = require('url');

/*import { buildResponse } from './response';
import { buildRequest } from './request';*/



/**
 * Removes the last slash of a string
 * @param  String str
 * @return String
 */
function trimSlashes(str) {
    if (str.length > 1 && str.indexOf('/', str.length - '/'.length) !== -1) {
        str = str.substr(0, str.length - 1);
    }

    return str;
}



/**
 * Utility
 */
function buildRequest(req/*, res*/) {
    // stupid jshint gives error on res not being used..
    /*jshint unused:false*/
    req = req || {};
    req.params = {};
    req.query = url.parse(req.url, true).query;
    req.queryParts = url.parse(req.url, true);

    req.rawBody  = '';
    // Takes care of any data that comes frome a post-request
    req.on('data', (chunk) => {
        req.rawBody += chunk;
    });

    return req;
}



/**
 * Utility
 */
function buildResponse(req, res) {
    res = res || {};

    /**
     * Send a response
     * @param  string|object body   The body you want to send
     * @param  integer contentType Content type: text/plain, application/json
     * @param  integer statusCode  HTTP status code
     * @return obj
     */
    res.send = function send(body, contentType, statusCode) {
        // Ensure charset is set.
        res.charset = res.charset || 'utf-8';
        res.statusCode = statusCode || res.statusCode || 200;
        res.body = body;
        res.headers = 'text/html';

        // Set the content type.
        if (contentType) {
            this.setHeader('Content-Type', contentType);
        } else {
            this.setHeader('Content-Type', 'text/html');
        }

        // Switch on the type of the body.
        switch (typeof body) {
            case 'string':
                if (!this.get('Content-Type')) {
                    this.setHeader('Content-Type', 'text/html');
                }
                break;

            case 'boolean':
            case 'number':
            case 'object':

                if (body === null) {
                    body = '';
                }
                // Stringify the body to valid JSON.
                body = JSON.stringify(body);

                break;
        }

        // Write and end..
        res.write(body);
        res.end();
    };

    /**
     * Send json as response
     * @param  object body   The body you want to send
     * @return
     */
    res.json = function sendJson(body) {
        if (!this.get('Content-Type')) {
            this.setHeader('Content-Type', 'application/json');
        }
        return res.send(body, 'application/json', 200);
    };

    /**
     * Shorthand getHeader function.
     * @param  string field
     * @return string
     */
    res.get = function(field) {
        return this.getHeader(field);
    };

    return res;
}



/**
 * @version 1.1
 */
class Router {
    constructor() {
        this.routes = [];
        this.methods = {
            'GET': 'get',
            'POST': 'post',
            'PUT': 'put',
            'DELETE': 'delete'
        };
    }

    /**
     * Add a route
     * @param String    method  The method e.g GET/POST/PUT/DELETE
     * @param String    path    The path to the route
     * @param Function  handler The function for the route.
     */
    add(method, path, handler) {
        if (typeof handler !== 'function') {
            throw 'No handler function was passed';
        }

        // Push to the routes array.
        this.routes.push({
            method: method,
            path: path,
            handler: handler
        });
    }

    /**
     * Shorthand GET route
     * @param  String   path    The path to the route
     * @param  Function handler The function for the route.
     */
    get(path, handler) {
        this.add('GET', path, handler);
    }

    /**
     * Shorthand POST route
     * @param  String   path    The path to the route
     * @param  Function handler The function for the route.
     */
    post(path, handler) {
        this.add('POST', path, handler);
    }

    /**
     * Route
     * @param  Object req HTTP request object
     * @param  {[type]} res HTTP response object
     */
    route(req, res) {
        // Extend request and response object.
        req = buildRequest(req, res);
        res = buildResponse(req, res);

        // Get the path and the method.
        var path = trimSlashes(url.parse(req.url).pathname);
        var method = req.method;

        // Split the path to get the parameters.
        var urlParams = path.split('/');

        // Filter out the routes to process..
        var routesToProcess = this.routes.filter(function (r) {
            // remove trailing slash from the current path, if they exist.
            r.path = trimSlashes(r.path);

            // Split the current params.
            var params = r.path.split('/');

            // If the parameters lenght is not the same, it's not the route we are looking for.
            if (params.length !== urlParams.length) {
                return false;
            }

            // Get params.
            var currentParams = params.filter(function (p) {
                return p.includes(':');
            });

            var found = [];

            // Get all "special" params. :
            for (var i = 0; i < params.length; i += 1) {
                if (params[i].includes(':')) {
                    found.push(urlParams[i]);
                }
            }

            // if we have special params.
            if (found.length > 0) {
                // Add the params to req.params.
                currentParams.forEach((el, index) => {
                    req.params[el.substr(1, el.length)] = found[index];
                });
            }

            var counter = 0;

            for (var x = 0; x < urlParams.length; x += 1)  {
                // Do the actual check if the route matches.
                if (urlParams[x] === params[x] || params[x].includes(':')) {
                    counter += 1;
                }
            }
            // If the counters match and the method is the same -> valid route.
            return counter === urlParams.length && method === r.method;
        });

        // If we have no routes, write 404.
        if (!routesToProcess || routesToProcess.length === 0) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }

        // Handle the request.
        routesToProcess.forEach(function (route) {
            req.on('end', () => {
                // Does the raw body have any data?
                if (req.rawBody !== '') {
                    console.log(req.headers['content-type']);
                    var body;

                    // What type of data is? Which method of parsing
                    // the data does I need?
                    switch (req.headers['content-type']) {
                        case 'application/json':
                            body = JSON.parse(req.rawBody);
                            break;
                        default:
                        case 'applicaton/x-www-form-urlencoded':
                            body = require('querystring').parse(req.rawBody);
                            break;
                    }
                    req.body = body;
                }

                // Calling the function.
                route.handler(req, res);
            });
        });
    }

    /**
     * Returns the number of routes added.
     * @return Integer
     */
    nrOfRoutes() {
        return this.routes.length;
    }

    /**
     * Group routes
     * @param  String   path     Name on the group of routes
     * @param  Function callback
     */
    group(path, callback) {
        if (!path) {
            throw new Error('No path passed');
        }

        if (typeof callback !== 'function') {
            throw new Error('No handler function was passed');
        }

        var oldLen = this.routes.length;

        callback();
        var length = this.routes.length - oldLen;

        for (var i = this.routes.length; i > this.routes.length - length; i = i - 1) {
            this.routes[i - 1].path = path + this.routes[i - 1].path;
        }
    }
}

//export default Router;
module.exports = Router;
