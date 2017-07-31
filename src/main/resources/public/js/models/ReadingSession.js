import Backbone from 'backbone';
import user from 'User';

const ReadingSession = Backbone.Model.extend({
    idAttribute: 'uuid',

    urlRoot: function () {
        return '/users/' + user.id + '/books/' + this.get('bookUuid') + '/reading-sessions';
    }
});

export default ReadingSession;
