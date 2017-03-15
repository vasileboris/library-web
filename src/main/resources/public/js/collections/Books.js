define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var Book = require('models/Book');
    var user = require('User');

    var Books = Backbone.Collection.extend({
        model: Book,

        initialize: function (searchText) {
            this.searchText = searchText;
        },

        url: function () {
            var url = '/users/' + user.id + '/books';
            if(this.searchText) {
                url += '?searchText=' + this.searchText;
            }
            return url;
        }
    });

    return Books;
});
