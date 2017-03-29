define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        BooksView = require('views/BooksView'),
        ReadingSessionsView = require('views/ReadingSessionsView');

    var LibraryView = Backbone.View.extend({
        el: '#library-div',

        initialize: function() {
            //Is there a better method to do this?
            if('/' === window.location.pathname) {
                this.manageBooks();
            }
        },

        manageBooks: function () {
            this.currentView = new BooksView();
            this.render();
        },

        manageReadingSessions: function (bookUuid) {
            this.currentView = new ReadingSessionsView(bookUuid);
            this.render();
        },

        render: function () {
            this.$el.html(this.currentView.render().el);
        }

    });

    return LibraryView;
});
