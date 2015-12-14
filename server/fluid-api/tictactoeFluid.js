var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {
    var _expectedEvents = [{
        id: "1234",
        gameId: userApi._command.gameId,
        event: "EventName",
        userName: userApi._command.userName,
        name: userApi._command.name,
        timeStamp: "2014-12-02T11:29:29"
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
            var req = request(acceptanceUrl);
            req
                .post('/api/createGame')
                .type('json')
                .send(userApi._command)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    request(acceptanceUrl)
                        .get('/api/gameHistory/' + userApi._command.gameId)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            console.log('res.body', res.body);
                            res.body.should.be.instanceof(Array);
                            should(res.body).eql(
                                _expectedEvents);
                            done();
                        });
                });
            return expectApi;
        }
    };
    return expectApi;
}

function user(userName) {
    var userApi = {
        _command : undefined,
        createsGame : function (name) {
            userApi._command = {
                id : '1234',
                gameId : '1',
                command : 'CreateGame',
                userName : userName,
                name : name,
                timeStamp: "2014-12-02T11:29:29"
            };
            return userApi;
        }
    };
    return userApi;
}

module.exports.given = given;
module.exports.user = user;
