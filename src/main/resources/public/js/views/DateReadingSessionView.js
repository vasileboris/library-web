import _ from 'underscore';
import Backbone from 'backbone';
import DateReadingSessionsDispatcher from 'events/DateReadingSessionsDispatcher';
import localizer from 'utils/Localizer';
import templateHtml from 'text!templates/DateReadingSession.html';

const DateReadingSessionView = Backbone.View.extend({
    tagName: 'article',

    className: 'result-date-reading-session',

    template: _.template(templateHtml),

    events: {
        'click .edit-item': 'editDateReadingSession',
        'click .delete-item': 'deleteDateReadingSession'
    },

    initialize: function (dateReadingSession) {
        this.dateReadingSession = dateReadingSession;
        this.listenTo(this.dateReadingSession, 'change', this.render);
    },

    render: function () {
        this.$el.html(this.template({
            dateReadingSession: this.dateReadingSession.attributes,
            localizer: localizer
        }));
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
