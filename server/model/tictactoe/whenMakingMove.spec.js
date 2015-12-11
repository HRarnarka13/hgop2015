'use strict';
var tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when making move', () => {
    var given, when, then;

    beforeEach(() => {
        given = [{
            id       : '333',
            event    : 'GameCreated',
            userName : 'ArnarKari',
            timeStamp: '2015.12.04T19:44:51'
        },
        {
            id              : '333',
            event           : 'GameJoined',
            userName        : 'MikeCohn',
            opponentUserName: 'ArnarKari',
            timeStamp       : '2015.12.04T19:44:59'
        }];
    });

    it('should make move', () => {
        when = {
            id        : '333',
            command   : 'Move',
            userName  : 'ArnarKari',
            move : {
                x      : 0,
                y      : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should reject illegal move: marking already marked cell', () => {
        given.push({
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x      : 0,
                y      : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        });

        when = {
            id       : '333',
            command  : 'Move',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        };

        then = [{
            id : '333',
            event : 'IllegalMove',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should reject illegal move: two moves in a row', () => {
        given.push({
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x      : 0,
                y      : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        });

        when = {
            id       : '333',
            command  : 'Move',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        };

        then = [{
            id : '333',
            event : 'IllegalMove',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should reject illegal move: marking already marked cell', () => {
        given.push({
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x      : 0,
                y      : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        });

        when = {
            id       : '333',
            command  : 'Move',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        };

        then = [{
            id : '333',
            event : 'IllegalMove',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should make move for the other player', () => {
        given.push({
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x      : 0,
                y      : 1,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        });

        when = {
            id       : '333',
            command  : 'Move',
            userName : 'MikeCohn',
            move : {
                x : 1,
                y : 1,
                symbol : 'o',
            },
            timeStamp : '2015.12.04T19:45:04'
        };
        then = [{
            id : '333',
            event : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 1,
                y : 1,
                symbol : 'o',
            },
            timeStamp : '2015.12.04T19:45:04'
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
