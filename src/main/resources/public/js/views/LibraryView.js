define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        BooksView = require('views/BooksView');

    var LibraryView = Backbone.View.extend({
        el: '#library-div',

        initialize: function() {
            this.manageBooks();
        },

        manageBooks: function () {
            this.currentView = new BooksView();
            this.render();
        },

        render: function () {
            this.$el.html(this.currentView.render().el);
        }

    });

    return LibraryView;
});
