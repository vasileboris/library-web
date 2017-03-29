define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        user = require('User');

    var ReadingSession = Backbone.Model.extend({
        idAttribute: 'uuid',

        initialize: function (bookUuid) {
            this.bookUuid = bookUuid;
        },

        urlRoot: function () {
            return '/users/' + user.id + '/books/' + this.bookUuid + '/reading-sessions';
        }
    });

    return ReadingSession;
});
