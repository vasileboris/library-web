import React from 'react';
import {
    Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import HeaderComponent from 'components/header/HeaderComponent';
import CurrentReadingSessionComponent from 'components/reading-session/CurrentReadingSessionComponent';
import BooksManagementComponent from 'components/book/BooksManagementComponent';
import history from 'routers/History';

const LibraryRouter = () => (
    <Router history={history}>
        <div>
            <div className="page-header">
                <HeaderComponent/>
            </div>
            <div className="page-content">
                <Switch>
                    <Route exact path="/books" component={BooksManagementComponent}/>
                    <Route path="/books/:uuid" component={ ({ match }) => (
                        <CurrentReadingSessionComponent bookUuid={match.params.uuid}/>
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

export default LibraryRouter;

