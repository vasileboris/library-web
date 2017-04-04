define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        user = require('User');

    var ReadingSessionProgress = Backbone.Model.extend({
        initialize: function (bookUuid, uuid) {
            this.bookUuid = bookUuid;
            this.uuid = uuid;
        },

        urlRoot: function () {
            return '/users/' + user.id + '/books/'
                + this.bookUuid + '/reading-sessions/'
                + this.uuid + '/progress';
        }
    });

    return ReadingSessionProgress;
});
