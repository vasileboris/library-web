import React from 'react';
import PropTypes from 'prop-types';
import ReadonlyBookComponent from 'components/book/ReadonlyBookComponent';
import ReadingSessionProgressComponent from './ReadingSessionProgressComponent'
import MessageComponent from 'components/message/MessageComponent';
import DateReadingSessionsComponent from './DateReadingSessionsComponent';
import InputDateReadingSessionComponent from './InputDateReadingSessionComponent';
import { fetchBook } from 'api/BookApi';
import { fetchCurrentReadingSession } from 'api/ReadingSessionApi';
import { fetchCurrentReadingSessionProgress } from 'api/ReadingSessionProgressApi';
import {
    fetchDateReadingSessions,
    createDateReadingSession,
    updateDateReadingSession,
    deleteDateReadingSession,
    validateDateReadingSession
} from 'api/DateReadingSessionApi';
import { run } from 'middleware/PromiseGeneratorRunner';
//Needed for Uncaught ReferenceError: regeneratorRuntime is not defined
import 'babel-polyfill';

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'add',
            dateReadingSession: {}
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddDateReadingSessionClick = this.onAddDateReadingSessionClick.bind(this);
        this.onEditDateReadingSessionClick = this.onEditDateReadingSessionClick.bind(this);
        this.onUpdateDateReadingSessionClick = this.onUpdateDateReadingSessionClick.bind(this);
        this.onDeleteDateReadingSessionClick = this.onDeleteDateReadingSessionClick.bind(this);
        this.retrieveBook = this.retrieveBook.bind(this);
        this.retrieveCurrentReadingSession = this.retrieveCurrentReadingSession.bind(this);
        this.retrieveReadingSessionProgress = this.retrieveReadingSessionProgress.bind(this);
        this.retrieveDateReadingSessions = this.retrieveDateReadingSessions.bind(this);
    }

    render() {
        return (
            <div id="content-div" className="content">
                <div className="results">
                    {this.state.book ? (
                        <ReadonlyBookComponent book={this.state.book}/>
                    ) : null }
                    {this.state.readingSessionProgress ? (
                        <ReadingSessionProgressComponent readingSessionProgress={this.state.readingSessionProgress}/>
                    ) : null}
                </div>
                {this.state.message ? (
                    <MessageComponent message={this.state.message}/>
                ) : null}
                <InputDateReadingSessionComponent
                    operation={this.state.operation}
                    dateReadingSession={this.state.dateReadingSession}
                    onInputChange={this.onInputChange}
                    onAddButtonClick={() => run(this.onAddDateReadingSessionClick)}
                    onUpdateButtonClick={() => run(this.onUpdateDateReadingSessionClick)}/>
                {this.state.dateReadingSessions ? (
                    <DateReadingSessionsComponent
                        dateReadingSessions={this.state.dateReadingSessions}
                        onEditClick={this.onEditDateReadingSessionClick}
                        onDeleteClick={date => run(this.onDeleteDateReadingSessionClick, date)}/>
                ) : null}
            </div>
        );
    }

    componentDidMount() {
        run(this.retrieveBook);
        run(this.retrieveCurrentReadingSession);
    }

    componentWillUnmount() {
        console.log('Moving away from react!')
    }

    *retrieveBook () {
        try {
            let book = yield fetchBook(this.props.bookUuid);
            this.successOnRetrieveBook(book);
        } catch(error) {
            this.errorOnApiOperation(error)
        }
    }

    successOnRetrieveBook(book) {
        this.setState({
            book
        });
    }

    *retrieveCurrentReadingSession() {
        try {
            const currentReadingSession = yield fetchCurrentReadingSession(this.props.bookUuid);
            this.successOnRetrieveCurrentReadingSession(currentReadingSession);
        } catch(error) {
            this.errorOnApiOperation(error);
        }
    }

    successOnRetrieveCurrentReadingSession(currentReadingSession) {
        this.setState({
            currentReadingSession
        });
        run(this.retrieveDateReadingSessions);
    }

    successOnRetrieveReadingSessionProgress(readingSessionProgress) {
        this.setState({
            readingSessionProgress
        });
    }

    errorOnRetrieveReadingSessionProgress() {
        this.setState({
            readingSessionProgress: null
        });
    }

    *retrieveDateReadingSessions() {
        try {
            let dateReadingSessions = yield fetchDateReadingSessions(this.props.bookUuid,
                this.state.currentReadingSession.uuid);
            this.successOnRetrieveDateReadingSessions(dateReadingSessions);
        } catch(error) {
            this.errorOnApiOperation(error);
        }
    }

    successOnRetrieveDateReadingSessions(dateReadingSessions) {
        this.setState({
            dateReadingSessions
        });
        run(this.retrieveReadingSessionProgress);
    }

    *retrieveReadingSessionProgress() {
        try {
            const currentReadingSessionProgress = yield fetchCurrentReadingSessionProgress(this.props.bookUuid,
                this.state.currentReadingSession.uuid);
            this.successOnRetrieveReadingSessionProgress(currentReadingSessionProgress);
        } catch(error) {
            this.errorOnRetrieveReadingSessionProgress();
        }
    }

    onInputChange(e) {
        const dateReadingSession = Object.assign({}, this.state.dateReadingSession);
        dateReadingSession[e.target.name] = e.target.value;
        this.setState({
            dateReadingSession
        });
    }

    *onAddDateReadingSessionClick() {
        try {
            yield validateDateReadingSession(this.state.dateReadingSession);
            yield createDateReadingSession(this.props.bookUuid,
                this.state.currentReadingSession.uuid,
                this.state.dateReadingSession);
            this.successOnAddDateReadingSession();
        } catch(error) {
            this.errorOnApiOperation(error);
        }
    }

    successOnAddDateReadingSession() {
        this.setState({
            message: null,
            dateReadingSession: {}
        });
        run(this.retrieveDateReadingSessions);
    }

    onEditDateReadingSessionClick(dateReadingSession) {
        this.setState({
            message: null,
            operation: 'edit',
            dateReadingSession
        });
    }

    *onUpdateDateReadingSessionClick() {
        try {
            yield validateDateReadingSession(this.state.dateReadingSession);
            yield updateDateReadingSession(this.props.bookUuid,
                this.state.currentReadingSession.uuid,
                this.state.dateReadingSession);
            this.successOnUpdateDateReadingSession();
        } catch(error){
            this.errorOnApiOperation(error);
        }
    }

    successOnUpdateDateReadingSession() {
        this.setState({
            message: null,
            operation: 'add',
            dateReadingSession: {}
        });
        run(this.retrieveDateReadingSessions);
    }

    *onDeleteDateReadingSessionClick(date) {
        try {
            yield deleteDateReadingSession(this.props.bookUuid,
                this.state.currentReadingSession.uuid,
                date);
            this.successOnDeleteDateReadingSession();
        } catch(error) {
            this.errorOnApiOperation(error);
        }
    }

    successOnDeleteDateReadingSession() {
        this.setState({
            message: null,
            operation: 'add',
            dateReadingSession: {}
        });
        run(this.retrieveDateReadingSessions);
    }

    errorOnApiOperation(message) {
        this.setState({
            message
        });
    }
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

export default CurrentReadingSessionComponent;