define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    var Book = Backbone.Model.extend({
        defaults: {
            uuid: null
        },

        idAttribute: 'uuid'
    });

    return Book;
});
