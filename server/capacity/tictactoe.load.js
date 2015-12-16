var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 1000 games in 6 seconds.', function (done) {
    var doneCount = 0;
    var gamesToPlay = 1000;
    var x = 6;

    this.timeout(x * 1000);

    var QED = function () {
        if (gamesToPlay === ++doneCount) {
            done();
        }
    };

    for (var gameId = 0; gameId < gamesToPlay; gameId++) {

        given(user("ArnarKari").createsGame(gameId.toString()).named("TheFirstGame"))
            .and(user("MikeCohn").joinsGame(gameId.toString()))
            .and(user("ArnarKari").placesMove(0,0))
            .and(user("MikeCohn").placesMove(1,1))
            .and(user("ArnarKari").placesMove(0,2))
            .and(user("MikeCohn").placesMove(2,1))
            .and(user("ArnarKari").placesMove(0,1))
        .expect("GameWon").byUser("ArnarKari").isOk(QED);
    }
});
