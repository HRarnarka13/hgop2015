'use strict';
var _ = require('lodash');
var app = require('../../app');

module.exports = function (eventStore) {
    return {
        index: function (req, res) {
            console.log('req.params', req.params);
            eventStore.loadEvents(req.params.gameId).then(function (events) {
                console.log('events', events);
                res.json(events);
            }, function (err) {
                console.log('error!', err);
                res.json(err);
            });
        }
    }
};
