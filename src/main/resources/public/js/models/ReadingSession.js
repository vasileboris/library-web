define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        user = require('User');

    var ReadingSession = Backbone.Model.extend({
        idAttribute: 'uuid',

        urlRoot: function () {
            return '/users/' + user.id + '/books/' + this.get('bookUuid') + '/reading-sessions';
        }
    });

    return ReadingSession;
});
