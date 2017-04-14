define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        MenuView = require('views/MenuView'),
        LibraryView = require('views/LibraryView');

    var LibraryRouter = Backbone.Router.extend({
        routes: {
            'books' : 'manageBooks',
            'books/:bookUuid': 'manageCurrentReadingSession'
        },

        initialize: function () {
            this.menuView = new MenuView();
            this.menuView.render();

            this.libraryView = new LibraryView();
            if('/' === window.location.pathname) {
                this.manageBooks();
            }
        },

        manageBooks: function () {
            this.libraryView.manageBooks();
        },

        manageCurrentReadingSession: function (bookUuid) {
            this.libraryView.manageCurrentReadingSession(bookUuid);
        }

    });

    return LibraryRouter;
});
