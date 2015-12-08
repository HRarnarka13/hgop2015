var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    const gameCreatedEvent = events[0];
    const handlers = {
        'InitalizeGame' : (cmd) => {
            {
                return [{
                    id       : cmd.id,
                    event    : 'GameInitialized',
                    userName : cmd.userName,
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        'JoinGame' : (cmd) => {
            {
                if (typeof events === 'undefined' || events.length <= 0) {
                    return [{
                        id       : cmd.id,
                        event    : 'GameDoesNotExist',
                        userName : cmd.userName,
                        timeStamp: cmd.timeStamp
                    }];
                }
                return [{
                    id              : cmd.id,
                    event           : 'GameJoined',
                    userName        : cmd.userName,
                    opponentUserName: gameCreatedEvent.userName,
                    timeStamp       : cmd.timeStamp
                }];
            }
        },
        'Move' : (cmd) => {
            {
                return [{
                    id : cmd.id,
                    event : 'MoveMade',
                    userName : cmd.userName,
                    cell : cmd.cell,
                    symbol : cmd.symbol,
                    timeStamp : cmd.timeStamp
                }]
            }
        }
    }

    return {
        execudeCommand : (command) => {
            return handlers[command.command](command)
        }
    }
}
