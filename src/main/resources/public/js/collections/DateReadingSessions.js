define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        DateReadingSession = require('models/DateReadingSession'),
        user = require('User');

    var DateReadingSessions = Backbone.Collection.extend({
        model: DateReadingSession,

        initialize: function (bookUuid, uuid) {
            this.bookUuid = bookUuid;
            this.uuid = uuid;
        },

        url: function () {
            return '/users/'
                + user.id + '/books/'
                + this.bookUuid + '/reading-sessions/' + this.uuid;
        }
    });

    return DateReadingSessions;
});
