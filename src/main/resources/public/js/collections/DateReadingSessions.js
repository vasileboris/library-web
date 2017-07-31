import Backbone from 'backbone';
import DateReadingSession from 'models/DateReadingSession';
import user from 'User';

const DateReadingSessions = Backbone.Collection.extend({
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

export default DateReadingSessions;
