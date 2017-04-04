define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        localizer = require('utils/Localizer');

    var DateReadingSession = Backbone.Model.extend({
        idAttribute: 'date',

        isNew: function () {
            if(this.isNewDateReadingSession) {
                return true;
            }
            return Backbone.Model.prototype.isNew.apply(this, arguments);
        },

        validate: function (dateReadingSessionData) {
            var dateRegexp = /^\d{4}-\d{2}-\d{2}$/;
            if(!dateRegexp.test(dateReadingSessionData.date)) {
                return localizer.localize('date-reading-session-date-validation');
            }

            var pagesRegexp = /^\d+$/;
            if(!pagesRegexp.test(dateReadingSessionData.lastReadPage) || dateReadingSessionData.lastReadPage < 1) {
                return localizer.localize('date-reading-session-last-read-page-validation');
            }

        }

    });

    return DateReadingSession;
});
