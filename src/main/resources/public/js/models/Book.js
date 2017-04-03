define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        localizer = require('utils/Localizer'),
        user = require('User');

    var Book = Backbone.Model.extend({
        idAttribute: 'uuid',

        urlRoot: function () {
            return '/users/' + user.id + '/books';
        },
        
        validate: function (bookData) {
            if(bookData.isbn10 + bookData.isbn13 === '') {
                return localizer.localize('book-isbn-validation');
            }

            if(bookData.title === '') {
                return localizer.localize('book-title-validation');
            }

            if(bookData.authors.length === 0) {
                return localizer.localize('book-authors-validation');
            }

            var pagesRegexp = /^\d+$/;
            if(!pagesRegexp.test(bookData.pages) || bookData.pages < 1) {
                return localizer.localize('book-pages-validation');
            }
        }

    });

    return Book;
});
