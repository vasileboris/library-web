define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        BooksDispatcher = require('events/BooksDispatcher'),
        localizer = require('utils/Localizer'),
        templateHtml = require('text!templates/Book.html');

    var BookView = Backbone.View.extend({
        tagName: 'div',

        className: 'div-results',

        template: _.template(templateHtml),

        events: {
            'click .edit-book': 'editBook',
            'click .delete-book': 'deleteBook'
        },

        initialize: function (book) {
            this.book = book;
            this.listenTo(this.book, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template({
                book: this.book.attributes
            }));
            return this;
        },

        editBook: function (e) {
            e.preventDefault();
            this.$el.find('.message-book').html('');
            BooksDispatcher.trigger(BooksDispatcher.Events.EDIT, this.book);
        },

        deleteBook: function (e) {
            e.preventDefault();
            this.$el.find('.message-book').html('');
            this.book.destroy({
                success: _.bind(this.successOnDeleteBook, this),
                error: _.bind(this.errorOnDeleteBook, this)
            });
        },

        successOnDeleteBook: function (model, response, options) {
            this.remove();
        },

        errorOnDeleteBook: function (model, response, options) {
            this.$el.find('.message-book').html(localizer.localize('book-delete-error', options.xhr.status));
        }

    });

    return BookView;
});
