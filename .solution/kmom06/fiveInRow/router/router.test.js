/**
 * Router tests
 */
process.env.NODE_ENV = 'test';
import Router from '../router/router';
var http = require('http');

// Dependencies needed for tests.
var assert = require('assert');
var request = require('supertest');
describe('Router', () => {
    var router;

    beforeEach(function(done) {
        router = new Router();
        done();
    });

    afterEach(function(done) {
        done();
    });

    function setupServer() {
        return http.createServer(function (req, res) {
            router.route(req, res);
        });
    }

    describe('Route', () => {
        it('Should not route to non-existent routes', (done) => {
            request(setupServer())
                .get('/i-do-not-exist')
                .expect(404, done);
        });

        it('Using add method with get, post, put, delete', (done) => {
            router.add('GET', '/', (req, res) => {
                res.end('get');
            });
            router.add('POST', '/', (req, res) => {
                res.end('post');
            });
            router.add('PUT', '/', (req, res) => {
                res.end('put');
            });
            router.add('DELETE', '/', (req, res) => {
                res.end('delete');
            });

            var req = request(setupServer());

            req
                .get('/')
                .expect(200, 'get')
                .end(() => {
                    req
                        .post('/')
                        .expect(200, 'post')
                        .end(() => {
                            req
                                .put('/')
                                .expect(200, 'put')
                                .end(() => {
                                    req
                                        .delete('/')
                                        .expect(200, 'delete', done);
                                });
                        });
                });
        });

        it('GET /hello', (done) => {
            router.get('/hello', (req, res) => {
                res.end('hello');
            });
            // The actual test.
            request(setupServer())
                .get('/hello')
                .expect(200, 'hello', done);
        });

        it('GET /', (done) => {
            router.get('/', (req, res) => {
                res.end('Home page');
            });

            request(setupServer())
                .get('/')
                .expect(200, 'Home page', done);
        });

        it ('404 not found', (done) => {
            request(setupServer())
                .get('/404')
                .expect(404, done);
        });

        it('POST /hello', (done) => {
            router.post('/hello', (req, res) => {
                res.end('POST');
            });

            request(setupServer())
                .post('/hello')
                .expect(200, done);
        });

        it('Multiple get requests', (done) => {
            router.get('/a', (req, res) => {
                res.end('a');
            });

            router.get('/b', (req, res) => {
                res.end('b');
            });

            request(setupServer())
                .get('/a')
                .expect(200, 'a');

            var nrOfRoutes = router.nrOfRoutes();

            assert.equal(2, nrOfRoutes);
            done();
        });

        it('Should remove trailing slashes from path', (done) => {
            router.get('/animal/', (req, res) => {
                res.end('animal');
            });

            var req = request(setupServer());

            req
                .get('/animal')
                .expect(200, 'animal')
                .end(() => {
                    req
                        .get('/animal/')
                        .expect(200, 'animal', done);
                });
        });
    });

    describe('Group method', () => {
        it('GROUP laravel style', (done) => {

            // Group all routes inside to /api/v1
            router.group('/api/v1', () => {
                router.get('/test', (req, res) => {
                    res.end('v1 test');
                });
            });

            router.get('/standard', (req, res) => {
                res.end('standard');
            });

            router.get('/another', (req, res) => {
                res.end('another');
            });

            // Group all routes inside to /api/v2
            router.group('/api/v2', () => {
                router.get('/users', (req, res) => {
                    res.end('GET /api/users');
                });

                router.post('/users', (req, res) => {
                    res.end('POST /api/users');
                });
            });

            router.get('/kalle', (req, res) => {
                res.end('kalle');
            });

            var req = request(setupServer());

            req
                .get('/standard')
                .expect(200, 'standard')
                .end(() => {
                    req
                        .get('/api/v2/users')
                        .expect(200, 'GET /api/users')
                        .end(() => {
                            req
                                .post('/api/v2/users')
                                .expect(200, 'POST /api/users')
                                .end(() => {
                                    req
                                        .get('/kalle')
                                        .expect(200, 'kalle')
                                        .end(() => {
                                            req
                                                .get('/api/v1/test')
                                                .expect(200, 'v1 test', done);
                                        });
                                });
                        });
                });
        });

        it('Should throw if no function is provided', (done) => {
            assert.throws(
                function() {
                    router.group('/');
                },
                /handler/
            );

            done();
        });

        it('Should throw if no path provided', (done) => {
            assert.throws(
                function() {
                    router.group();
                },
                /path/
            );

            done();
        });

        it('/ route in a group', (done) => {

            router.group('/api', function() {
                router.get('/', function (req, res) {
                    res.send('GET /');
                });
            });

            var req = request(setupServer());

            req
                .get('/api')
                .expect(200, 'GET /')
                .end(() => {
                    req
                        .get('/api/')
                        .expect(200, 'GET /', done);
                });
        });

        it ('Multiple groups inside', (done) => {
            router.group('/api', function() {
                // /api
                router.get('/', function(req, res) {
                    res.send('GET /api');
                });

                // /api/test
                router.get('/test', function(req, res) {
                    res.send('GET /api/test');
                });

                // /api/v1/
                router.group('/v1', function() {

                    // /api/v1/
                    router.get('/', function(req, res) {
                        res.send('/api/v1/');
                    });
                    // /api/v1/test
                    router.get('/test', function (req, res) {
                        res.send('/api/v1/test');
                    });

                    // /api/v1/something/
                    router.group('/something', function() {

                        // /api/v1/something/kalle
                        router.get('/kalle', function (req, res) {
                            res.send('kalle');
                        });
                    });

                });
            });

            var req = request(setupServer());
            req
                .get('/api/v1')
                .expect(200, '/api/v1/')
                .end(() => {
                    req
                        .get('/api/v1/test')
                        .expect(200, '/api/v1/test')
                        .end(function () {
                            req
                                .get('/api/v1/something/kalle')
                                .expect(200, 'kalle', done);
                        });
                });
        });
    });

    describe('The response object', () => {
        it('send method plain text', (done) => {
            router.get('/', (req, res) => {
                res.send('ok', 'text/plain');
            });

            request(setupServer())
                .get('/')
                .expect('Content-Type', 'text/plain')
                .expect(200, 'ok', done);
        });

        it('send method html', (done) => {
            router.get('/', (req, res) => {
                res.send('<p>hello</p>');
            });

            request(setupServer())
                .get('/')
                .expect(200)
                .expect('Content-Type', 'text/html', done);
        });

        it('csv ct + custom status code', (done) => {
            // 418 -> I'm a teapot HTTP status code
            router.get('/', (req, res) => {
                res.send('1997,Ford,E350', 'text/csv', 418);
            });

            request(setupServer())
                .get('/')
                .expect(418)
                .expect('Content-Type', 'text/csv', done);
        });

        it('json method', (done) => {
            router.get('/', (req, res) => {
                var obj = {
                    x: 11,
                    y: 55
                };

                res.json(obj);
            });

            request(setupServer())
                .get('/')
                .expect(200)
                .expect('Content-Type', /json/, done);
        });

    });

    describe('The request object', () => {

        it('Query parameters empty', (done) => {
           router.get('/animal', (req, res) => {

                if (req.query instanceof Object && Object.keys(req.query).length === 0) {
                    res.end('empty');
                } else {
                    res.end('not');
                }
            });

            var req = request(setupServer());
            req
                .get('/animal') // Without a query param -> empty
                .expect(200, 'empty')
                .end(() => {
                    req
                        .get('/animal?q=5') // WITH query params -> not
                        .expect(200, 'not', done);
                });
        });

        it('Should be able to use request params', (done) => {
            router.get('/animal', (req, res) => {
                var query = req.query.id;
                res.end('animal' + query);
            });

            request(setupServer())
                .get('/animal?id=1')
                .expect(200, 'animal1', done);
        });

        it('GET with params', (done) => {
            router.get('/animal/:name', (req, res) => {
                var name = req.params.name;
                res.end('Animal ' + name);
            });

            request(setupServer())
                .get('/animal/dog')
                .expect(200, 'Animal dog', done);
        });

        it('GET with multiple params', (done) => {
            router.get('/animal/:id/:name', (req, res) => {
                var id = req.params.id;
                var name = req.params.name;

                res.end(id + name);
            });

            request(setupServer())
                .get('/animal/1/kalle')
                .expect(200, '1kalle', done);
        });

        it('GET with many params', (done) => {
            var b,c,d;
            router.get('/a/:b/:c/:d', (req, res) => {
                    b = req.params.b;
                    c = req.params.c;
                    d = req.params.d;

                res.end(b + c + d);
            });

            request(setupServer())
                .get('/a/b/c/d')
                .expect(200, 'bcd', done);
        });

        it('Many get request with params', (done) => {
            router.get('/map/:map', (req, res) => {
                res.end('map:map');
            });
            router.get('/maze/:map', (req, res) => {
                res.end('MAZE:map');
            });

            router.get('/maze', (req, res) => {
                res.end('maze');
            });

            var req = request(setupServer());

            req
                .get('/map/1')
                .expect(200, 'map:map')
                .end(function () {
                    req
                        .get('/maze/1')
                        .expect(200, 'MAZE:map')
                        .end(function () {
                            req
                                .get('/maze')
                                .expect(200, 'maze', done);
                        });
                });
        });

    });
});
