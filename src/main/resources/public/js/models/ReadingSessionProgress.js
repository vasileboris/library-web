import Backbone from 'backbone';
import user from 'User';

const ReadingSessionProgress = Backbone.Model.extend({
    initialize: function (bookUuid, uuid) {
        this.bookUuid = bookUuid;
        this.uuid = uuid;
    },

    urlRoot: function () {
        return `/users/${user.id}/books/${this.bookUuid}/reading-sessions/${this.uuid}/progress`;
    }
});

export default ReadingSessionProgress;
