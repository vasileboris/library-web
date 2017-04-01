define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        DateReadingSessionsDispatcher = require('events/DateReadingSessionsDispatcher'),
        localizer = require('utils/Localizer'),
        templateHtml = require('text!templates/DateReadingSession.html');

    var DateReadingSessionView = Backbone.View.extend({
        tagName: 'div',

        className: 'div-results',

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
                dateReadingSession: this.dateReadingSession.attributes
            }));
            return this;
        },

        editDateReadingSession: function (e) {
            e.preventDefault();
            this.$el.find('.message-item').html('');
            DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.EDIT, this.dateReadingSession);
        },

        deleteDateReadingSession: function (e) {
            e.preventDefault();
            this.$el.find('.message-item').html('');
            this.dateReadingSession.destroy({
                success: _.bind(this.successOnDeleteDateReadingSession, this),
                error: _.bind(this.errorOnDeleteDateReadingSession, this)
            });
        },

        successOnDeleteDateReadingSession: function (model, response, options) {
            this.remove();
        },

        errorOnDeleteDateReadingSession: function (model, response, options) {
            this.$el.find('.message-item').html(localizer.localize('date-reading-session-delete-error', options.xhr.status));
        }

    });

    return DateReadingSessionView;
});
