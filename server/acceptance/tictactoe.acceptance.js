'use strict';
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

describe('TEST ENV GET /api/gameHistory', function () {

    it('Should have ACCEPTANCE_URL environment variable exported.', function () {
        /*jshint -W030 */
        acceptanceUrl.should.be.ok;
    });

    it('should execute same test using old style', function (done) {

        var command = {
            id: "1234",
            gameId: "112",
            command: "CreateGame",
            userName: "ArnarKari",
            name: "TicTacToe",
            timeStamp: "2014-12-02T11:29:29"
        };

        var req = request(acceptanceUrl);
        req
        .post('/api/createGame')
        .type('json')
        .send(command)
        .end(function (err, res) {
            if (err) return done(err);
            request(acceptanceUrl)
            .get('/api/gameHistory/112')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                should(res.body).eql(
                    [{
                        id: "1234",
                        gameId: "112",
                        event: "GameCreated",
                        userName: "ArnarKari",
                        name: "TicTacToe",
                        timeStamp: "2014-12-02T11:29:29"
                }]);
                done();
            });
        });
    });

    it('Should execute fluid API test', function (done) {
        given(user("ArnarKari").createsGame("TicTacToe")).expect("GameCreated").withName("TicTacToe").isOk(done);
    });

    it('Should play game until draw', function (done) {
        given(user("ArnarKari").createsGame("GameIdOne").named("TheFirstGame"))
            .and(user("MikeCohn").joinsGame("GameIdOne"))
            .and(user("ArnarKari").placesMove(0,0))
            .and(user("MikeCohn").placesMove(0,1))
            .and(user("ArnarKari").placesMove(0,2))
            .and(user("MikeCohn").placesMove(2,0))
            .and(user("ArnarKari").placesMove(1,1))
            .and(user("MikeCohn").placesMove(1,2))
            .and(user("ArnarKari").placesMove(1,0))
            .and(user("MikeCohn").placesMove(2,2))
            .and(user("ArnarKari").placesMove(2,1))
        .expect("GameDraw").byUser("ArnarKari").isOk(done);
    });

    it('Should play game until won', function (done) {
        given(user("ArnarKari").createsGame("winner").named("TheFirstGame"))
            .and(user("MikeCohn").joinsGame("winner"))
            .and(user("ArnarKari").placesMove(0,0))
            .and(user("MikeCohn").placesMove(1,1))
            .and(user("ArnarKari").placesMove(0,2))
            .and(user("MikeCohn").placesMove(2,1))
            .and(user("ArnarKari").placesMove(0,1))
        .expect("GameWon").byUser("ArnarKari").isOk(done);
    });



});
