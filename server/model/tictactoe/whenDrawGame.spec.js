'use strict';
var tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when ending game', function() {
    var given, when, then;

    it('should end the game in a draw', function() {
        // x o x
        // x x o
        // o x o
        given = [{
            id       : '333',
            gameId   : '1',
            event    : 'GameCreated',
            userName : 'ArnarKari',
            timeStamp: '2015.12.04T19:44:51'
        },
        {
            id              : '333',
            gameId          : '1',
            event           : 'GameJoined',
            userName        : 'MikeCohn',
            opponentUserName: 'ArnarKari',
            timeStamp       : '2015.12.04T19:44:59'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 0,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:04'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 0,
                y : 1,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:07'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 2,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:08'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 2,
                y : 0,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:10'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 1,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:12'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 1,
                y : 2,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:16'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 0,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:17'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 2,
                y : 2,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:20'
        }];
        when = {
            id       : '333',
            command    : 'Move',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 1,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:21'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 1,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:21'
        },
        {
            id : '333',
            event : 'GameDraw',
            userName : 'ArnarKari',
            timeStamp : '2015.12.04T19:45:21'
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should end the game in a draw 2', function() {
        // o o x
        // x x o
        // o x
        given = [{
            id       : '333',
            gameId   : '1',
            event    : 'GameCreated',
            userName : 'ArnarKari',
            timeStamp: '2015.12.04T19:44:51'
        },
        {
            id              : '333',
            gameId          : '1',
            event           : 'GameJoined',
            userName        : 'MikeCohn',
            opponentUserName: 'ArnarKari',
            timeStamp       : '2015.12.04T19:44:59'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 2,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:04'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 0,
                y : 0,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:07'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 1,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:08'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 0,
                y : 1,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:10'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 1,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:12'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 1,
                y : 2,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:16'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 0,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:17'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 2,
                y : 0,
                symbol : 'O',
            },
            timeStamp : '2015.12.04T19:45:20'
        }];
        when = {
            id       : '333',
            command    : 'Move',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 2,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:21'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 2,
                symbol : 'X',
            },
            timeStamp : '2015.12.04T19:45:21'
        },
        {
            id : '333',
            event : 'GameDraw',
            userName : 'ArnarKari',
            timeStamp : '2015.12.04T19:45:21'
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
