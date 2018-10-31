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
        const { message, book, operation, dateReadingSession, readingSessionProgress, currentReadingSession } = this.props;
        const dateReadingSessions = currentReadingSession ? currentReadingSession.dateReadingSessions : [];

        return (
            <div id="content-div" className="content">
                <section className="results">
                    {book && (
                        <ReadonlyBookComponent book={book}/>
                    )}
                    {readingSessionProgress && (
                        <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>
                    )}
                </section>
                <section>
                    {message && (
                        <MessageComponent message={message}/>
                    )}
                    <InputDateReadingSessionComponent
                        operation={operation}
                        dateReadingSession={dateReadingSession}
                        onInputChange={this.onInputChange}
                        onAddButtonClick={this.onAddDateReadingSessionClick}
                        onUpdateButtonClick={this.onUpdateDateReadingSessionClick}/>
                </section>
                <section>
                    {dateReadingSessions && dateReadingSessions.length > 0 && (
                        <DateReadingSessionsComponent
                            dateReadingSessions={currentReadingSession.dateReadingSessions}
                            onEditClick={this.onEditDateReadingSessionClick}
                            onDeleteClick={this.onDeleteDateReadingSessionClick}/>
                    )}
                </section>
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

    onInputChange(e) {
        const { dispatch } = this.props;
        dispatch(changeDateReadingSessionFieldAction(e.target.name, e.target.value));
    }

    retrieveBook() {
        const { dispatch, bookUuid } = this.props;
        dispatch(fetchBookAction(bookUuid))
    }

    retrieveCurrentReadingSession() {
        const { dispatch, bookUuid } = this.props;
        dispatch(fetchCurrentReadingSessionAction(bookUuid))
    }

    onAddDateReadingSessionClick(dateReadingSession) {
        const { dispatch, bookUuid, currentReadingSession } = this.props;
        dispatch(createDateReadingSessionAction(bookUuid, currentReadingSession.uuid, dateReadingSession));
    }

    onEditDateReadingSessionClick(dateReadingSession) {
        const { dispatch } = this.props;
        dispatch(changeDateReadingSessionOperationAction('edit'));
        dispatch(changeDateReadingSessionAction(dateReadingSession));
    }

    onUpdateDateReadingSessionClick(dateReadingSession) {
        const { dispatch, bookUuid, currentReadingSession } = this.props;
        dispatch(updateDateReadingSessionAction(bookUuid, currentReadingSession.uuid, dateReadingSession));
    }

    onDeleteDateReadingSessionClick(date) {
        const { dispatch, bookUuid, currentReadingSession } = this.props;
        dispatch(deleteDateReadingSessionAction(bookUuid, currentReadingSession.uuid, date));
    }
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    const { message, book, readingSession } = state;
    return {
        message,
        book,
        ...readingSession
    };
};

export default withRouter(connect(mapStateToProps)(CurrentReadingSessionComponent));
