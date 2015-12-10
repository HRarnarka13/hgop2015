var should = require('should');
var _ = require('lodash');
var q = require('q');

function resolvedPromise(value) {
    var defer = q.defer();
    defer.resolve(value);
    return defer.promise;
}

describe('tictactoe game context', function() {

    it('should route command to instantiated tictactoe game with event stream from store and return and store generated events. ' +
    'Test using fakes/stubs.', function(done){

        var calledWithEventStoreId;
        var storedEvents;
        var eventStoreStub = {
            loadEvents: function(aggregateId){
                calledWithEventStoreId = aggregateId;
                return resolvedPromise([]);
            },
            storeEvents : function(aggregateId, events){
                storedEvents = events;
                return resolvedPromise(events);
            }
        };
        var executedCommand = {};
        var tictactoe = function(history){
            return {
                executeCommand : function(cmd){
                    executedCommand = cmd;
                    return [];
                }
            }
        };
        var commandHandlers = tictactoe;
        var boundedContext = require('./tictactoeBoundedContext')(eventStoreStub, commandHandlers);
        var emptyCommand = {
            gameId: "111"
        };
        var events;
        boundedContext.handleCommand(emptyCommand).then(function(ev){
            events = ev;
            should(executedCommand.gameId).be.exactly("111");
            should(calledWithEventStoreId).be.exactly("111");
            should(events.length).be.exactly(0);
            should(storedEvents).be.exactly(events);
            done();
        });
    });
});
