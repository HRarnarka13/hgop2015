'use strict';
var tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when ending game', function(){
    var given, when, then;

    beforeEach(function(){
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
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 0,
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
            },
            timeStamp : '2015.12.04T19:45:07'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 2,
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
            },
            timeStamp : '2015.12.04T19:45:10'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 0,
            },
            timeStamp : '2015.12.04T19:45:08'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 1,
                y : 2,
            },
            timeStamp : '2015.12.04T19:45:10'
        }];
    });

    it('should win game, first column', function(){
        when = {
            id        : '333',
            command   : 'Move',
            userName  : 'ArnarKari',
            move : {
                x      : 1,
                y      : 0,
            },
            timeStamp : '2015.12.04T19:45:17'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 0,
            },
            timeStamp : '2015.12.04T19:45:17'
        },
        {
            id : '333',
            event : 'GameWon',
            userName : 'ArnarKari',
            timeStamp : '2015.12.04T19:45:17'
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should win game, third row', function(){
        when = {
            id        : '333',
            command   : 'Move',
            userName  : 'ArnarKari',
            move : {
                x      : 2,
                y      : 1,
            },
            timeStamp : '2015.12.04T19:45:17'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 1,
            },
            timeStamp : '2015.12.04T19:45:17'
        },
        {
            id : '333',
            event : 'GameWon',
            userName : 'ArnarKari',
            timeStamp : '2015.12.04T19:45:17'
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should win game, cornerwize \\', function(){
        when = {
            id        : '333',
            command   : 'Move',
            userName  : 'ArnarKari',
            move : {
                x      : 1,
                y      : 1,
            },
            timeStamp : '2015.12.04T19:45:17'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 1,
            },
            timeStamp : '2015.12.04T19:45:17'
        },
        {
            id : '333',
            event : 'GameWon',
            userName : 'ArnarKari',
            timeStamp : '2015.12.04T19:45:17'
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should win game, cornerwize /', function(){
        // override the given state
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
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 0,
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
            },
            timeStamp : '2015.12.04T19:45:07'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 0,
            },
            timeStamp : '2015.12.04T19:45:08'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 2,
                y : 1,
            },
            timeStamp : '2015.12.04T19:45:10'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 0,
                y : 2,
            },
            timeStamp : '2015.12.04T19:45:08'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 1,
                y : 0,
            },
            timeStamp : '2015.12.04T19:45:10'
        }];
        when = {
            id        : '333',
            command   : 'Move',
            userName  : 'ArnarKari',
            move : {
                x      : 1,
                y      : 1,
            },
            timeStamp : '2015.12.04T19:45:17'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 1,
            },
            timeStamp : '2015.12.04T19:45:17'
        },
        {
            id : '333',
            event : 'GameWon',
            userName : 'ArnarKari',
            timeStamp : '2015.12.04T19:45:17'
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
