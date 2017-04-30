define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        BooksDispatcher = require('events/BooksDispatcher'),
        localizer = require('utils/Localizer'),
        urlUtil = require('utils/UrlUtil'),
        imageUtil = require('utils/ImageUtil'),
        templateHtml = require('text!templates/Book.html');

    var BookView = Backbone.View.extend({
        tagName: 'article',

        className: 'result-book',

        template: _.template(templateHtml),

        events: {
            'click .edit-item': 'editBook',
            'click .read-item': 'readBook',
            'click .delete-item': 'deleteBook'
        },

        initialize: function (book) {
            this.book = book;
            this.listenTo(this.book, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template({
                book: this.book.attributes,
                localizer: localizer,
                urlUtil: urlUtil,
                imageUtil: imageUtil
            }));
            return this;
        },

        editBook: function (e) {
            e.preventDefault();
            this.$el.find('.message-item').html('');
            BooksDispatcher.trigger(BooksDispatcher.Events.EDIT, this.book);
        },

        readBook: function (e) {
            e.preventDefault();
            Backbone.history.navigate('/books/' + this.book.get('uuid'), {trigger: true});
        },

        deleteBook: function (e) {
            e.preventDefault();
            this.$el.find('.message-item').html('');
            this.book.destroy({
                success: _.bind(this.successOnDeleteBook, this),
                error: _.bind(this.errorOnDeleteBook, this)
            });
        },

        successOnDeleteBook: function (model, response, options) {
            this.remove();
        },

        errorOnDeleteBook: function (model, response, options) {
            this.$el.find('.message-item').html(localizer.localize('book-delete-error', options.xhr.status));
        }

    });

    return BookView;
});
