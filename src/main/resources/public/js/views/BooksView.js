import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import Book from 'models/Book';
import Books from 'collections/Books';
import BooksDispatcher from 'events/BooksDispatcher';
import localizer from 'utils/Localizer';
import booksHtml from 'text!templates/Books.html';
import addBooksHtml from 'text!templates/AddBooks.html';
import editBookHtml from 'text!templates/EditBook.html';
import messageHtml from 'text!templates/Message.html';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import SearchBooksComponent from 'components/book/SearchBooksComponent';
import BooksComponent from 'components/book/BooksComponent';

const BooksView = Backbone.View.extend({
    tagName: 'div',

    className: 'content',

    booksTemplate: _.template(booksHtml),

    addBooksTemplate: _.template(addBooksHtml),

    editBookTemplate: _.template(editBookHtml),

    messageTemplate: _.template(messageHtml),

    events: {
        'click #book-cancel-add-link': 'renderSearchBooks',
        'click #book-cancel-edit-link': 'renderSearchBooks',
        'click #book-add-button': 'addBook',
        'click #book-update-button': 'updateBook'
    },

    initialize: function () {
        this.booksSearchText = '';
        this.books = new Books();
        this.listenTo(this.books, 'add', this.renderBooks);
        this.listenTo(this.books, 'reset', this.renderBooks);
        this.listenTo(BooksDispatcher, BooksDispatcher.Events.EDIT, this.renderEditBook);
        this.listenTo(BooksDispatcher, BooksDispatcher.Events.ERROR, this.renderErrorBook);
    },

    render: function () {
        this.$el.html(this.booksTemplate());
        setTimeout(this.renderSearchBooks.bind(this));
        return this;
    },

    renderSearchBooks: function () {
        this.clearMessages();
        render(<SearchBooksComponent onInputChange={this.onBooksSearchInputChange.bind(this)}
                                     onSearchClick={this.searchBooks.bind(this)}
                                     onAddClick={this.renderAddBooks.bind(this)}/>, document.getElementById('input-div'));
    },

    renderAddBooks: function (event) {
        event.preventDefault();
        this.clearMessages();
        this.clearSearchBooks();
        this.$('#input-div').html(this.addBooksTemplate({
            localizer: localizer
        }));
    },

    renderEditBook: function (book) {
        this.clearMessages();
        this.clearSearchBooks();
        this.$('#input-div').html(this.editBookTemplate({
            book: book,
            localizer: localizer
        }));
    },

    renderErrorBook: function (message) {
        this.$el.find('#results-message-div').html(this.messageTemplate({
            message: message
        }));
    },

    onBooksSearchInputChange: function(e) {
        this.booksSearchText = e.target.value;
    },

    searchBooks: function() {
        $('body').addClass('waiting');
        unmountComponentAtNode(document.getElementById('books-div'));
        this.books.changeSearchText(this.booksSearchText.trim());
        this.books.fetch({reset: true});
    },

    renderBooks: function () {
        unmountComponentAtNode(document.getElementById('books-div'));
        const books = this.books.models.map(book => book.attributes);
        render(<BooksComponent books={books}
                               onEdit={this.renderEditBook.bind(this)}
                               onDelete={this.deleteBook.bind(this)}/>, document.getElementById('books-div'));
        return this;
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
            book.save(bookData)
                .then(() => {
                    this.renderSearchBooks();
                    this.renderBooks();
                })
                .catch(error => this.errorOnUpdateBook(error))
        } else {
            this.renderSearchBooks();
        }
    },

    errorOnValidateBook: function (model, error) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: error
        }));
    },

    errorOnUpdateBook: function (error) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('book-update-error', error.status)
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
    },

    clearSearchBooks: function() {
        this.booksSearchText = '';
        unmountComponentAtNode(document.getElementById('input-div'));
    },

    deleteBook: function (book) {
        BooksDispatcher.trigger(BooksDispatcher.Events.ERROR, '');
        const model = this.books.get(book.uuid);
        model.destroy()
            .then(() => this.renderBooks())
            .catch(error => this.errorOnDeleteBook(error));
    },

    errorOnDeleteBook: function (error) {
        const message = localizer.localize('book-delete-error', error.status);
        BooksDispatcher.trigger(BooksDispatcher.Events.ERROR, message);
    }


});

export default BooksView;
