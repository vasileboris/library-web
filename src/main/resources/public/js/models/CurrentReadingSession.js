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

        return Backbone.sync.apply(this, arguments);
    },

    fetchAndCreateIfMissing: function(options) {
        const success = options && _.isFunction(options.success) ? options.success : function () {};
        const error = options && _.isFunction(options.error) ? options.error : function () {};

        const errorOnFetch = function (err) {
            if(404 === err.status) {
                this.save()
                    .then(crs => success(crs))
                    .catch(err => error(err));
            } else {
                error(err);
            }
        }.bind(this);

        this.fetch()
            .then(crs => success(crs))
            .catch(err => errorOnFetch(err));
    }
});

export default CurrentReadingSession;
