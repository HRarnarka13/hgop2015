'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

    beforeEach(module('tictactoeApp'));

    var TictactoeControllerCtrl, scope, httpBackend, http, location, interval;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector, $controller, $rootScope, $http, $location, $interval) {
        http = $http;
        interval = $interval;
        httpBackend = $injector.get('$httpBackend');
        location = $location;
        location.search('gameId', '123');
        location.search('gameSide', 'X');

        scope = $rootScope.$new();
        TictactoeControllerCtrl = $controller('TictactoeController', {
            $scope: scope
        });

    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('should generate join url', function () {
        getHistory();

        expect(scope.joinUrl).toBe('http://server:80/join/123');
    });

    it('should init creator to side X', function () {
        getHistory();

        expect(scope.me).toBe('Creator');
    });

    it('should init joiner to side O', function () {

        location.search('gameSide', 'O');

        getHistory();

        expect(scope.me).toBe('Joiner');
    });


    function getHistory() {
        httpBackend.expectGET('/api/gameHistory/123').respond([{
            event: 'GameCreated',
            name: 'Game Number one',
            gameId: '123',
            userName: 'Creator',
        }, {
            event: 'GameJoined',
            name: 'Game Number one',
            gameId: '123',
            userName: 'Joiner',
        }]);
        httpBackend.flush();
    }

    it('should post side from current user X', function () {
        getHistory();
        httpBackend.expectPOST('/api/move/', {
            gameId: '87687',
            command: 'Move',
            userName: 'ArnarKari',
            timeStamp: '2014-12-02T11:29:29',
            move: {
                x:2,
                y:0,
                symbol : 'X',
            }
        }).respond([
            {
                event: 'MoveMade',
                userName: 'ArnarKari',
                timeStamp: '2014-12-02T11:29:29',
                move: {
                    x:2,
                    y:0,
                    symbol : 'X',
                }
            }
        ]);

        scope.gameId = '87687';
        scope.name = 'TheSecondGame';

        location.search('gameSide', 'X');
        scope.me = 'ArnarKari';
        scope.gameState.gameId = '87687';

        scope.move({x:2, y:0, symbol: 'X'});
        httpBackend.flush();

        expect(scope.myTurn()).toBe(false);

    });

    it('should post side from current user O', function () {
        location.search('gameSide', 'O');

        getHistory();
        httpBackend.expectPOST('/api/move/', {
            gameId: '87687',
            command: 'Move',
            userName: 'ArnarKari',
            timeStamp: '2014-12-02T11:29:29',
            move: {
                x:2,
                y:1,
                symbol : 'O',
            }
        }).respond([
            {
                event: 'MoveMade',
                userName: 'ArnarKari',
                timeStamp: '2014-12-02T11:29:29',
                move: {
                    x:2,
                    y:1,
                    symbol : 'O',
                }
            }
        ]);


        scope.gameId = '123';
        scope.name = 'TheSecondGame';
        scope.gameState.nextTurn = 'O';

        scope.me = 'ArnarKari';
        scope.gameState.gameId = '87687';

        scope.move({x:2, y:1, symbol: 'O'});
        httpBackend.flush();

        expect(scope.myTurn()).toBe(false);

    });

    it('should refresh history once every one second', function () {
        getHistory();

        httpBackend.expectGET('/api/gameHistory/123').respond([{
            event: 'GameCreated',
            name: 'Game Number one',
            gameId: '123',
            userName: 'Creator'
        }, {
            event: 'GameJoined',
            name: 'Game Number one',
            gameId: '123',
            userName: 'Joiner',
        }]);

        interval.flush(2001);

        httpBackend.flush();
    });
});
