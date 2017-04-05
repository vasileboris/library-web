define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone');

    var Events = {
        EDIT: 'EDIT',
        UPDATED: 'UPDATED'
    };

    var DateReadingSessionsDispatcher = _.clone(Backbone.Events);

    DateReadingSessionsDispatcher.Events = Events;

    return DateReadingSessionsDispatcher;
});