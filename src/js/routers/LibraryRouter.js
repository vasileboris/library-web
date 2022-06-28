import React from 'react';
import {
    Router,
    Route,
    Redirect,
    Switch,
    useParams
} from 'react-router-dom';
import {
    createStore,
    applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas/RootSagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { library }  from 'reducers/LibraryReducer';
import HeaderComponent from 'components/header/HeaderComponent';
import CurrentReadingSessionComponent from 'components/reading-session/CurrentReadingSessionComponent';
import BooksManagementComponent from 'components/book/BooksManagementComponent';
import history from 'routers/History';

const LibraryRouter = function() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(library, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);

    const BooksManagementComponentRoute = function () {
        return(
            <Provider store={store}>
                <BooksManagementComponent/>
            </Provider>
        )
    };

    const CurrentReadingSessionComponentRoute = function() {
        const { uuid } = useParams()
        return (
            <Provider store={store}>
                <CurrentReadingSessionComponent bookUuid={uuid}/>
            </Provider>
        );
    };

    return (
        <Router history={history}>
            <React.Fragment>
                <div className="page-header">
                    <HeaderComponent/>
                </div>
                <div className="page-content">
                    <Switch>
                        <Route exact path="/books">
                            <BooksManagementComponentRoute/>
                        </Route>
                        <Route path="/books/:uuid">
                            <CurrentReadingSessionComponentRoute/>
                        </Route>
                        {/*
                        Without Switch I saw the following warning in console:
                        Warning: You tried to redirect to the same route you're currently on: "/books"
                        */}
                        <Redirect exact from="/" to="/books"/>
                    </Switch>
                </div>
            </React.Fragment>
        </Router>
    );
};

export default LibraryRouter;
