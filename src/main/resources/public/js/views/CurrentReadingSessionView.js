define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Book = require('models/Book'),
        CurrentReadingSession = require('models/CurrentReadingSession'),
        localizer = require('utils/Localizer'),
        readonlyBookHtml = require('text!templates/ReadonlyBook.html'),
        readingSessionsHtml = require('text!templates/ReadingSessions.html');

    var ReadingSessionsView = Backbone.View.extend({
        tagName: 'div',

        readonlyBookTemplate: _.template(readonlyBookHtml),

        readingSessionsTemplate: _.template(readingSessionsHtml),

        initialize: function (bookUuid) {
            this.bookUuid = bookUuid;
        },

        render: function () {
            this.$el.html(this.readingSessionsTemplate());
            this.retrieveBook();
            this.retrieveCurrentReadingSession();
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
            this.$('#book-div').html(this.readonlyBookTemplate({
                book: this.book.attributes
            }));
        },

        errorOnRetrieveBook: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('book-retrieve-error', options.xhr.status));
        },

        retrieveCurrentReadingSession: function () {
            this.currentReadingSession = new CurrentReadingSession({bookUuid: this.bookUuid});
            this.currentReadingSession.fetchAndCreateIfMissing({
                success: _.bind(this.successOnRetrieveCurrentReadingSession, this),
                error: _.bind(this.errorOnRetrieveCurrentReadingSession, this)
            });
        },

        successOnRetrieveCurrentReadingSession: function (model, response, options) {
            this.$el.find('#message-div').html('retrieve - current reading session - SUCCESS');
        },

        errorOnRetrieveCurrentReadingSession: function (model, response, options) {
            this.$el.find('#message-div').html('retrieve - current reading session - ERROR: ' + options.xhr.status);
        }

    });

    return ReadingSessionsView;
});
