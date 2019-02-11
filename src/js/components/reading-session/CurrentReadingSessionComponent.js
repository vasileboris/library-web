import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReadonlyBookComponent from 'components/book/ReadonlyBookComponent';
import ReadingSessionProgressComponent from './ReadingSessionProgressComponent'
import MessageComponent from 'components/message/MessageComponent';
import DateReadingSessionsComponent from './DateReadingSessionsComponent';
import InputDateReadingSessionComponent from './InputDateReadingSessionComponent';
import {
    changeDateReadingSessionFieldAction,
    changeDateReadingSessionAction,
    createDateReadingSessionAction,
    updateDateReadingSessionAction,
    deleteDateReadingSessionAction
} from 'actions/DateReadingSessionAction';
import { fetchBookAction } from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';
import { changeDateReadingSessionOperationAction } from 'actions/OperationAction';
import { receiveMessageAction } from 'actions/MessageAction';

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddDateReadingSessionClick = this.onAddDateReadingSessionClick.bind(this);
        this.onEditDateReadingSessionClick = this.onEditDateReadingSessionClick.bind(this);
        this.onUpdateDateReadingSessionClick = this.onUpdateDateReadingSessionClick.bind(this);
        this.onDeleteDateReadingSessionClick = this.onDeleteDateReadingSessionClick.bind(this);
    }

    render() {
        const { message, operation, dateReadingSession, bookUuid, books, readingSessionsProgress, currentReadingSessions } = this.props,
            readingSessionProgress = readingSessionsProgress[bookUuid],
            currentReadingSession = currentReadingSessions[bookUuid],
            dateReadingSessions = currentReadingSession ? currentReadingSession.dateReadingSessions : [],
            book = books[bookUuid];

        return (
            <div className="content">
                <div className="results">
                    {book && (
                        <ReadonlyBookComponent book={book}/>
                    )}
                    {readingSessionProgress && (
                        <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>
                    )}
                </div>
                <div>
                    <InputDateReadingSessionComponent
                        operation={operation}
                        dateReadingSession={dateReadingSession}
                        onInputChange={this.onInputChange}
                        onAddButtonClick={this.onAddDateReadingSessionClick}
                        onUpdateButtonClick={this.onUpdateDateReadingSessionClick}/>
                    {message && (
                        <MessageComponent message={message}/>
                    )}
                </div>
                <div>
                    {dateReadingSessions && dateReadingSessions.length > 0 && (
                        <DateReadingSessionsComponent
                            dateReadingSessions={currentReadingSession.dateReadingSessions}
                            onEditClick={this.onEditDateReadingSessionClick}
                            onDeleteClick={this.onDeleteDateReadingSessionClick}/>
                    )}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.retrieveBook();
        this.retrieveCurrentReadingSession();
    }

    componentWillUnmount() {
        const { receiveMessageAction, changeDateReadingSessionOperationAction, changeDateReadingSessionAction } = this.props;
        receiveMessageAction(null);
        changeDateReadingSessionOperationAction('add');
        changeDateReadingSessionAction({
            date: null,
            lastReadPage: null,
            bookmark: null

        });
    }

    onInputChange(e) {
        const { changeDateReadingSessionFieldAction } = this.props;
        changeDateReadingSessionFieldAction(e.target.name, e.target.value);
    }

    retrieveBook() {
        const { fetchBookAction, bookUuid } = this.props;
        fetchBookAction(bookUuid);
    }

    retrieveCurrentReadingSession() {
        const { fetchCurrentReadingSessionAction, bookUuid } = this.props;
        fetchCurrentReadingSessionAction(bookUuid);
    }

    onAddDateReadingSessionClick(dateReadingSession) {
        const { createDateReadingSessionAction, bookUuid, currentReadingSessions } = this.props,
            currentReadingSession = currentReadingSessions[bookUuid];
        createDateReadingSessionAction(bookUuid, currentReadingSession.uuid, dateReadingSession);
    }

    onEditDateReadingSessionClick(dateReadingSession) {
        const { changeDateReadingSessionOperationAction, changeDateReadingSessionAction } = this.props;
        changeDateReadingSessionOperationAction('edit');
        changeDateReadingSessionAction(dateReadingSession);
    }

    onUpdateDateReadingSessionClick(dateReadingSession) {
        const { updateDateReadingSessionAction, bookUuid, currentReadingSessions } = this.props,
            currentReadingSession = currentReadingSessions[bookUuid];
        updateDateReadingSessionAction(bookUuid, currentReadingSession.uuid, dateReadingSession);
    }

    onDeleteDateReadingSessionClick(date) {
        const { deleteDateReadingSessionAction, bookUuid, currentReadingSessions } = this.props,
            currentReadingSession = currentReadingSessions[bookUuid];
        deleteDateReadingSessionAction(bookUuid, currentReadingSession.uuid, date);
    }
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired,
    message: PropTypes.string,
    operation: PropTypes.oneOf(['add', 'edit']).isRequired,
    dateReadingSession: PropTypes.object,
    books: PropTypes.object,
    readingSessionProgress: PropTypes.object,
    currentReadingSessions: PropTypes.object
};

const mapStateToProps = state => {
    const { message, books, readingSessions } = state;
    return {
        message,
        books,
        ...readingSessions
    };
};

const mapDispatchToProps = {
    receiveMessageAction,
    changeDateReadingSessionFieldAction,
    changeDateReadingSessionAction,
    createDateReadingSessionAction,
    updateDateReadingSessionAction,
    deleteDateReadingSessionAction,
    fetchBookAction,
    fetchCurrentReadingSessionAction,
    changeDateReadingSessionOperationAction
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentReadingSessionComponent));
