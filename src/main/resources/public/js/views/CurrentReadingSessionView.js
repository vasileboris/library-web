define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Book = require('models/Book'),
        CurrentReadingSession = require('models/CurrentReadingSession'),
        DateReadingSession = require('models/DateReadingSession'),
        ReadingSessionProgress = require('models/ReadingSessionProgress'),
        DateReadingSessions = require('collections/DateReadingSessions'),
        DateReadingSessionView = require('views/DateReadingSessionView'),
        DateReadingSessionsDispatcher = require('events/DateReadingSessionsDispatcher'),
        localizer = require('utils/Localizer'),
        readonlyBookHtml = require('text!templates/ReadonlyBook.html'),
        readingSessionProgressHtml = require('text!templates/ReadingSessionProgress.html'),
        addDateReadingSessionsHtml = require('text!templates/AddDateReadingSessions.html'),
        editDateReadingSessionHtml = require('text!templates/EditDateReadingSession.html'),
        currentReadingSessionHtml = require('text!templates/CurrentReadingSession.html');

    var ReadingSessionsView = Backbone.View.extend({
        tagName: 'div',

        readonlyBookTemplate: _.template(readonlyBookHtml),

        readingSessionProgressTemplate: _.template(readingSessionProgressHtml),

        addDateReadingSessionsTemplate: _.template(addDateReadingSessionsHtml),

        editDateReadingSessionTemplate: _.template(editDateReadingSessionHtml),

        currentReadingSessionTemplate: _.template(currentReadingSessionHtml),

        events: {
            'click #date-reading-session-add-button': 'addDateReadingSession',
            'click #date-reading-session-update-button': 'updateDateReadingSession'
        },

        idToProperty: {
            'date-reading-session-date-text': 'date',
            'date-reading-session-last-read-page-text': 'lastReadPage',
            'date-reading-session-bookmark-text': 'bookmark'
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
            this.renderAddDateReadingSessions();
            this.dateReadingSessions = new DateReadingSessions(this.bookUuid, this.currentReadingSession.get('uuid'));
            this.dateReadingSessions.fetch({
                success: _.bind(this.successOnRetrieveDateReadingSessions, this),
                error: _.bind(this.errorOnRetrieveDateReadingSessions, this)
            });
            this.listenTo(DateReadingSessionsDispatcher, DateReadingSessionsDispatcher.Events.EDIT, this.renderEditDateReadingSession);
            this.listenTo(DateReadingSessionsDispatcher, DateReadingSessionsDispatcher.Events.UPDATED, this.retrieveReadingSessionProgress);
        },

        retrieveReadingSessionProgress: function () {
            this.readingSessionProgress = new ReadingSessionProgress(this.bookUuid, this.currentReadingSession.get('uuid'));
            this.readingSessionProgress.fetch({
                success: _.bind(this.successOnRetrieveReadingSessionProgress, this),
                error: _.bind(this.errorOnRetrieveReadingSessionProgress, this)
            });
        },

        successOnRetrieveReadingSessionProgress: function (model, response, options) {
            this.$('#progress-div').html(this.readingSessionProgressTemplate({
                readingSessionProgress: this.readingSessionProgress.attributes
            }));
        },

        errorOnRetrieveReadingSessionProgress: function (model, response, options) {
            this.$('#progress-div').html('');
        },

        renderAddDateReadingSessions: function () {
            this.$('#input-div').html(this.addDateReadingSessionsTemplate({
                localizer: localizer
            }));
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
            DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.UPDATED);
        },

        errorOnRetrieveDateReadingSessions: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('date-reading-sessions-retrieve-error', options.xhr.status));
        },

        addDateReadingSession: function () {
            this.$el.find('#message-div').html('');

            var dateReadingSessionData = this.buildDateReadingSessionData();
            var dateReadingSession = new DateReadingSession(dateReadingSessionData);
            dateReadingSession.isNewDateReadingSession = true;
            this.listenTo(dateReadingSession, "invalid", _.bind(this.errorOnValidateDateReadingSession, this));
            this.dateReadingSessions.create(dateReadingSession, {
                wait: true,
                success: _.bind(this.successOnAddDateReadingSession, this),
                error: _.bind(this.errorOnAddDateReadingSession, this)
            });
        },

        buildDateReadingSessionData: function () {
            var dateReadingSessionData = {};
            var idToProperty = this.idToProperty;
            this.$el.find('input').each(function (i, el) {
                var property = idToProperty[el.id];
                var value = $(el).val().trim();
                dateReadingSessionData[property] = value;
            });

            return dateReadingSessionData;
        },

        errorOnValidateDateReadingSession: function (model, error) {
            this.$el.find('#message-div').html(error);
        },

        successOnAddDateReadingSession: function (model, response, options) {
            delete model.isNewDateReadingSession;
            this.renderAddDateReadingSessions();
            this.renderDateReadingSessions();
            DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.UPDATED);
        },

        errorOnAddDateReadingSession: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('date-reading-session-add-error', options.xhr.status));
        },

        renderEditDateReadingSession: function (dateReadingSession) {
            this.$el.find('#message-div').html('');
            this.$('#input-div').html(this.editDateReadingSessionTemplate({
                dateReadingSession: dateReadingSession.attributes,
                localizer: localizer
            }));
        },

        updateDateReadingSession: function () {
            this.$el.find('#message-div').html('');

            var dateReadingSessionData = this.buildDateReadingSessionData();
            var dateReadingSession = this.dateReadingSessions.get(dateReadingSessionData.date);
            if(dateReadingSession) {
                this.listenTo(dateReadingSession, "invalid", _.bind(this.errorOnValidateDateReadingSession, this));
                dateReadingSession.save(dateReadingSessionData, {
                    success: _.bind(this.successOnUpdateDateReadingSession, this),
                    error: _.bind(this.errorOnUpdateDateReadingSession, this)
                });
            } else {
                this.renderAddDateReadingSessions();
            }
        },

        successOnUpdateDateReadingSession: function (model, response, options) {
            this.renderAddDateReadingSessions();
            DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.UPDATED);
        },

        errorOnUpdateDateReadingSession: function (model, response, options) {
            this.$el.find('#message-div').html(localizer.localize('date-reading-session-update-error', options.xhr.status));
        }

    });

    return ReadingSessionsView;
});
