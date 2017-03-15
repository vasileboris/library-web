define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var LibraryView = require('views/LibraryView');

    var LibraryRouter = Backbone.Router.extend({
        routes: {
            'search-books' : 'searchBooks',
            'add-books': 'addBooks'
        },

        initialize: function () {
            this.libraryView = new LibraryView();
        },

        searchBooks: function () {
            this.libraryView.searchBooks();
        },

        addBooks: function () {
            this.libraryView.addBooks();
        }
    });

    return LibraryRouter;
});
