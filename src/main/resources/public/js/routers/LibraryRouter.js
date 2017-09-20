import Backbone from 'backbone';
import HeaderView from 'views/HeaderView';
import LibraryView from 'views/LibraryView';
import {
    createStore,
    applyMiddleware
} from 'redux';
import library  from 'reducers';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

let LibraryRouter = Backbone.Router.extend({
    routes: {
        'books' : 'manageBooks',
        'books/:bookUuid': 'manageCurrentReadingSession'
    },

    initialize: function () {
        this.store = createStore(library, composeWithDevTools(applyMiddleware(thunk)));

        this.headerView = new HeaderView();
        this.headerView.render();

        this.libraryView = new LibraryView();
        if('/' === window.location.pathname) {
            this.manageBooks();
        }
    },

    manageBooks: function () {
        this.libraryView.manageBooks();
    },

    manageCurrentReadingSession: function (bookUuid) {
        this.libraryView.manageCurrentReadingSession(bookUuid, this.store);
    }

});

export default LibraryRouter;
