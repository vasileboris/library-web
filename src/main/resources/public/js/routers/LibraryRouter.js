import React from 'react';
import {
    Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import {
    createStore,
    applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { currentReadingSessionReducer }  from 'reducers/CurrentReadingSessionReducer';
import HeaderComponent from 'components/header/HeaderComponent';
import CurrentReadingSessionComponent from 'components/reading-session/CurrentReadingSessionComponent';
import BooksManagementComponent from 'components/book/BooksManagementComponent';
import history from 'routers/History';


const LibraryRouter = function() {
    const store = createStore(currentReadingSessionReducer, composeWithDevTools(applyMiddleware(thunk)));

    return (
        <Router history={history}>
            <div>
                <div className="page-header">
                    <HeaderComponent/>
                </div>
                <div className="page-content">
                    <Switch>
                    <Route exact path="/books" component={BooksManagementComponent}/>
                        <Route path="/books/:uuid" component={({match}) => (
                            <Provider store={store}>
                                <CurrentReadingSessionComponent bookUuid={match.params.uuid}/>
                            </Provider>
                        )}/>
                        {/*
                        Without Switch I saw the following warning in console:
                        Warning: You tried to redirect to the same route you're currently on: "/books"
                        */}
                        <Redirect exact from="/" to="/books"/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default LibraryRouter;
