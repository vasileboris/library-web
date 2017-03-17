define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Books = require('collections/Books');
    var BookView = require('views/BookView');
    var Message = require('models/Message');
    var booksHtml = require('text!templates/Books.html');
    var searchBooksHtml = require('text!templates/SearchBooks.html');

    var SearchBooksView = Backbone.View.extend({
        tagName: 'div',

        booksTemplate: _.template(booksHtml),

        searchBooksTemplate: _.template(searchBooksHtml),

        events: {
            'click #books-search-button': 'searchBooks'
        },

        initialize: function () {
            this.books = new Books();
        },

        render: function () {
            this.$el.html(this.booksTemplate());
            this.renderSearchBooks();
            return this;
        },

        renderSearchBooks: function () {
            this.$('#input-div').html(this.searchBooksTemplate());
        },

        searchBooks: function() {
            var searchText = this.$el.find('#books-search-text').val().trim();
            this.books = new Books(searchText);
            this.books.fetch({reset: true});

            this.listenTo(this.books, 'reset', this.renderBooks);
        },

        renderBooks: function () {
            this.$('#books-div').html('');
            this.books.each(function (book) {
                this.renderBook(book);
            }, this);
            return this;
        },

        renderBook: function (book) {
            var bookView = new BookView(book);
            this.$('#books-div').append(bookView.render().el);
        }

    });

    return SearchBooksView;
});
