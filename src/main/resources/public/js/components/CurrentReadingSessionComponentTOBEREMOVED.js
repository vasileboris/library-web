import React from 'react';
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

class CurrentReadingSessionComponentDeprecated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'add',
            dateReadingSession: {}
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onEditDateReadingSessionClick = this.onEditDateReadingSessionClick.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
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
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnRetrieveBook(book) {
        this.setState({
            book
        });
    }

    retrieveCurrentReadingSession() {
        fetchCurrentReadingSession(this.props.bookUuid)
            .then(response => this.successOnRetrieveCurrentReadingSession(response.data))
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnRetrieveCurrentReadingSession(currentReadingSession) {
        this.setState({
            currentReadingSession
        });
        this.retrieveDateReadingSessions();
    }

    retrieveReadingSessionProgress() {
        fetchCurrentReadingSessionProgress(this.props.bookUuid, this.state.currentReadingSession.uuid)
            .then(readingSessionProgress => this.successOnRetrieveReadingSessionProgress(readingSessionProgress.data))
            .catch(() => this.errorOnRetrieveReadingSessionProgress());
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
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnRetrieveDateReadingSessions(dateReadingSessions) {
        this.setState({
            dateReadingSessions
        });
        this.retrieveReadingSessionProgress();
    }

    onInputChange(e) {
    }

    onAddButtonClick() {
        validateDateReadingSession(this.state.dateReadingSession)
            .then(() => createDateReadingSession(this.props.bookUuid, this.state.currentReadingSession.uuid, this.state.dateReadingSession))
            .then(() => this.successOnAddDateReadingSession())
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnAddDateReadingSession() {
        this.setState({
            message: null,
            dateReadingSession: {}
        });
        this.retrieveDateReadingSessions();
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
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnUpdateDateReadingSession() {
        this.setState({
            message: null,
            operation: 'add',
            dateReadingSession: {}
        });
        this.retrieveDateReadingSessions();
    }

    onDeleteDateReadingSessionClick(date) {
        deleteDateReadingSession(this.props.bookUuid, this.state.currentReadingSession.uuid, date)
            .then(() => this.retrieveDateReadingSessions())
            .catch(error => this.errorOnApiOperation(error));
    }

    errorOnApiOperation(message) {
        this.setState({
            message
        });
    }
}
