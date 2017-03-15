define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var SearchBooksView = require('views/SearchBooksView');
    var AddBooksView = require('views/AddBooksView');

    var LibraryView = Backbone.View.extend({
        el: '#library-div',

        initialize: function() {
            this.searchBooks();
        },

        searchBooks: function () {
            this.currentView = new SearchBooksView();
            this.render();
        },

        addBooks: function () {
            this.currentView = new AddBooksView();
            this.render();
        },

        render: function () {
            this.$el.html(this.currentView.render().el);
        }

    });

    return LibraryView;
});
