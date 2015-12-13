'use strict';
var _                = require('lodash');
var boundedContext   = require('../model/tictactoe/tictactoeBoundedContext');
var tictactoeHandler = require('../model/tictactoe/tictactoeCommandHandler');
var app              = require('../app');

module.exports = function (store) {
    return {
        executeCommand: (req, res) => {
            try {
                var context = boundedContext(store, tictactoeHandler);
                console.log('context', context);
                console.log('req.body',req.body);
                context.handleCommand(req.body).then( function (result) {
                    console.log('result', result);
                    res.json(result);
                }, (err) => {
                    console.log('err', err);
                    res.json(err);
                });
            }
            catch (exception) {
                res.json(exception)
            }
        }
    };
};
