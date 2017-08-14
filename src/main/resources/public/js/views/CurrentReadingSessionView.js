import _ from 'underscore';
import Backbone from 'backbone';
import Book from 'models/Book';
import CurrentReadingSession from 'models/CurrentReadingSession';
import DateReadingSession from 'models/DateReadingSession';
import ReadingSessionProgress from 'models/ReadingSessionProgress';
import DateReadingSessions from 'collections/DateReadingSessions';
import DateReadingSessionView from 'views/DateReadingSessionView';
import DateReadingSessionsDispatcher from 'events/DateReadingSessionsDispatcher';
import localizer from 'utils/Localizer';
import readingSessionProgressHtml from 'text!templates/ReadingSessionProgress.html';
import addDateReadingSessionsHtml from 'text!templates/AddDateReadingSessions.html';
import editDateReadingSessionHtml from 'text!templates/EditDateReadingSession.html';
import currentReadingSessionHtml from 'text!templates/CurrentReadingSession.html';
import messageHtml from 'text!templates/Message.html';
import React from 'react';
import ReactDOM from 'react-dom';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';
import DateReadingSessionComponent from 'components/DateReadingSessionComponent';

const ReadingSessionsView = Backbone.View.extend({
    tagName: 'div',

    readingSessionProgressTemplate: _.template(readingSessionProgressHtml),

    addDateReadingSessionsTemplate: _.template(addDateReadingSessionsHtml),

    editDateReadingSessionTemplate: _.template(editDateReadingSessionHtml),

    currentReadingSessionTemplate: _.template(currentReadingSessionHtml),

    messageTemplate: _.template(messageHtml),

    events: {
        'click #date-reading-session-cancel-edit-link': 'renderAddDateReadingSessions',
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
        var book = new Book({uuid: this.bookUuid});
        book.fetch()
            .then(book => this.successOnRetrieveBook(book))
            .catch(error => this.errorOnRetrieveBook(error));
    },

    successOnRetrieveBook: function (book) {
        const readonlyBookComponent = React.createElement(ReadonlyBookComponent,
            {
               book: book
            });
        ReactDOM.render(readonlyBookComponent, this.$('#book-article').get(0));
    },

    errorOnRetrieveBook: function (error) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('book-retrieve-error', error.status)
        }));
    },

    retrieveCurrentReadingSession: function () {
        this.currentReadingSession = new CurrentReadingSession({bookUuid: this.bookUuid});
        this.currentReadingSession.fetchAndCreateIfMissing({
            success: _.bind(this.successOnRetrieveCurrentReadingSession, this),
            error: _.bind(this.errorOnRetrieveCurrentReadingSession, this)
        });
    },

    successOnRetrieveCurrentReadingSession: function (model) {
        this.renderAddDateReadingSessions();
        this.dateReadingSessions = new DateReadingSessions(this.bookUuid, this.currentReadingSession.get('uuid'));
        this.dateReadingSessions.fetch({
            success: _.bind(this.successOnRetrieveDateReadingSessions, this),
            error: _.bind(this.errorOnRetrieveDateReadingSessions, this)
        });
        this.listenTo(DateReadingSessionsDispatcher, DateReadingSessionsDispatcher.Events.EDIT, this.renderEditDateReadingSession);
        this.listenTo(DateReadingSessionsDispatcher, DateReadingSessionsDispatcher.Events.UPDATED, this.retrieveReadingSessionProgress);
        this.listenTo(DateReadingSessionsDispatcher, DateReadingSessionsDispatcher.Events.ERROR, this.renderErrorDateReadingSession);
    },

    retrieveReadingSessionProgress: function () {
        this.readingSessionProgress = new ReadingSessionProgress(this.bookUuid, this.currentReadingSession.get('uuid'));
        this.readingSessionProgress.fetch({
            success: _.bind(this.successOnRetrieveReadingSessionProgress, this),
            error: _.bind(this.errorOnRetrieveReadingSessionProgress, this)
        });
    },

    successOnRetrieveReadingSessionProgress: function (model, response, options) {
        this.$('#progress-article').html(this.readingSessionProgressTemplate({
            readingSessionProgress: this.readingSessionProgress.attributes,
            localizer: localizer
        }));
    },

    errorOnRetrieveReadingSessionProgress: function (model, response, options) {
        this.$('#progress-article').html('');
    },

    renderAddDateReadingSessions: function () {
        this.$('#input-div').html(this.addDateReadingSessionsTemplate({
            localizer: localizer
        }));
    },

    errorOnRetrieveCurrentReadingSession: function (error) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('reading-session-retrieve-error', error.status)
        }));
    },

    renderDateReadingSessions: function () {
        const $readingSessionsDiv = this.$('#reading-sessions-div');
        $readingSessionsDiv.html('');

        const dateReadingSessionsArticles = this.dateReadingSessions
            .map(dateReadingSession => React.createElement(DateReadingSessionComponent, {dateReadingSession: dateReadingSession.attributes}));
        ReactDOM.render(React.createElement('div', {}, dateReadingSessionsArticles), $readingSessionsDiv.get(0));
    },

    renderDateReadingSession: function (dateReadingSession) {
        const dateReadingSessionView = new DateReadingSessionView(dateReadingSession);
        this.$('#reading-sessions-div').append(dateReadingSessionView.render().el);
    },

    successOnRetrieveDateReadingSessions: function (model, response, options) {
        this.renderDateReadingSessions();
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.UPDATED);
    },

    errorOnRetrieveDateReadingSessions: function (model, response, options) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('date-reading-sessions-retrieve-error', options.xhr.status)
        }));
    },

    addDateReadingSession: function () {
        this.clearMessages();

        const dateReadingSessionData = this.buildDateReadingSessionData();
        const dateReadingSession = new DateReadingSession(dateReadingSessionData);
        dateReadingSession.isNewDateReadingSession = true;
        this.listenTo(dateReadingSession, "invalid", _.bind(this.errorOnValidateDateReadingSession, this));
        this.dateReadingSessions.create(dateReadingSession, {
            wait: true,
            success: _.bind(this.successOnAddDateReadingSession, this),
            error: _.bind(this.errorOnAddDateReadingSession, this)
        });
    },

    buildDateReadingSessionData: function () {
        const dateReadingSessionData = {};
        const idToProperty = this.idToProperty;
        this.$el.find('input').each(function (i, el) {
            const property = idToProperty[el.id];
            const value = $(el).val().trim();
            dateReadingSessionData[property] = value;
        });

        return dateReadingSessionData;
    },

    errorOnValidateDateReadingSession: function (model, error) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: error
        }));
    },

    successOnAddDateReadingSession: function (model, response, options) {
        delete model.isNewDateReadingSession;
        this.renderAddDateReadingSessions();
        this.renderDateReadingSessions();
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.UPDATED);
    },

    errorOnAddDateReadingSession: function (model, response, options) {
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('date-reading-session-add-error', options.xhr.status)
        }));
    },

    renderEditDateReadingSession: function (dateReadingSession) {
        this.clearMessages();

        this.$('#input-div').html(this.editDateReadingSessionTemplate({
            dateReadingSession: dateReadingSession.attributes,
            localizer: localizer
        }));
    },

    renderErrorDateReadingSession: function (message) {
        this.$el.find('#results-message-div').html(this.messageTemplate({
            message: message
        }));
    },

    updateDateReadingSession: function () {
        this.clearMessages();

        const dateReadingSessionData = this.buildDateReadingSessionData();
        const dateReadingSession = this.dateReadingSessions.get(dateReadingSessionData.date);
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
        this.$el.find('#message-div').html(this.messageTemplate({
            message: localizer.localize('date-reading-session-update-error', options.xhr.status)
        }));
    },

    clearMessages: function () {
        this.$el.find('#message-div').html('');
        this.$el.find('#results-message-div').html('');
    }

});

export default ReadingSessionsView;
