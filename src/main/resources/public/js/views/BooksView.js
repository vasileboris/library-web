import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import Book from 'models/Book';
import Books from 'collections/Books';
import BookView from 'views/BookView';
import BooksDispatcher from 'events/BooksDispatcher';
import localizer from 'utils/Localizer';
import booksHtml from 'text!templates/Books.html';
import searchBooksHtml from 'text!templates/SearchBooks.html';
import addBooksHtml from 'text!templates/AddBooks.html';
import editBookHtml from 'text!templates/EditBook.html';
import messageHtml from 'text!templates/Message.html';

const BooksView = Backbone.View.extend({
    tagName: 'div',

    booksTemplate: _.template(booksHtml),

    searchBooksTemplate: _.template(searchBooksHtml),

    addBooksTemplate: _.template(addBooksHtml),

    editBookTemplate: _.template(editBookHtml),

    messageTemplate: _.template(messageHtml),

    events: {
        'click #book-cancel-add-link': 'renderSearchBooks',
        'click #book-cancel-edit-link': 'renderSearchBooks',
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
        this.listenTo(BooksDispatcher, BooksDispatcher.Events.ERROR, this.renderErrorBook);
    },

    render: function () {
        this.$el.html(this.booksTemplate());
        this.renderSearchBooks();
        return this;
    },

    renderSearchBooks: function () {
        this.clearMessages();
        this.$('#input-div').html(this.searchBooksTemplate({
            localizer: localizer
        }));
    },

    renderAddBooks: function (event) {
        event.preventDefault();
        this.clearMessages();
        this.$('#input-div').html(this.addBooksTemplate({
            localizer: localizer
        }));
    },

    renderEditBook: function (book) {
        this.clearMessages();
        this.$('#input-div').html(this.editBookTemplate({
            book: book.attributes,
            localizer: localizer
        }));
    },

    renderErrorBook: function (message) {
        this.$el.find('#results-message-div').html(this.messageTemplate({
            message: message
        }));
    },

    searchBooks: function() {
        const searchText = this.$el.find('#books-search-text').val().trim();
        $('body').addClass('waiting');
        this.$('#books-div').html('');
        this.books.changeSearchText(searchText);
        this.books.fetch({reset: true});
    },

    renderBooks: function () {
        this.$('#books-div').html('');
        $('body').removeClass('waiting');
        this.books.each(function (book) {
            this.renderBook(book);
        }, this);
        return this;
    },

    renderBook: function (book) {
        const bookView = new BookView(book);
        this.$('#books-div').append(bookView.render().el);
    },

    addBook: function () {
        this.clearMessages();

        const bookData = this.buildBookData();
        const book = new Book(bookData);
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
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('book-add-error', options.xhr.status)
        }));
    },

    updateBook: function () {
        this.clearMessages();

        const bookData = this.buildBookData(this);
        const book = this.books.get(bookData.uuid);
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
        this.$el.find('#message-div').html(this.messageTemplate({
            message: error
        }));
    },

    successOnUpdateBook: function (model, response, options) {
        this.renderSearchBooks();
    },

    errorOnUpdateBook: function (model, response, options) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('book-update-error', options.xhr.status)
        }));
    },

    buildBookData: function () {
        const bookData = {};
        this.$el.find('input').each(function (i, el) {
            const property = el.id.replace('book-', '').replace(/-\w+$/, '');
            let value = $(el).val().trim();
            if (property === 'authors') {
                value = value.split(",")
                    .map(function (s) { return s.trim(); })
                    .filter(function (s) { return s !== ''; })
            }
            bookData[property] = value;
        });

        return bookData;
    },

    clearMessages: function () {
        this.$el.find('#message-div').html('');
        this.$el.find('#results-message-div').html('');
    }

});

export default BooksView;
