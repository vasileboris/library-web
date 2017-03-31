define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    var DateReadingSession = Backbone.Model.extend({
        idAttribute: 'date'
    });

    return DateReadingSession;
});
