define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Book = require('models/Book'),
        Books = require('collections/Books'),
        BookView = require('views/BookView'),
        BooksDispatcher = require('events/BooksDispatcher'),
        localizer = require('utils/Localizer'),
        booksHtml = require('text!templates/Books.html'),
        searchBooksHtml = require('text!templates/SearchBooks.html'),
        addBooksHtml = require('text!templates/AddBooks.html'),
        editBookHtml = require('text!templates/EditBook.html');

    var BooksView = Backbone.View.extend({
        tagName: 'div',

        booksTemplate: _.template(booksHtml),

        searchBooksTemplate: _.template(searchBooksHtml),

        addBooksTemplate: _.template(addBooksHtml),

        editBookTemplate: _.template(editBookHtml),

        events: {
            'click #books-search-link': 'renderSearchBooks',
            'click #books-search-button': 'searchBooks',
            'click #books-add-link': 'renderAddBooks',
            'click #book-add-button': 'addBook',
            'click #book-update-button': 'updateBook'
        },

        initialize: function () {
            this.books = new Books();
            this.listenTo(this.books, 'add', this.renderBook);
            this.listenTo(this.books, 'reset', this.renderBooks);
            this.listenTo(BooksDispatcher, BooksDispatcher.Events.EDIT, this.renderEditBook);
        },

        render: function () {
            this.$el.html(this.booksTemplate());
            this.renderSearchBooks();
            return this;
        },

        renderSearchBooks: function () {
            this.$el.find('#message-div').html('');
            this.$('#input-div').html(this.searchBooksTemplate({
                localizer: localizer
            }));
        },

        renderAddBooks: function (event) {
            event.preventDefault();
            this.$el.find('#message-div').html('');
            this.$('#input-div').html(this.addBooksTemplate({
                localizer: localizer
            }));
        },

        renderEditBook: function (book) {
            this.$el.find('#message-div').html('');
            this.$('#input-div').html(this.editBookTemplate({
                book: book.attributes,
                localizer: localizer
            }));
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

            var bookData = this.buildBookData(this);
            var book = new Book(bookData);
            this.listenTo(book, "invalid", _.bind(this.errorOnValidateBook, this));
            this.books.create(book, {
                wait: true,
                success: _.bind(this.successOnAddBook, this),
                error: _.bind(this.errorOnAddBook, this)
            });
        },

        successOnAddBook: function (model, response, options) {
            this.renderSearchBooks();
        },

        errorOnAddBook: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('book-add-error', options.xhr.status));
        },

        updateBook: function () {
            this.$el.find('#message-div').html('');

            var bookData = this.buildBookData(this);
            var book = this.books.get(bookData.uuid);
            if(book) {
                this.listenTo(book, "invalid", _.bind(this.errorOnValidateBook, this));
                book.save(bookData, {
                    success: _.bind(this.successOnUpdateBook, this),
                    error: _.bind(this.errorOnUpdateBook, this)
                });
            } else {
                this.renderSearchBooks();
            }
        },

        errorOnValidateBook: function (model, error) {
            this.$el.find('#message-div').html(error);
        },

        successOnUpdateBook: function (model, response, options) {
            this.renderSearchBooks();
        },

        errorOnUpdateBook: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('book-update-error', options.xhr.status));
        },

        buildBookData: function () {
            var bookData = {};
            this.$el.find('input').each(function (i, el) {
                var property = el.id.replace('book-', '').replace(/-\w+/, '');
                var value = $(el).val().trim();
                if (property === 'authors') {
                    value = value.split(",")
                        .map(function (s) { return s.trim(); })
                        .filter(function (s) { return s !== ''; })
                }
                bookData[property] = value;
            });

            return bookData;
        }

    });

    return BooksView;
});
