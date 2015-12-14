var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 3000 games in 10 seconds.', function (done) {
    var doneCount = 0;
    var gamesToPlay = 2800;
    var x = 10;

    this.timeout(x * 1000);

    var QED = function () {
        if (gamesToPlay === ++doneCount) {
            done();
        }
    };

    for (var gameId = 0; gameId < gamesToPlay; gameId++) {

        given(user("ArnarKari").createsGame(gameId).named("TheFirstGame"))
            .and(user("MikeCohn").joinsGame(gameId))
            .and(user("ArnarKari").placesMove(0,0))
            .and(user("MikeCohn").placesMove(0,1))
            .and(user("ArnarKari").placesMove(0,2))
            .and(user("MikeCohn").placesMove(2,0))
            .and(user("ArnarKari").placesMove(1,1))
            .and(user("MikeCohn").placesMove(1,2))
            .and(user("ArnarKari").placesMove(1,0))
            .and(user("MikeCohn").placesMove(2,2))
            .and(user("ArnarKari").placesMove(2,1))
        .expect("GameDraw").byUser("ArnarKari").isOk(QED);
    }
});
