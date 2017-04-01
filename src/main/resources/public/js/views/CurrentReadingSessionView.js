define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Book = require('models/Book'),
        CurrentReadingSession = require('models/CurrentReadingSession'),
        DateReadingSession = require('models/DateReadingSession'),
        DateReadingSessions = require('collections/DateReadingSessions'),
        DateReadingSessionView = require('views/DateReadingSessionView'),
        DateReadingSessionsDispatcher = require('events/DateReadingSessionsDispatcher'),
        localizer = require('utils/Localizer'),
        readonlyBookHtml = require('text!templates/ReadonlyBook.html'),
        addDateReadingSessionsHtml = require('text!templates/AddDateReadingSessions.html'),
        currentReadingSessionHtml = require('text!templates/CurrentReadingSession.html');

    var ReadingSessionsView = Backbone.View.extend({
        tagName: 'div',

        readonlyBookTemplate: _.template(readonlyBookHtml),

        addDateReadingSessionsTemplate: _.template(addDateReadingSessionsHtml),

        currentReadingSessionTemplate: _.template(currentReadingSessionHtml),

        events: {
            'click #date-reading-session-add-button': 'addDateReadingSession'
        },

        initialize: function (bookUuid) {
            this.bookUuid = bookUuid;
        },

        render: function () {
            this.$el.html(this.currentReadingSessionTemplate());
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
            });
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
            this.$('#input-div').html(this.addDateReadingSessionsTemplate({
                localizer: localizer
            }));
            this.dateReadingSessions = new DateReadingSessions(this.bookUuid, this.currentReadingSession.get('uuid'));
            this.dateReadingSessions.fetch({
                wait: true,
                success: _.bind(this.successOnRetrieveDateReadingSessions, this),
                error: _.bind(this.errorOnRetrieveDateReadingSessions, this)
            });
        },

        errorOnRetrieveCurrentReadingSession: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('reading-session-retrieve-error', options.xhr.status));
        },

        renderDateReadingSessions: function () {
            this.$('#reading-sessions-div').html('');
            this.dateReadingSessions.each(function (dateReadingSession) {
                this.renderDateReadingSession(dateReadingSession);
            }, this);
        },

        renderDateReadingSession: function (dateReadingSession) {
            var dateReadingSessionView = new DateReadingSessionView(dateReadingSession);
            this.$('#reading-sessions-div').append(dateReadingSessionView.render().el);
        },

        successOnRetrieveDateReadingSessions: function (model, response, options) {
            this.renderDateReadingSessions();
        },

        errorOnRetrieveDateReadingSessions: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('date-reading-sessions-retrieve-error', options.xhr.status));
        },

        addDateReadingSession: function () {
            this.$el.find('#message-div').html('');

            var dateReadingSessionData = this.buildDateReadingSessionData();
            var dateReadingSession = new DateReadingSession(dateReadingSessionData);
            dateReadingSession.isNew = function () {
                return true;
            };
            this.listenTo(dateReadingSession, "invalid", _.bind(this.errorOnValidateDateReadingSession, this));
            this.dateReadingSessions.create(dateReadingSession, {
                wait: true,
                success: _.bind(this.successOnAddDateReadingSession, this),
                error: _.bind(this.errorOnAddDateReadingSession, this)
            });
        },

        buildDateReadingSessionData: function () {
            var dateReadingSessionData = {};
            this.$el.find('input').each(function (i, el) {
                var property = el.id.replace('date-reading-session-', '').replace(/-\w+/, '');
                var value = $(el).val().trim();
                dateReadingSessionData[property] = value;
            });

            return dateReadingSessionData;
        },

        errorOnValidateDateReadingSession: function (model, error) {
            this.$el.find('#message-div').html(error);
        },

        successOnAddDateReadingSession: function (model, response, options) {
            this.renderDateReadingSessions();
        },

        errorOnAddDateReadingSession: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('date-reading-session-add-error', options.xhr.status));
        },

    });

    return ReadingSessionsView;
});
