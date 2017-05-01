define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone');

    var Events = {
        EDIT: 'EDIT',
        ERROR: 'ERROR'
    };

    var BooksDispatcher = _.clone(Backbone.Events);

    BooksDispatcher.Events = Events;

    return BooksDispatcher;
});