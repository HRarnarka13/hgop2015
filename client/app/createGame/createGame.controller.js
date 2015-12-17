'use strict';

angular.module('tictactoeApp')
.controller('CreateGameCtrl', function ($scope, $http, guid, $location) {
    $scope.createGame = function () {

        var id = guid();
        var gameId = guid();
        var createPost = $http.post('/api/createGame/', {
            'id': id,
            'gameId': gameId,
            'command': 'CreateGame',
            'userName': $scope.userName,
            'name': $scope.name,
            'timeStamp': '2014-12-02T11:29:29'
        });
        createPost.then(function (response) {
            $location.url('/tictactoe');
            $location.search('gameId', response.data[0].gameId);
            $location.search('gameSide', 'X');
        });
    };
});
