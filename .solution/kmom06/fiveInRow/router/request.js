/**
 * Response
 */


var url = require('url');
export function buildRequest (req, res) {
    // stupid jshint gives error on res not being used..
    /*jshint unused:false*/
    req = req || {};


    req.params = {};
    req.query = url.parse(req.url, true).query;

    return req;
}
