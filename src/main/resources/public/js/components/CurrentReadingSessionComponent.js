import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';
import ReadingSessionProgressComponent from 'components/ReadingSessionProgressComponent'
import MessageComponent from 'components/MessageComponent';
import DateReadingSessionsComponent from 'components/DateReadingSessionsComponent';
import InputDateReadingSessionComponent from 'components/InputDateReadingSessionComponent';
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

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'add',
            dateReadingSession: {}
        };
        this.successOnRetrieveCurrentReadingSession = this.successOnRetrieveCurrentReadingSession.bind(this);
        this.errorOnRetrieveCurrentReadingSession = this.errorOnRetrieveCurrentReadingSession.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.errorOnValidateDateReadingSession = this.errorOnValidateDateReadingSession.bind(this);
        this.successOnAddDateReadingSession = this.successOnAddDateReadingSession.bind(this);
        this.errorOnAddDateReadingSession = this.errorOnAddDateReadingSession.bind(this);
        this.onEditDateReadingSessionClick = this.onEditDateReadingSessionClick.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.successOnUpdateDateReadingSession = this.successOnUpdateDateReadingSession.bind(this);
        this.errorOnUpdateDateReadingSession = this.errorOnUpdateDateReadingSession.bind(this);
        this.onDeleteDateReadingSessionClick = this.onDeleteDateReadingSessionClick.bind(this);
    }

    render() {
        return (
            <div>
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
                    onAddButtonClick={this.onAddButtonClick}
                    onUpdateButtonClick={this.onUpdateButtonClick}/>
                {this.state.dateReadingSessions ? (
                    <DateReadingSessionsComponent
                        dateReadingSessions={this.state.dateReadingSessions}
                        onEditClick={this.onEditDateReadingSessionClick}
                        onDeleteClick={this.onDeleteDateReadingSessionClick}/>
                ) : null}
            </div>
        );
    }

    componentDidMount() {
        this.retrieveBook();
        this.retrieveCurrentReadingSession();
    }

    componentWillUnmount() {
        console.log('Moving away from react!')
    }

    retrieveBook() {
        fetchBook(this.props.bookUuid)
            .then(response => this.successOnRetrieveBook(response.data))
            .catch(error => this.errorOnRetrieveBook(error));
    }

    successOnRetrieveBook(book) {
        this.setState({
            book
        });
    }

    errorOnRetrieveBook(error) {
        this.setState({
            message: localizer.localize('book-retrieve-error', error.response.status)
        });
    }

    retrieveCurrentReadingSession() {
        fetchCurrentReadingSession(this.props.bookUuid)
            .then(response => this.successOnRetrieveCurrentReadingSession(response.data))
            .catch(error => this.errorOnRetrieveCurrentReadingSession(error));
    }

    successOnRetrieveCurrentReadingSession(currentReadingSession) {
        this.setState({
            currentReadingSession
        });
        this.retrieveDateReadingSessions();
    }

    errorOnRetrieveCurrentReadingSession(error) {
        this.setState({
            message: localizer.localize('reading-session-retrieve-error', error.response.status)
        });
    }

    retrieveReadingSessionProgress() {
        fetchCurrentReadingSessionProgress(this.props.bookUuid, this.state.currentReadingSession.uuid)
            .then(readingSessionProgress => this.successOnRetrieveReadingSessionProgress(readingSessionProgress.data))
            .catch(error => this.errorOnRetrieveReadingSessionProgress(error));
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

    retrieveDateReadingSessions() {
        fetchDateReadingSessions(this.props.bookUuid, this.state.currentReadingSession.uuid)
            .then(response => this.successOnRetrieveDateReadingSessions(response.data))
            .catch(error => this.errorOnRetrieveDateReadingSessions(error));
    }

    successOnRetrieveDateReadingSessions(dateReadingSessions) {
        this.setState({
            dateReadingSessions
        });
        this.retrieveReadingSessionProgress();
    }

    errorOnRetrieveDateReadingSessions(message) {
        this.setState({
            message
        });
    }

    onInputChange(e) {
        const dateReadingSession = Object.assign({}, this.state.dateReadingSession);
        dateReadingSession[e.target.name] = e.target.value;
        this.setState({
            dateReadingSession
        });
    }

    onAddButtonClick() {
        validateDateReadingSession(this.state.dateReadingSession)
            .then(() => createDateReadingSession(this.props.bookUuid, this.state.currentReadingSession.uuid, this.state.dateReadingSession))
            .then(() => this.successOnAddDateReadingSession())
            .catch(error => this.errorOnAddDateReadingSession(error));
    }

    errorOnValidateDateReadingSession(error) {
        this.setState({
            message: error
        });
    }

    successOnAddDateReadingSession() {
        this.setState({
            message: null,
            dateReadingSession: {}
        });
        this.retrieveDateReadingSessions();
    }

    errorOnAddDateReadingSession(message) {
        this.setState({
            message
        });
    }

    onEditDateReadingSessionClick(dateReadingSession) {
        this.setState({
            message: null,
            operation: 'edit',
            dateReadingSession
        });
    }

    onUpdateButtonClick() {
        validateDateReadingSession(this.state.dateReadingSession)
            .then(() => updateDateReadingSession(this.props.bookUuid, this.state.currentReadingSession.uuid, this.state.dateReadingSession))
            .then(() => this.successOnUpdateDateReadingSession())
            .catch(error => this.errorOnUpdateDateReadingSession(error));
    }

    successOnUpdateDateReadingSession() {
        this.setState({
            message: null,
            operation: 'add',
            dateReadingSession: {}
        });
        this.retrieveDateReadingSessions();
    }

    errorOnUpdateDateReadingSession(message) {
        this.setState({
            message
        });
    }

    onDeleteDateReadingSessionClick(date) {
        deleteDateReadingSession(this.props.bookUuid, this.state.currentReadingSession.uuid, date)
            .then(() => this.retrieveDateReadingSessions())
            .catch(error => this.errorOnDeleteDateReadingSession(error));
    }

    errorOnDeleteDateReadingSession(message) {
        this.setState({
            message
        });
    }
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

export default CurrentReadingSessionComponent;