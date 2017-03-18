define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        user = require('User');

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
        },
        
        validate: function (bookData) {
            if(bookData.isbn10 + bookData.isbn13 === '') {
                return 'ISBN 10 or ISBN 13 must be filled!'
            }

            if(bookData.title === '') {
                return 'Title must be specified!'
            }

            if(bookData.authors.length === 0) {
                return 'At least one author needs to be specified!'
            }

            if(!('' + bookData.pages).match(/^\d+$/) || bookData.pages < 1) {
                return 'Number of pages must an integer number greater than 1!'
            }
        }

    });

    return Book;
});
