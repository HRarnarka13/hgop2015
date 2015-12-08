var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    const gameCreatedEvent = events[0];
    const board = [['','',''],['','',''],['','','']]

    _.each(events, (e) => {
        if (e.event === 'MoveMade') {
            const row = e.move.x;
            const column = e.move.y;
            board[row][column] = e.move.symbol;
        }
    })

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
                const row = cmd.move.x;
                const column = cmd.move.y
                console.log('Before:', board);

                if (board[row][column] !== '') {
                    return [{
                        id : cmd.id,
                        event : 'IllegalMove',
                        userName : cmd.userName,
                        move : cmd.move,
                        timeStamp : cmd.timeStamp
                    }]
                }

                board[row][column] = cmd.move.symbol;
                console.log('After:',board);
                return [{
                    id : cmd.id,
                    event : 'MoveMade',
                    userName : cmd.userName,
                    move : cmd.move,
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
