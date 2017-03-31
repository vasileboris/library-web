define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        ReadingSession = require('models/ReadingSession'),
        user = require('User');

    var CurrentReadingSession = ReadingSession.extend({
        sync: function(method, model, options) {
            if(method === 'read') {
                options.url = '/users/' + user.id + '/books/' + this.get('bookUuid') + '/current-reading-session';
            } else {
                options.url = this.url();
            }

            Backbone.sync.apply(this, arguments);
        },

        fetchAndCreateIfMissing: function(options) {
            var success = options && _.isFunction(options.success) ? options.success : function () {};
            var error = options && _.isFunction(options.error) ? options.error : function () {};

            var errorOnFetch = function (model, response, options) {
                if(404 === options.xhr.status) {
                    this.save({}, {
                        wait: true,
                        success: success,
                        error: error
                    });
                } else {
                    error(model, response, options);
                }
            };

            this.fetch({
                wait: true,
                success: success,
                error: _.bind(errorOnFetch, this)
            });
        }
    });

    return CurrentReadingSession;
});
