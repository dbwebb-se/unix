export function buildResponse(req, res) {
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
        res.write(body, statusCode);
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
