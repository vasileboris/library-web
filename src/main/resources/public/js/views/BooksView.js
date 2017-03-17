define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Books = require('collections/Books');
    var BookView = require('views/BookView');
    var Message = require('models/Message');
    var booksHtml = require('text!templates/Books.html');
    var searchBooksHtml = require('text!templates/SearchBooks.html');
    var addBooksHtml = require('text!templates/AddBooks.html');

    var BooksView = Backbone.View.extend({
        tagName: 'div',

        booksTemplate: _.template(booksHtml),

        searchBooksTemplate: _.template(searchBooksHtml),

        addBooksTemplate: _.template(addBooksHtml),

        events: {
            'click #books-search-button': 'searchBooks',
            'click #books-add-link': 'renderAddBooks',
            'click #book-add-button': 'addBook'
        },

        initialize: function () {
            this.books = new Books();
            this.listenTo(this.books, 'add', this.renderBook);
            this.listenTo(this.books, 'reset', this.renderBooks);
        },

        render: function () {
            this.$el.html(this.booksTemplate());
            this.renderSearchBooks();
            return this;
        },

        renderSearchBooks: function () {
            this.$('#input-div').html(this.searchBooksTemplate());
        },

        renderAddBooks: function (event) {
            event.preventDefault();
            this.$('#input-div').html(this.addBooksTemplate());
        },

        searchBooks: function() {
            var searchText = this.$el.find('#books-search-text').val().trim();
            this.books.changeSearchText(searchText);
            this.books.fetch({reset: true});
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
        },

        addBook: function () {
            this.$el.find('#message-div').html('');

            var bookData = {};
            this.$el.find('input').each(function(i, el){
                var property = el.id.replace('book-','').replace(/-\w+/,'');
                var value = $(el).val().trim();
                if(property === 'authors') {
                    value = value.split(",").map(function (s) {
                        return s.trim();
                    })
                }
                bookData[property] = value;
            });

            this.books.create(bookData, {
                wait: true,
                success: _.bind(this.successOnAddBook, this),
                error: _.bind(this.errorOnAddBook, this)
            });
        },

        successOnAddBook: function (model, response, options) {
            this.$el.find('input').each(function(i, el){
                $(el).val('');
            });
        },

        errorOnAddBook: function (model, response, options) {
            this.$el.find('#message-div').html('Error on adding book: ' + options.xhr.status);
        }
    });

    return BooksView;
});
