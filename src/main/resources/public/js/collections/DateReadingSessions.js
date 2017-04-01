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
                + this.bookUuid + '/reading-sessions/' + this.uuid + '/date-reading-sessions';
        },

        comparator: function (drs1, drs2) {
            return drs2.get('date').localeCompare(drs1.get('date'));
        }
    });

    return DateReadingSessions;
});
