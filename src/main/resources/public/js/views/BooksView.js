import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import Book from 'models/Book';
import Books from 'collections/Books';
import BooksDispatcher from 'events/BooksDispatcher';
import localizer from 'utils/Localizer';
import booksHtml from 'text!templates/Books.html';
import messageHtml from 'text!templates/Message.html';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import SearchBooksComponent from 'components/book/SearchBooksComponent';
import BooksComponent from 'components/book/BooksComponent';
import InputBookComponent from 'components/book/InputBookComponent';

const BooksView = Backbone.View.extend({
    tagName: 'div',

    booksTemplate: _.template(booksHtml),

    messageTemplate: _.template(messageHtml),

        initialize: function () {
        this.booksSearchText = '';
        this.book = {};
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
        this.clearInput();
        this.book = {};
        render(<InputBookComponent operation='add'
                                   book={this.book}
                                   onInputChange={this.onBookInputChange.bind(this)}
                                   onAddButtonClick={this.addBook.bind(this)}
                                   onAddClick={this.updateBook.bind(this)}
                                   onCancelButtonClick={this.renderSearchBooks.bind(this)}/>, document.getElementById('input-div'));
    },

    renderEditBook: function (book) {
        this.clearMessages();
        this.clearInput();
        this.book = book;
        render(<InputBookComponent operation='edit'
                                   book={this.book}
                                   onInputChange={this.onBookInputChange.bind(this)}
                                   onAddButtonClick={this.addBook.bind(this)}
                                   onAddClick={this.updateBook.bind(this)}
                                   onCancelButtonClick={this.renderSearchBooks.bind(this)}/>, document.getElementById('input-div'));
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
        if(this.book.authors) {
            this.book.authors = this.book.authors.split(",")
                .map(function (s) { return s.trim(); })
                .filter(function (s) { return s !== ''; })
        }
        return this.book;
    },

    clearMessages: function () {
        this.$el.find('#message-div').html('');
        this.$el.find('#results-message-div').html('');
    },

    clearInput: function() {
        this.booksSearchText = '';
        this.book = {};
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
    },

    onBookInputChange(e) {
        console.log('onBookInputChange: ' + e.target.name + ', ' + e.target.value);
        this.book[e.target.name] = e.target.value;
    }
});

export default BooksView;
