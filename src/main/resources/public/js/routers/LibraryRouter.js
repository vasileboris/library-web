import Backbone from 'backbone';
import HeaderView from 'views/HeaderView';
import LibraryView from 'views/LibraryView';
import {
    createStore,
    applyMiddleware
} from 'redux';
import { currentReadingSessionReducer }  from 'reducers/CurrentReadingSessionReducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { fetchBookSaga } from 'sagas/BookSagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const LibraryRouter = Backbone.Router.extend({
    routes: {
        'books' : 'manageBooks',
        'books/:bookUuid': 'manageCurrentReadingSession'
    },

    initialize: function () {
        const sagaMiddleware = createSagaMiddleware();

        this.store = createStore(currentReadingSessionReducer,
            composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)));

        sagaMiddleware.run(fetchBookSaga);

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
