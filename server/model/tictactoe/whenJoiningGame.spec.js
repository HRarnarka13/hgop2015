'use strict';
const tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when joining game', () => {
    var given, when, then;

    it('should join game', () => {
        given = [{
            id: '111',
            event: 'GameInitialized',
            userName: 'ArnarKari',
            timeStamp: "2015.12.04T18:35:51"
        }];
        when = {
            id: '111',
            command: 'JoinGame',
            userName: 'MikeCohn',
            name: 'Tictactoe',
            timeStamp: "2015.12.04T18:36:01"
        };
        then = [{
            id: '111',
            event: 'GameJoined',
            userName: 'MikeCohn',
            opponentUserName: 'ArnarKari',
            timeStamp: "2015.12.04T18:36:01"
        }];

        var event = tictactoeCommandHandler(given).execudeCommand(when);
        JSON.stringify(event).should.be.exactly(JSON.stringify(then));
    });
});
