define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        LibraryView = require('views/LibraryView');

    var LibraryRouter = Backbone.Router.extend({
        routes: {
            'books' : 'manageBooks',
            'books/:bookUuid': 'manageReadingSessions'
        },

        initialize: function () {
            this.libraryView = new LibraryView();
            if('/' === window.location.pathname) {
                this.manageBooks();
            }
        },

        manageBooks: function () {
            this.libraryView.manageBooks();
        },

        manageReadingSessions: function (bookUuid) {
            this.libraryView.manageReadingSessions(bookUuid);
        }

    });

    return LibraryRouter;
});
