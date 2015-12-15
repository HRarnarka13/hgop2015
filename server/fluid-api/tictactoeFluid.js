var should = require('should');
var request = require('supertest');
var async = require('async');
var _ = require('lodash');
var uuid = require('uuid');

var acceptanceUrl = process.env.ACCEPTANCE_URL;

var users = {};

function given(userApi) {
    var commands = [];
    commands.push(_.clone(userApi._command));
    var _expectedEvent = {
        id: userApi._command.id,
        gameId: userApi._command.gameId,
        event: "EventName",
        userName: userApi._command.userName,
        name: userApi._command.name,
        timeStamp: userApi._command.timeStamp
    };
    var expectApi = {
        withName: function (gameName) {
            _expectedEvent.name = gameName;
            return expectApi;
        },
        expect: function (eventName) {
            _expectedEvent.event = eventName;
            return expectApi;
        },
        isOk: function (done) {
            // console.log('OK:', commands);
            function executeCommand(cmd, doneWithCommands){
                //console.log('cmd', cmd);
                var url = '/api/' + cmd.command.charAt(0).toLowerCase() + cmd.command.slice(1);
                var req = request(acceptanceUrl);
                req
                    .post(url)
                    .type('json')
                    .send(cmd)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            // console.log('ERR', err);
                            doneWithCommands();
                        }
                        //res.body.should.be.instanceof(Array);
                        if (commands.length > 0) {
                            executeCommand(commands.shift(), doneWithCommands);
                        } else {
                            users = {};
                            commands = [];
                            doneWithCommands();
                        }
                    });
            }

            executeCommand(commands.shift(), function () {
                request(acceptanceUrl)
                    .get('/api/gameHistory/' + _expectedEvent.gameId)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        //console.log('res.body', res.body);
                        res.body.should.be.instanceof(Array);
                        //console.log('history:', res.body);
                        res.body.should.matchAny(function(value) { value.event.should.be.eql(_expectedEvent.event) });
                        //res.body.should.matchAny(function(value) { value.event.should.be.eql(_expectedEvent.event) });

                        // res.body.should.containEql({ event : _expectedEvent.event });
                        // should(res.body[res.body.length - 1].event).eql(
                        //     _expectedEvent.event);
                        users = {};
                        commands = [];
                        done();
                    });
            });
            return expectApi;
        },
        and : function (api) {
            commands.push(_.clone(api._command));
            _expectedEvent.id = api._command.id;
            _expectedEvent.gameId = api._command.gameId;
            _expectedEvent.userName = api._command.userName;
            _expectedEvent.name = api._command.name;

            return expectApi;
        },
        byUser : function (userName) {
            return expectApi;
        }
    };
    return expectApi;
}

function user(userName) {
    if (!users[userName]) {
        users[userName] = {
            _command : undefined,
            createsGame : function (name) {
                users[userName]._command = {
                    id : uuid.v4(),
                    gameId : name,
                    command : 'CreateGame',
                    userName : userName,
                    name : name,
                    timeStamp : new Date().toJSON().slice(0,19)
                };
                return users[userName];
            },
            named : function (gameName) {
                users[userName]._command.name = gameName;
                return users[userName];
            },
            joinsGame : function (gameId) {
                users[userName]._command = {
                    id : uuid.v4(),
                    gameId : gameId,
                    command : 'JoinGame',
                    userName : userName,
                    name : gameId,
                    timeStamp : new Date().toJSON().slice(0,19)
                };
                return users[userName];
            },
            placesMove : function (x, y) {
                users[userName]._command.id = uuid.v4();
                users[userName]._command.command = 'Move';
                users[userName]._command.move = {
                    x : x,
                    y : y
                };
                users[userName]._command.timeStamp = new Date().toJSON().slice(0,19);
                return users[userName];
            },
        };
    }
    //console.log('user:', userName);
    //console.log('user._command:', users[userName]._command);
    // console.log('user[]:', users[userName]);
    return users[userName];
}

module.exports.given = given;
module.exports.user = user;
