import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';
import ReadingSessionProgressComponent from 'components/ReadingSessionProgressComponent'
import MessageComponent from 'components/MessageComponent';
import DateReadingSessionsComponent from 'components/DateReadingSessionsComponent';
import InputDateReadingSessionComponent from 'components/InputDateReadingSessionComponent';
import {
    changeDateReadingSessionFieldAction,
    changeDateReadingSessionAction,
    createDateReadingSessionAction,
    updateDateReadingSessionAction,
    deleteDateReadingSessionAction
} from 'actions/DateReadingSessionAction';
import { fetchBookAction } from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';
import { changeOperationAction } from 'actions/OperationAction';

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
        const message = this.props.message;

        const book = this.isCurrentBook() ? this.props.book : null;
        const readingSessionProgress = this.isCurrentBook() ? this.props.readingSessionProgress : null;
        const currentReadingSession = this.isCurrentBook() ? this.props.currentReadingSession : null;
        const dateReadingSessions = currentReadingSession ? currentReadingSession.dateReadingSessions : [];

        return (
            <div id="content-div" className="content">
                <section className="results">
                    {book && (
                        <ReadonlyBookComponent book={book}/>)}
                    {readingSessionProgress && (
                        <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>)}
                </section>
                <section>
                    {message && (
                        <MessageComponent message={message}/>)}
                    <InputDateReadingSessionComponent
                        operation={this.props.operation}
                        dateReadingSession={this.props.dateReadingSession}
                        onInputChange={this.onInputChange}
                        onAddButtonClick={this.onAddDateReadingSessionClick}
                        onUpdateButtonClick={this.onUpdateDateReadingSessionClick}/>
                </section>
                <section>
                    {dateReadingSessions && dateReadingSessions.length > 0 && (
                        <DateReadingSessionsComponent
                            dateReadingSessions={this.props.currentReadingSession.dateReadingSessions}
                            onEditClick={this.onEditDateReadingSessionClick}
                            onDeleteClick={this.onDeleteDateReadingSessionClick}/>)}
                </section>
            </div>
        );
    }

    isCurrentBook() {
        return !!this.props.book && this.props.bookUuid === this.props.book.uuid;
    }

    componentDidMount() {
        this.retrieveBook();
        this.retrieveCurrentReadingSession();
    }

    componentWillUnmount() {
        console.log('Moving away from react!')
    }

    onInputChange(e) {
        this.props.dispatch(changeDateReadingSessionFieldAction(e.target.name, e.target.value));
    }

    retrieveBook() {
        this.props.dispatch(fetchBookAction(this.props.bookUuid))
    }

    retrieveCurrentReadingSession() {
        this.props.dispatch(fetchCurrentReadingSessionAction(this.props.bookUuid))
    }

    onAddDateReadingSessionClick(dateReadingSession) {
        this.props.dispatch(createDateReadingSessionAction(this.props.bookUuid,
            this.props.currentReadingSession.uuid,
            dateReadingSession));
    }

    onEditDateReadingSessionClick(dateReadingSession) {
        this.props.dispatch(changeOperationAction('edit'));
        this.props.dispatch(changeDateReadingSessionAction(dateReadingSession));
    }

    onUpdateDateReadingSessionClick(dateReadingSession) {
        this.props.dispatch(updateDateReadingSessionAction(this.props.bookUuid,
            this.props.currentReadingSession.uuid,
            dateReadingSession));
    }

    onDeleteDateReadingSessionClick(date) {
        this.props.dispatch(deleteDateReadingSessionAction(this.props.bookUuid,
            this.props.currentReadingSession.uuid,
            date));
    }
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return state
};

export default withRouter(connect(mapStateToProps)(CurrentReadingSessionComponent));
