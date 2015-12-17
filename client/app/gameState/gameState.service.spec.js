'use strict';

describe('Factory: TictacToeState', function () {

    var gameState;
    // load the controller's module
    beforeEach(module('tictactoeApp'));


    // Initialize the controller and a mock scope
    beforeEach(inject(function (_gameState_) {
        gameState = _gameState_();
    }));

    it('Should add other player to game state when gameJoined', function () {
        gameState.mutate([{
            event: 'GameJoined',
            userName: 'ArnarKari',
            name: 'TheFirstGame',
            timeStamp: '2014-12-02T11:29:29'
        }]
    );

    expect(gameState.joiningUser).toBe('ArnarKari');
});

it('Should store gameid and name from game created in game state.', function () {
    gameState.mutate([{
        event: 'GameCreated',
        gameId: '198299',
        userName: 'ArnarKari',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
    }]
);

expect(gameState.gameId).toBe('198299');
expect(gameState.name).toBe('TheFirstGame');
expect(gameState.creatingUser).toBe('ArnarKari');
});

it('Should add moves 0,1 to game board', function () {

    gameState.mutate([{
        event: 'MoveMade',
        userName: 'ArnarKari',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        move: {
            x:0,
            y:1,
            symbol: 'X',
        }
    }]
);

expect(gameState.board[0][1]).toBe('X');

});

it('Should add move 2,2 to board.', function () {

    gameState.mutate([{
        event: 'MoveMade',
        userName: 'ArnarKari',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        move: {
            x:2,
            y:2,
            symbol: 'X',
        }
    }]
);

expect(gameState.board[2][2]).toBe('X');

});

it('Should mark nextTurn as opposite from last event.', function () {
    gameState.me = {side: 'O'};
    gameState.mutate([{
        event: 'MoveMade',
        userName: 'ArnarKari',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29',
        move: {
            x:2,
            y:2,
            symbol: 'X',
        }
    }]
);

expect(gameState.nextTurn).toBe('O');
});

it('Nextturn should default to X', function () {
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: 'GameCreated',
        userName: 'ArnarKari',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
    }]
);

expect(gameState.nextTurn).toBe('X');
});

it('GameWon should set nextTurn to GameOver',function(){
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: 'GameWon',
        userName: 'ArnarKari',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
    }]
);

expect(gameState.nextTurn).toBe('GameOver');
expect(gameState.winner).toBe('ArnarKari');
});

it('GameDraw should set nextTurn to GameOver',function(){
    gameState.me = {side: 'X'};
    gameState.mutate([{
        event: 'GameDraw',
        userName: 'ArnarKari',
        name: 'TheFirstGame',
        timeStamp: '2014-12-02T11:29:29'
    }]
);

expect(gameState.nextTurn).toBe('GameOver');
expect(gameState.gameDraw).toBe(true);
});
});
