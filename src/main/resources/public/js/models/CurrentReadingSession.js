import _ from 'underscore';
import Backbone from 'backbone';
import ReadingSession from 'models/ReadingSession';
import user from 'User';

const CurrentReadingSession = ReadingSession.extend({
    sync: function(method, model, options) {
        if(method === 'read') {
            options.url = `/users/${user.id}/books/${this.get('bookUuid')}/current-reading-session`;
        } else {
            options.url = this.url();
        }

        Backbone.sync.apply(this, arguments);
    },

    fetchAndCreateIfMissing: function(options) {
        const success = options && _.isFunction(options.success) ? options.success : function () {};
        const error = options && _.isFunction(options.error) ? options.error : function () {};

        const errorOnFetch = function (model, response, options) {
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

export default CurrentReadingSession;
