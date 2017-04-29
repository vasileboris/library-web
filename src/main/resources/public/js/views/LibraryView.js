define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        BooksView = require('views/BooksView'),
        CurrentReadingSessionView = require('views/CurrentReadingSessionView');

    var LibraryView = Backbone.View.extend({
        el: '#content',

        manageBooks: function () {
            this.currentView = new BooksView();
            this.render();
        },

        manageCurrentReadingSession: function (bookUuid) {
            this.currentView = new CurrentReadingSessionView(bookUuid);
            this.render();
        },

        render: function () {
            this.$el.html(this.currentView.render().el);
        }

    });

    return LibraryView;
});
