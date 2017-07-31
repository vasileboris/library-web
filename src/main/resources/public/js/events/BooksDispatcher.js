import _ from 'underscore';
import Backbone from 'backbone';

const Events = {
    EDIT: 'EDIT',
    ERROR: 'ERROR'
};

const BooksDispatcher = _.clone(Backbone.Events);

BooksDispatcher.Events = Events;

export default BooksDispatcher;
