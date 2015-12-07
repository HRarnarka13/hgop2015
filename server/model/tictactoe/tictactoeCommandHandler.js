var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    return {
        execudeCommand : (command) => {
            switch (command.command) {
                case 'InitalizeGame':
                    return [{
                        id: command.id,
                        event: 'GameInitialized',
                        userName: command.userName,
                        timeStamp: command.timeStamp
                    }];
                case 'JoinGame':
                    return [{
                        id: command.id,
                        event: 'GameJoined',
                        userName: command.userName,
                        opponentUserName: events[0].userName,
                        timeStamp: command.timeStamp
                    }];
                default:
                    throw new Error('No matching command found: ' + command.command);
            }
        }
    }
}
