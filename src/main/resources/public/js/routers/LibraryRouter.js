define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        LibraryView = require('views/LibraryView');

    var LibraryRouter = Backbone.Router.extend({
        routes: {
            'books' : 'manageBooks'
        },

        initialize: function () {
            this.libraryView = new LibraryView();
        },

        manageBooks: function () {
            this.libraryView.manageBooks();
        }

    });

    return LibraryRouter;
});
