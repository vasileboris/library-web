define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var user = require('User');

    var Book = Backbone.Model.extend({
        defaults: {
            uuid: null,
            isbn10: '',
            isbn13: '',
            title: '',
            authors: [],
            pages: 0
        },

        idAttribute: 'uuid',

        urlRoot: function () {
            return '/users/' + user.id + '/books';
        }

    });

    return Book;
});
