define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        ReadingSession = require('models/ReadingSession'),
        user = require('User');

    var CurrentReadingSession = ReadingSession.extend({
        sync: function(method, model, options) {
            if(method === 'read') {
                options.url = '/users/' + user.id + '/books/' + this.bookUuid + '/current-reading-session';
            } else {
                options.url = this.url();
            }

            Backbone.sync.apply(this, arguments);
        }
    });

    return CurrentReadingSession;
});
