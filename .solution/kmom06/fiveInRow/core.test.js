import Core from '../fiveInRow/core';
process.env.NODE_ENV = 'test';

var assert = require("assert");

var core = null;

describe('Five in row core', () => {

    beforeEach(() => {
        core = new Core(10);
    });

    describe('getCurrentPlayer()', () => {
        it('Should return current player', () => {
            assert.equal('Player 1', core.getCurrentPlayer());
            core.place(0, 0);
            core.place(0, 1);
            assert.equal('Player 1', core.getCurrentPlayer());
        });
    });

    describe('getCurrentPlayerMarker()', () => {
        it('Should return current player char', () => {
            var marker = core.getCurrentPlayerMarker();
            assert.equal('X', marker);
            core.place(0, 0);
            marker = core.getCurrentPlayerMarker();
            assert.equal('O', marker);
        });
    });

    describe('place()', () => {
        it('Should place one mark', () => {
            core.place(0, 0);
            var map = core.getMap();
            assert.equal('X', map[0][0]);
        });

        it('Should placed many marks', () => {
            var x, y;
            for (y = 0; y < 10; y += 1) {
                for (x = 0; x < 10; x += 1) {
                    core.place(x, y);
                }
            }
            var map = core.getMap();

            for (y = 0; y < 10; y += 1) {
                for (x = 0; x < 10; x += 1) {
                    assert.equal(x % 2 === 0 ? 'X' : 'O', map[x][y]);
                }
            }
        });

        it('Place mark where already place once, should be his/her turn again ', () => {
            core.place(0, 0);
            assert.equal('X', core.getMap()[0][0]);
            try {
                core.place(0, 0);
            } catch (e) {
                assert.equal(e.message, '[0][0] already taken by X, try again O');
            }
            assert.equal('Player 2', core.getCurrentPlayer());
        });

        it('Place marker outside the "box" should not be allowed', () => {
            try {
                core.place(10, 11, 'X');
            } catch (e) {
                assert.equal(e instanceof Error, true);
                assert.equal(e.message, '[10][11] is outside the map-area, try again X');
            }
            try {
                core.place(11, 10, 'X');
            } catch (e) {
                assert.equal(e instanceof Error, true);
                assert.equal(e.message, '[11][10] is outside the map-area, try again X');
            }
            try {
                core.place(-1, 1, 'X');
            } catch (e) {
                assert.equal(e instanceof Error, true);
                assert.equal(e.message, '[-1][1] is outside the map-area, try again X');
            }
            try {
                core.place(1, -1, 'X');
            } catch (e) {
                assert.equal(e instanceof Error, true);
                assert.equal(e.message, '[1][-1] is outside the map-area, try again X');
            }
        });
    });

    describe('getMap()', () => {
        it('X should be forced marked', () => {
            core.place(0, 0);
            assert.equal('X', core.getMap()[0][0]);
            core.place(1, 1, 'X');
            assert.equal('X', core.getMap()[1][1]);
        });
    });

    describe('getWinner()', () => {

        describe('Vertical', () => {
            it('should be 5 in row on X axis, Player 1 win', () => {
                core.place(0, 0, 'X');
                core.place(1, 0, 'X');
                core.place(2, 0, 'X');
                core.place(3, 0, 'X');
                core.place(4, 0, 'X');
                core.place(5, 0, 'O');
                core.place(6, 0, 'O');
                core.place(7, 0, 'O');
                core.place(8, 0, 'O');
                core.place(9, 0, 'O');
                assert.equal(core.getWinner(), 'Player 1');
            });

            it('should be 5 in row on X axis, Player 2 win', () => {
                core.place(0, 7, 'X');
                core.place(1, 7, 'X');
                core.place(2, 7, 'X');
                core.place(3, 7, 'X');
                core.place(4, 7, '_');
                core.place(5, 7, 'O');
                core.place(6, 7, 'O');
                core.place(7, 7, 'O');
                core.place(8, 7, 'O');
                core.place(9, 7, 'O');
                assert.equal(core.getWinner(), 'Player 2');
            });


        });

        describe('Horizontal', () => {
            it('Should return false if no one won', () => {
                core.place(0, 0, 'X');
                core.place(0, 1, 'X');
                core.place(0, 2, 'X');
                core.place(0, 3, 'X');
                core.place(0, 4, 'O');
                core.place(0, 5, '_');
                core.place(0, 6, 'O');
                core.place(0, 7, 'O');
                core.place(0, 8, 'O');
                core.place(0, 9, 'O');
                assert.equal(core.getWinner(), false);
            });
            it('should be 5 in row on Y axis, Player 1 win', () => {
                core.place(0, 0, 'X');
                core.place(0, 1, 'X');
                core.place(0, 2, 'X');
                core.place(0, 3, 'X');
                core.place(0, 4, 'X');
                core.place(0, 5, '_');
                core.place(0, 6, 'O');
                core.place(0, 7, 'O');
                core.place(0, 8, 'O');
                core.place(0, 9, 'O');
                assert.equal(core.getWinner(), 'Player 1');
            });

            it('should be 5 in row on Y axis, Player 1 win', () => {
                core.place(6, 0, 'O');
                core.place(6, 1, 'O');
                core.place(6, 2, 'O');
                core.place(6, 3, 'O');
                core.place(6, 4, 'O');
                core.place(6, 5, '_');
                core.place(6, 6, 'X');
                core.place(6, 7, 'X');
                core.place(6, 8, 'X');
                core.place(6, 9, 'X');
                assert.equal(core.getWinner(), 'Player 2');
            });
        });

        describe('Diagonal', () => {
            it('Should return player 1 in this senario', () => {
                core.place(0, 0, 'X');
                core.place(1, 1, 'X');
                core.place(2, 2, 'X');
                core.place(3, 3, 'X');
                core.place(4, 4, 'X');
                core.place(5, 5, '_');
                core.place(6, 6, 'O');
                core.place(7, 7, 'O');
                core.place(8, 8, 'O');
                core.printMap();
                assert.equal(core.getWinner(true), 'Player 1');
            });

            it('Epic bugg test: https://asciinema.org/a/4e7o6xsv33j9y4xslktvfam6u', () => {
                core.place(0, 2, 'O');
                core.place(0, 3, 'O');
                core.place(0, 4, 'O');
                core.place(0, 5, 'O');

                core.place(0, 0, 'X');
                core.place(1, 1, 'X');
                core.place(2, 2, 'X');
                core.place(3, 3, 'X');
                core.place(4, 4, 'X');
                core.place(5, 5, '_');
                core.place(6, 6, '_');
                core.place(7, 7, '_');
                core.place(8, 8, '_');
                core.printMap();
                assert.equal(core.getWinner(true), 'Player 1');
            });

            it('Should return false in this senario', () => {
                core.place(0, 0, 'X');
                core.place(1, 1, 'X');
                core.place(2, 2, 'X');
                core.place(3, 3, 'X');
                core.place(4, 4, 'O');
                core.place(5, 5, '_');
                core.place(6, 6, 'O');
                core.place(7, 7, 'O');
                core.place(8, 8, 'O');
                assert.equal(core.getWinner(), false);
            });

            it('Should also work when not 0,0 is first', () => {
                core.place(0, 2, 'X');
                core.place(1, 3, 'X');
                core.place(2, 4, 'X');
                core.place(3, 5, 'X');
                core.place(4, 6, 'X');
                core.place(5, 7, 'X');
                core.place(6, 8, 'X');
                core.place(7, 9, 'X');
                assert.equal(core.getWinner(), 'Player 1');
            });

            it('Should also work when not 0,0 is first player 1 win', () => {
                core.place(2, 0, 'X');
                core.place(3, 1, 'X');
                core.place(4, 2, 'X');
                core.place(5, 3, 'X');
                core.place(6, 4, 'X');
                assert.equal(core.getWinner(), 'Player 1');
            });
        });

        describe('Anti-diagonal', () => {
            it('Should be five in row. starting on x=1 y=1', () => {
                core.place(0, 0, '_');
                core.place(1, 1, 'X');
                core.place(2, 2, 'X');
                core.place(3, 3, 'X');
                core.place(4, 4, 'X');
                core.place(5, 5, 'X');
                core.place(6, 6, 'O');
                core.place(7, 7, 'O');
                core.place(8, 8, 'O');
                assert.equal(core.getWinner(), 'Player 1');
            });

            it('Should be five in row. First mark on x=3, y=3', () => {
                for (var i = 3; i < 8; i += 1) {
                    core.place(i, i, 'O');
                }
                assert.equal(core.getWinner(), 'Player 2');
            });


            it('should be five in row. First mark on 0, 9. Player 1 win', () => {
                var outer = 0;
                for (var x = 9; x >= 0; x -= 1) {
                    core.place(x, outer, 'X');
                    outer += 1;
                }

                assert.equal(core.getWinner(), 'Player 1');
            });

            it('Should work from right to left when not starting on 9,9 first, Player 2 win', () => {
                core.place(7, 4, 'O');
                core.place(6, 5, 'O');
                core.place(5, 6, 'O');
                core.place(4, 7, 'O');
                core.place(3, 8, 'O');
                core.place(2, 9, 'O');
                assert.equal(core.getWinner(), 'Player 2');
            });

            it('Should work from right to left when starting on 4,0 first, Player 1 win', () => {
                core.place(4, 0, 'X');
                core.place(3, 1, 'X');
                core.place(2, 2, 'X');
                core.place(1, 3, 'X');
                core.place(0, 4, 'X');

                assert.equal(core.getWinner(), 'Player 1');
            });
        });
    });

    describe('getPlayerName()', () => {
        it('Should return Player 1 when giveing X', () => {
            var result = core.getPlayerName('X');
            assert.equal(result, 'Player 1');
        });

        it('Should return Player 2 when giveing O', () => {
            var result = core.getPlayerName('O');
            assert.equal(result, 'Player 2');
        });
    });
});
