var should = require('should');
var request = require('supertest');
var async = require('async');
var _ = require('lodash');
var uuid = require('uuid');

var acceptanceUrl = process.env.ACCEPTANCE_URL;

var users = {};
var commands = [];

function given(userApi) {
    commands.push(_.clone(userApi._command));
    var _expectedEvents = [{
        id: userApi._command.id,
        gameId: userApi._command.gameId,
        event: "EventName",
        userName: userApi._command.userName,
        name: userApi._command.name,
        timeStamp: userApi._command.timeStamp
    }];
    var expectApi = {
        withName: function (gameName) {
            _expectedEvents[0].name = gameName;
            return expectApi;
        },
        expect: function (eventName) {
            _expectedEvents[0].event = eventName;
            return expectApi;
        },
        isOk: function (done) {
            console.log('commands.length',commands.length);
            // console.log('OK:', commands);
            async.each(commands, function (cmd, callback) {
                console.log('Current command:', cmd);

                var url = '/api/' + cmd.command.charAt(0).toLowerCase() + cmd.command.slice(1);
                //console.log('url', url);

                var req = request(acceptanceUrl);
                req
                    .post(url)
                    .type('json')
                    .send(cmd)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        console.log('response from current:', res.body);
                        // res.body.should.be.instanceof(Array);
                        callback();
                    });
            }, function () {
                request(acceptanceUrl)
                    .get('/api/gameHistory/' + commands[0].gameId)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        //console.log('res.body', res.body);
                        res.body.should.be.instanceof(Array);
                        console.log('history:', res.body);
                        should(res.body[res.body.length - 1].event).eql(
                            _expectedEvents[0].event);
                        should(res.body[res.body.length - 1].id).eql(
                            _expectedEvents[0].id);
                        should(res.body[res.body.length - 1].timeStamp).eql(
                            _expectedEvents[0].timeStamp);
                        done();
                        users = {};
                        commands = [];
                    });
            });
            return expectApi;
        },
        and : function (api) {
            commands.push(_.clone(api._command));
            _expectedEvents[0].id = api._command.id;
            _expectedEvents[0].gameId = api._command.gameId;
            _expectedEvents[0].userName = api._command.userName;
            _expectedEvents[0].name = api._command.name;

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
