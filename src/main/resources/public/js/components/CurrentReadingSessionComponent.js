import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';
import Book from 'models/Book';
import CurrentReadingSession from 'models/CurrentReadingSession';
import ReadingSessionProgress from 'models/ReadingSessionProgress';
import DateReadingSessions from 'collections/DateReadingSessions';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';
import ReadingSessionProgressComponent from 'components/ReadingSessionProgressComponent'
import MessageComponent from 'components/MessageComponent';
import DateReadingSessionsComponent from 'components/DateReadingSessionsComponent';
import AddDateReadingSessionComponent from 'components/AddDateReadingSessionComponent';
import DateReadingSession from 'models/DateReadingSession';

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
                {this.state.operation === 'add' ? (
                    <AddDateReadingSessionComponent
                        dateReadingSession={this.state.dateReadingSession}
                        onInputChange={this.onInputChange}
                        onButtonClick={this.onAddButtonClick}/>
                ) : null }
                {this.state.dateReadingSessions ? (
                    <DateReadingSessionsComponent dateReadingSessions={this.state.dateReadingSessions}/>
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
        let book = new Book({uuid: this.props.bookUuid});
        book.fetch()
            .then(book => this.successOnRetrieveBook(book))
            .catch(error => this.errorOnRetrieveBook(error));
    }

    successOnRetrieveBook(book) {
        this.setState({
            book
        });
    }

    errorOnRetrieveBook(error) {
        this.setState({
            message: localizer.localize('book-retrieve-error', error.status)
        });
    }

    retrieveCurrentReadingSession() {
        let currentReadingSession = new CurrentReadingSession({bookUuid: this.props.bookUuid});
        currentReadingSession.fetchAndCreateIfMissing({
            success: this.successOnRetrieveCurrentReadingSession,
            error: this.errorOnRetrieveCurrentReadingSession
        });
    }

    successOnRetrieveCurrentReadingSession(currentReadingSession) {
        this.setState({
            currentReadingSession: Object.assign(currentReadingSession.attributes)
        });
        this.retrieveReadingSessionProgress();
        this.retrieveDateReadingSessions();
    }

    errorOnRetrieveCurrentReadingSession(error) {
        this.setState({
            message: localizer.localize('reading-session-retrieve-error', error.status)
        });
    }

    retrieveReadingSessionProgress() {
        let readingSessionProgress = new ReadingSessionProgress(this.props.bookUuid, this.state.currentReadingSession.uuid);
        readingSessionProgress.fetch()
            .then(readingSessionProgress => this.successOnRetrieveReadingSessionProgress(readingSessionProgress))
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
        this.dateReadingSessions = new DateReadingSessions(this.props.bookUuid, this.state.currentReadingSession.uuid);
        this.dateReadingSessions.fetch()
            .then(dateReadingSessions => this.successOnRetrieveDateReadingSessions(dateReadingSessions))
            .catch(error => this.errorOnRetrieveDateReadingSessions(error));
    }

    successOnRetrieveDateReadingSessions(dateReadingSessions) {
        this.setState({
            dateReadingSessions
        });
    }

    errorOnRetrieveDateReadingSessions() {
        this.setState({
            message: localizer.localize('date-reading-sessions-retrieve-error', options.xhr.status)
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
        const dateReadingSession = new DateReadingSession(this.state.dateReadingSession);
        dateReadingSession.isNewDateReadingSession = true;
        //this.listenTo(dateReadingSession, "invalid", this.errorOnValidateDateReadingSession);
        this.dateReadingSessions.create(dateReadingSession, {
            wait: true,
            success: this.successOnAddDateReadingSession,
            error: this.errorOnAddDateReadingSession
        });
    }

    errorOnValidateDateReadingSession(model, error) {
        this.setState({
            message: error
        });
    }

    successOnAddDateReadingSession() {
        this.setState({
            message: null
        });
        this.retrieveDateReadingSessions();
    }

    errorOnAddDateReadingSession(model, response, options) {
        this.setState({
            message: localizer.localize('date-reading-session-add-error', options.xhr.status)
        });
    }

}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

export default CurrentReadingSessionComponent;