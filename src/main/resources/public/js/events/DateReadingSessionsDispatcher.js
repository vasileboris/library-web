define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone');

    var Events = {
        EDIT: 'EDIT'
    };

    var DateReadingSessionsDispatcher = _.clone(Backbone.Events);

    DateReadingSessionsDispatcher.Events = Events;

    return DateReadingSessionsDispatcher;
});