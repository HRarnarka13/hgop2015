'use strict';
var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    const gameCreatedEvent = events[0];
    const board = [['','',''],['','',''],['','','']]

    let nextToMove = '';
    let player1 = '', player2 = '';

    const eventHandlers = {
        'MoveMade' : (e) => {
            {
                const row = e.move.x;
                const column = e.move.y;
                board[row][column] = e.move.symbol;
                nextToMove = nextToMove === player1 ? player2 : player1;
                console.log('e nextToMove', nextToMove);
            }
        },
        'GameInitialized' : (e) => {
            {
                player1 = e.userName;
                nextToMove = player1;
            }
        },
        'GameJoined' : (e) => {
            {
                player2 = e.userName;
            }
        }
    }

    // Act on previus events
    _.each(events, (e) => {
        eventHandlers[e.event](e);
    });

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
                const column = cmd.move.y;
                console.log('Before:', board);
                if (nextToMove !== cmd.userName || board[row][column] !== '') {
                    console.log('nextToMove',nextToMove);
                    console.log('cmd.userName',cmd.userName);
                    return [{
                        id : cmd.id,
                        event : 'IllegalMove',
                        userName : cmd.userName,
                        move : cmd.move,
                        timeStamp : cmd.timeStamp
                    }]
                }

                board[row][column] = cmd.move.symbol;
                nextToMove = nextToMove === player1 ? player2 : player2;
                console.log('After:',board);

                // Check if first row contains the same symbol
                if ( gameState().winner !== null ) {
                    console.log('Winner',gameState().winner);
                    return [{
                        id : cmd.id,
                        event : 'MoveMade',
                        userName : cmd.userName,
                        move : cmd.move,
                        timeStamp : cmd.timeStamp
                    },
                    {
                        id : cmd.id,
                        event : 'GameWon',
                        userName : cmd.userName,
                        timeStamp : cmd.timeStamp
                    }]
                }

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

    function gameState() {
        for (var i = 0; i < 3; i++) {
            // Check for winning in columns
            if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return {
                    winner : board[0][i]
                };
            }
            // Check for winning in rows
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return {
                    winner : board[i][0]
                };
            }
        }
        return {
            winner : null
        };
    }

    return {
        execudeCommand : (command) => {
            return handlers[command.command](command)
        }
    }
}
