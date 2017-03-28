define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Book = require('models/Book'),
        localizer = require('utils/Localizer'),
        readingSessionsBookHtml = require('text!templates/ReadingSessionsBook.html'),
        readingSessionsHtml = require('text!templates/ReadingSessions.html');

    var ReadingSessionsView = Backbone.View.extend({
        tagName: 'div',

        readingSessionsBookTemplate: _.template(readingSessionsBookHtml),

        readingSessionsTemplate: _.template(readingSessionsHtml),

        initialize: function (bookUuid) {
            this.bookUuid = bookUuid;
        },

        render: function () {
            this.$el.html(this.readingSessionsTemplate());
            this.retrieveBook();
            return this;
        },

        retrieveBook: function () {
            this.book = new Book({uuid: this.bookUuid});
            this.book.fetch({
                wait: true,
                success: _.bind(this.successOnRetrieveBook, this),
                error: _.bind(this.errorOnRetrieveBook, this)
            })
        },

        successOnRetrieveBook: function (model, response, options) {
            this.$('#book-div').html(this.readingSessionsBookTemplate({
                book: this.book.attributes
            }));
        },

        errorOnRetrieveBook: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('book-retrieve-error', options.xhr.status));
        },

    });

    return ReadingSessionsView;
});
