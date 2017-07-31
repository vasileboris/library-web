import _ from 'underscore';
import Backbone from 'backbone';

const Events = {
    EDIT: 'EDIT',
    UPDATED: 'UPDATED',
    ERROR: 'ERROR'
};

const DateReadingSessionsDispatcher = _.clone(Backbone.Events);

DateReadingSessionsDispatcher.Events = Events;

export default DateReadingSessionsDispatcher;