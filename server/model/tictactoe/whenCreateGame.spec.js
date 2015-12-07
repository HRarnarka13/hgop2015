'use strict';
const tictactoeCommandHandler = require('./tictactoeCommandHandler');
describe('when initializing game', () => {
    var given, when, then;

    it('should initialize game', () => {
        given = [];
        when = {
            id:'1234',
            command:'InitalizeGame',
            userName:'ArnarKari',
            name:'Tictactoe',
            timeStamp: "2015.12.04T18:35:51"
        };
        then = [{
            id:"1234",
            event:'GameInitialized',
            userName:'ArnarKari',
            timeStamp: "2015.12.04T18:35:51"
        }];

        var event = tictactoeCommandHandler(given).execudeCommand(when);

        JSON.stringify(event).should.be.exactly(JSON.stringify(then));
    });

    it('should initialize a different gane', () => {
        given = [];
        when = {
            id:'0987',
            command:'InitalizeGame',
            userName:'MikeCohn',
            name:'Tictactoe',
            timeStamp: "2015.12.04T19:36:51"
        };
        then = [{
            id:"0987",
            event:'GameInitialized',
            userName:'MikeCohn',
            timeStamp: "2015.12.04T19:36:51"
        }];
        var actualEvents = tictactoeCommandHandler(given).execudeCommand(when);
        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
