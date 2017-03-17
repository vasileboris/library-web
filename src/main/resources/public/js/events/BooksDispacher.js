define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone');

    var Events = {
        EDIT: 'EDIT'
    }

    var BookDispatcher = _.clone(Backbone.Events);

    BookDispatcher.Events = Events;

    return BookDispatcher;
});

