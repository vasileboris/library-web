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
    clearDateReadingSessionAction,
    createDateReadingSessionAction,
    updateDateReadingSessionAction,
    deleteDateReadingSessionAction
} from 'actions/DateReadingSessionAction';
import { fetchBookAction } from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';
import { changeDateReadingSessionOperationAction } from 'actions/OperationAction';
import { receiveMessageAction } from 'actions/MessageAction';
import { scrollIntoView } from 'utils/Scroll';

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddDateReadingSessionClick = this.onAddDateReadingSessionClick.bind(this);
        this.onEditDateReadingSessionClick = this.onEditDateReadingSessionClick.bind(this);
        this.onUpdateDateReadingSessionClick = this.onUpdateDateReadingSessionClick.bind(this);
        this.onDeleteDateReadingSessionClick = this.onDeleteDateReadingSessionClick.bind(this);
        this.switchToAddDateReadingSession = this.switchToAddDateReadingSession.bind(this);
        this.messageRef = React.createRef();
        this.inputRef = React.createRef();
    }

    render() {
        const { message, operation, dateReadingSession, bookUuid, books, readingSessionsProgress, currentReadingSessions } = this.props,
            readingSessionProgress = readingSessionsProgress[bookUuid],
            currentReadingSession = currentReadingSessions[bookUuid],
            dateReadingSessions = currentReadingSession ? currentReadingSession.dateReadingSessions : [],
            book = books[bookUuid];

        return (
            <div className="content">
                <div className="entries container horizontal">
                    <ReadonlyBookComponent book={book}/>
                    <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>
                    <MessageComponent ref={this.messageRef} message={message}/>
                    <InputDateReadingSessionComponent
                        ref={this.inputRef}
                        operation={operation}
                        dateReadingSession={dateReadingSession}
                        onInputChange={this.onInputChange}
                        onAddButtonClick={this.onAddDateReadingSessionClick}
                        onUpdateButtonClick={this.onUpdateDateReadingSessionClick}
                        onCancelButtonClick={this.switchToAddDateReadingSession}/>
                </div>
                <DateReadingSessionsComponent
                    dateReadingSessions={dateReadingSessions}
                    onEditClick={this.onEditDateReadingSessionClick}
                    onDeleteClick={this.onDeleteDateReadingSessionClick}/>
            </div>
        );
    }

    componentDidMount() {
        this.retrieveBook();
        this.retrieveCurrentReadingSession();
    }

    componentDidUpdate() {
        this.scrollToInput();
    }

    componentWillUnmount() {
        const { receiveMessageAction, changeDateReadingSessionOperationAction, clearDateReadingSessionAction } = this.props;
        receiveMessageAction(null);
        changeDateReadingSessionOperationAction('add');
        clearDateReadingSessionAction();
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

    switchToAddDateReadingSession() {
        const { changeDateReadingSessionOperationAction, clearDateReadingSessionAction, receiveMessageAction } = this.props;
        changeDateReadingSessionOperationAction('add');
        clearDateReadingSessionAction();
        receiveMessageAction(null);
    }

    scrollToInput() {
        const { operation, message } = this.props;
        if(message) {
            scrollIntoView(this.messageRef);
            return;
        }
        switch (operation) {
            case 'edit':
            case 'delete':
                scrollIntoView(this.inputRef);
                break;
        }
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
    clearDateReadingSessionAction,
    createDateReadingSessionAction,
    updateDateReadingSessionAction,
    deleteDateReadingSessionAction,
    fetchBookAction,
    fetchCurrentReadingSessionAction,
    changeDateReadingSessionOperationAction
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentReadingSessionComponent));
