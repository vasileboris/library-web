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

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            book: null
        };
        this.successOnRetrieveCurrentReadingSession = this.successOnRetrieveCurrentReadingSession.bind(this);
        this.errorOnRetrieveCurrentReadingSession = this.errorOnRetrieveCurrentReadingSession.bind(this);
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
            currentReadingSession: currentReadingSession.attributes
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
        let dateReadingSessions = new DateReadingSessions(this.props.bookUuid, this.state.currentReadingSession.uuid);
        dateReadingSessions.fetch()
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
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

export default CurrentReadingSessionComponent;