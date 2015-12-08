'use strict';
var tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when making move', () => {
    var given, when, then;
    it('should make move', () => {
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
        }];

        when = {
            id        : '333',
            command   : 'Move',
            userName  : 'ArnarKari',
            cell      : 1,
            symbol    : 'x',
            timeStamp : '2015.12.04T19:45:04'
        };

        then = [{
            id        : '333',
            event     : 'MoveMade',
            userName  : 'ArnarKari',
            cell      : 1,
            symbol    : 'x',
            timeStamp : '2015.12.04T19:45:04'
        }];

        var actualEvents = tictactoeCommandHandler(given).execudeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
