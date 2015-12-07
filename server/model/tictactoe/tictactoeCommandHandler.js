var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    return {
        execudeCommand : (command) => {
            return [{
                id:"1234",
                event:'GameInitialized',
                userName:'ArnarKari',
                timeStamp: "2015.12.04T18:35:51"
            }]
        }
    }
}
