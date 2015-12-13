'use strict';
const tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when joining game',function(){
    var given, when, then;

    it('should join game',function(){
        given = [{
            id       : '111',
            gameId   : 1,
            event    : 'GameCreated',
            userName : 'ArnarKari',
            timeStamp: '2015.12.04T18:35:51'
        }];
        when = {
            id       : '111',
            gameId   : 1,
            command  : 'JoinGame',
            userName : 'MikeCohn',
            name     : 'Tictactoe',
            timeStamp: '2015.12.04T18:36:01'
        };
        then = [{
            id              : '111',
            gameId          : 1,
            event           : 'GameJoined',
            userName        : 'MikeCohn',
            opponentUserName: 'ArnarKari',
            timeStamp       : '2015.12.04T18:36:01'
        }];

        var event = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(event).should.be.exactly(JSON.stringify(then));
    });

    it('should not join game because it dosen\'t exsist',function(){
        given = [];
        when = {
            id       : '222',
            gameId   : 1,
            command  : 'JoinGame',
            userName : 'CohnMike',
            name     : 'Tictactoe',
            timeStamp: '2015.12.04T18:40:07'
        };
        then = [{
            id       : '222',
            event    : 'GameDoesNotExist',
            userName : 'CohnMike',
            timeStamp: '2015.12.04T18:40:07'
        }];

        var event = tictactoeCommandHandler(given).executeCommand(when);
        JSON.stringify(event).should.be.exactly(JSON.stringify(then));
    })
});
