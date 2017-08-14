import _ from 'underscore';
import Backbone from 'backbone';
import DateReadingSessionsDispatcher from 'events/DateReadingSessionsDispatcher';
import localizer from 'utils/Localizer';
import DateReadingSessionComponent from 'components/DateReadingSessionComponent';
import React from 'react';
import ReactDOM from 'react-dom';

const DateReadingSessionView = Backbone.View.extend({
    tagName: 'article',

    className: 'result-date-reading-session',

    events: {
        'click .edit-item': 'editDateReadingSession',
        'click .delete-item': 'deleteDateReadingSession'
    },

    initialize: function (dateReadingSession) {
        this.dateReadingSession = dateReadingSession;
        this.listenTo(this.dateReadingSession, 'change', this.render);
    },

    render: function () {
        const dateReadingSessionComponent = React.createElement(DateReadingSessionComponent,
            { dateReadingSession: this.dateReadingSession.attributes });
        ReactDOM.render(dateReadingSessionComponent, this.$el.get(0));
        return this;
    },

    editDateReadingSession: function (e) {
        e.preventDefault();
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.ERROR, '');
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.EDIT, this.dateReadingSession);
    },

    deleteDateReadingSession: function (e) {
        e.preventDefault();
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.ERROR, '');
        this.dateReadingSession.destroy({
            success: _.bind(this.successOnDeleteDateReadingSession, this),
            error: _.bind(this.errorOnDeleteDateReadingSession, this)
        });
    },

    successOnDeleteDateReadingSession: function (model, response, options) {
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.UPDATED);
        this.remove();
    },

    errorOnDeleteDateReadingSession: function (model, response, options) {
        const message = localizer.localize('date-reading-session-delete-error', options.xhr.status);
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.ERROR, message);
    }

});

export default DateReadingSessionView;
