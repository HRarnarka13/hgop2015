'use strict';

angular.module('tictactoeApp')
.factory('gameState', function () {
    return function () {
        var gameState = {
            created: false,
            board: [['', '', ''], ['', '', ''], ['', '', '']],
            nextTurn: 'X',
            gameDraw: false,
            winner: undefined,
            mutate: function (events) {
                var handlers = {
                    'GameCreated': function (event, gameState) {
                        gameState.created = true;
                        gameState.name = event.name;
                        gameState.gameId = event.gameId;
                        gameState.creatingUser = event.userName;
                    },
                    'GameJoined': function (event, gameState) {
                        gameState.joiningUser = event.userName;
                    },
                    'Move': function (event, gameState) {
                        var x = event.move.x, y = event.move.y;
                        gameState.board[x][y] = event.move.symbol;
                        gameState.nextTurn = event.move.symbol === 'X' ? 'O' : 'X';
                    },
                    'GameWon': function (event, gameState) {
                        gameState.nextTurn = 'GameOver';
                        gameState.winner = event.userName;
                    },
                    'GameDraw': function (event, gameState) {
                        gameState.nextTurn = 'GameOver';
                        gameState.gameDraw = true;
                    }
                };
                _.each(events, function (ev) {
                    if(!ev) {
                        return;
                    }
                    if(handlers[ev.event]){
                        handlers[ev.event](ev, gameState);
                    }
                });
            }
        };
        return gameState;
    };
});
