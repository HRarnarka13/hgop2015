'use strict';
var tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when ending game', () => {
    var given, when, then;

    beforeEach(() => {
        given = [{
            id       : '333',
            event    : 'GameInitialized',
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
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:04'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'MikeCohn',
            move : {
                x : 1,
                y : 1,
                symbol : 'o',
            },
            timeStamp : '2015.12.04T19:45:07'
        },
        {
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 1,
                y : 0,
                symbol : 'x',
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
                symbol : 'o',
            },
            timeStamp : '2015.12.04T19:45:10'
        }];
    });

    it('should win game, first row', () => {
        when = {
            id        : '333',
            command   : 'Move',
            userName  : 'ArnarKari',
            move : {
                x      : 2,
                y      : 0,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:17'
        };

        then = [{
            id       : '333',
            event    : 'MoveMade',
            userName : 'ArnarKari',
            move : {
                x : 2,
                y : 0,
                symbol : 'x',
            },
            timeStamp : '2015.12.04T19:45:17'
        },
        {
            id : '333',
            event : 'GameWon',
            userName : 'ArnarKari',
            timeStamp : '2015.12.04T19:45:17'
        }];

        var actualEvents = tictactoeCommandHandler(given).execudeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
