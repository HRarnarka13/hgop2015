var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    return {
        execudeCommand : (command) => {
            return [{
                id: command.id,
                event: 'GameInitialized',
                userName: command.userName,
                timeStamp: command.timeStamp
            }];
        }
    }
}
