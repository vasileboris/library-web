import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';
import Book from 'models/Book';
import CurrentReadingSession from 'models/CurrentReadingSession';
import ReadingSessionProgress from 'models/ReadingSessionProgress';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';
import ReadingSessionProgressComponent from 'components/ReadingSessionProgressComponent'
import MessageComponent from 'components/MessageComponent';

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            book: null
        };
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
            </div>
        );
    }

    componentDidMount() {
        this.retrieveBook();
        this.retrieveCurrentReadingSession();
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
            success: this.successOnRetrieveCurrentReadingSession.bind(this),
            error: this.errorOnRetrieveCurrentReadingSession.bind(this)
        });
    }

    successOnRetrieveCurrentReadingSession(currentReadingSession) {
        this.setState({
            currentReadingSession: currentReadingSession.attributes
        });
        this.retrieveReadingSessionProgress();
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

}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

export default CurrentReadingSessionComponent;