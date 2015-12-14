'use strict';
var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    var gameCreatedEvent = events[0];
    var board = [['','',''],['','',''],['','','']]

    var nextToMove = '';
    var player1 = '', player2 = '';

    var eventHandlers = {
        'MoveMade' : function(e) {
            {
                var row = e.move.x;
                var column = e.move.y;
                board[row][column] = e.userName === player1 ? 'x' : 'o';
                nextToMove = nextToMove === player1 ? player2 : player1;
            }
        },
        'GameCreated' : function(e) {
            {
                player1 = e.userName;
                nextToMove = player1;
            }
        },
        'GameJoined' : function(e) {
            {
                player2 = e.userName;
            }
        }
    }

    // Act on previus events
    _.each(events, function(e) {
        eventHandlers[e.event](e);
    });

    var handlers = {
        'CreateGame' : function(cmd){
            {
                return [{
                    id       : cmd.id,
                    gameId   : cmd.gameId,
                    event    : 'GameCreated',
                    userName : cmd.userName,
                    name     : cmd.name,
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        'JoinGame' : function(cmd){
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
                    gameId          : cmd.gameId,
                    event           : 'GameJoined',
                    userName        : cmd.userName,
                    opponentUserName: gameCreatedEvent.userName,
                    timeStamp       : cmd.timeStamp
                }];
            }
        },
        'Move' : function(cmd){
            {
                var row = cmd.move.x;
                var column = cmd.move.y;
                if (nextToMove !== cmd.userName || board[row][column] !== '') {
                    return [{
                        id : cmd.id,
                        event : 'IllegalMove',
                        userName : cmd.userName,
                        move : cmd.move,
                        timeStamp : cmd.timeStamp
                    }]
                }

                board[row][column] = cmd.userName === player1 ? 'x' : 'o';
                nextToMove = nextToMove === player1 ? player2 : player1;

                // Check if first row contains the same symbol
                var state = gameState();
                var returnEvents = [{
                    id : cmd.id,
                    event : 'MoveMade',
                    userName : cmd.userName,
                    move : cmd.move,
                    timeStamp : cmd.timeStamp
                }];

                if ( state.winner !== null ) {
                    // console.log('Winner',state.winner);
                    returnEvents.push({
                        id : cmd.id,
                        event : 'GameWon',
                        userName : cmd.userName,
                        timeStamp : cmd.timeStamp
                    });
                } else if ( state.winner === null && state.isBoardFull === true ) {
                    returnEvents.push({
                        id : cmd.id,
                        event : 'GameDraw',
                        userName : cmd.userName,
                        timeStamp : cmd.timeStamp
                    });
                }

                return returnEvents;
            }
        }
    }

    function gameState() {
        var winner = null;
        for (var i = 0; i < 3; i++) {
            // Check for winning in columns
            if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                winner = board[0][i];
            }
            // Check for winning in rows
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                winner = board[i][0];
            }
        }
        // Check for winning cornerwize '\'
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            winner = board[0][0];
        }

        // Check for winning cornerwize '/'
        if (board[2][0] !== '' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            winner = board[2][0];
        }

        // Check if board is not full
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[row][col] === '') {
                    return {
                        winner: winner,
                        isBoardFull : false,
                    };
                }
            }
        }

        return {
            winner : winner,
            isBoardFull : true
        };
    }

    return {
        executeCommand : function(command) {
            var handler = handlers[command.command];
            if(!handler){
                throw new Error("No handler resolved for command " + JSON.stringify(command));
            }
            return handler(command);
        }
    }
}
