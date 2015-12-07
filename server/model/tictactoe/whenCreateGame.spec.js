'use strict';
const tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when initializing game', () => {
    var given, when, then;

    it('should initialize game', () => {
        given=[];
        when = {
            id:'1234',
            comm:'InitalizeGame',
            userName:'ArnarKari',
            name:'Tictactoe',
            timeStamp: "2015.12.04T18:35:51"
        };
        then=[{
            id:"1234",
            event:'GameInitialized',
            userName:'ArnarKari',
            timeStamp: "2015.12.04T18:35:51"
        }];

        var event = tictactoeCommandHandler(given).execudeCommand(when);

        JSON.stringify(event).should.be.exactly(JSON.stringify(then));
    });
});
