'use strict';
const tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when initializing game', () => {
    var given, when, then;

    it('should initialize game', () => {
        given = [];
        when = {
            id       : '1234',
            gameId   : '1',
            command  : 'CreateGame',
            userName : 'ArnarKari',
            name     : 'Tictactoe',
            timeStamp: '2015.12.04T18:35:51'
        };
        then = [{
            id       : '1234',
            gameId   : '1',
            event    : 'GameCreated',
            userName : 'ArnarKari',
            name     : 'Tictactoe',
            timeStamp: '2015.12.04T18:35:51'
        }];

        var event = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(event).should.be.exactly(JSON.stringify(then));
    });

    it('should initialize a different gane', () => {
        given = [];
        when = {
            id       : '0987',
            gameId   : '1',
            command  : 'CreateGame',
            userName : 'MikeCohn',
            name     : 'Tictactoe',
            timeStamp: "2015.12.04T19:36:51"
        };
        then = [{
            id       : '0987',
            gameId   : '1',
            event    : 'GameCreated',
            userName : 'MikeCohn',
            name     : 'Tictactoe',
            timeStamp: '2015.12.04T19:36:51'
        }];
        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
