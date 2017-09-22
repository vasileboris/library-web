import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';
import ReadingSessionProgressComponent from 'components/ReadingSessionProgressComponent'
import MessageComponent from 'components/MessageComponent';
import DateReadingSessionsComponent from 'components/DateReadingSessionsComponent';
import InputDateReadingSessionComponent from 'components/InputDateReadingSessionComponent';
import {
    updateDateReadingSessionFieldAction,
    createDateReadingSessionFieldAction
} from 'actions/DateReadingSessionAction';
import { fetchBookAction } from 'actions/BookAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    render() {
        const book = this.props.book;
        const readingSessionProgress = this.props.readingSessionProgress;
        const message = this.props.message;
        const currentReadingSession = this.props.currentReadingSession;
        const dateReadingSessions = currentReadingSession ? currentReadingSession.dateReadingSessions : [];

        return (
            <div>
                <div className="results">
                    {book ? (
                        <ReadonlyBookComponent book={book}/>
                    ) : null }
                    {readingSessionProgress ? (
                        <ReadingSessionProgressComponent readingSessionProgress={readingSessionProgress}/>
                    ) : null}
                </div>
                {message ? (
                    <MessageComponent message={message}/>
                ) : null}
                <InputDateReadingSessionComponent
                    operation={this.props.operation}
                    dateReadingSession={this.props.dateReadingSession}
                    onInputChange={this.onInputChange}
                    onAddButtonClick={() => this.createDateReadingSession()}
                    onUpdateButtonClick={this.props.onUpdateButtonClick}/>
                    {dateReadingSessions && dateReadingSessions.length > 0 ? (
                        <DateReadingSessionsComponent
                            dateReadingSessions={this.props.currentReadingSession.dateReadingSessions}
                            onEditClick={() => this.props.onEditDateReadingSessionClick(this.props.dateReadingSession)}
                            onDeleteClick={this.props.onDeleteDateReadingSessionClick}/>
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

    onInputChange(e) {
        this.props.dispatch(updateDateReadingSessionFieldAction(e.target.name, e.target.value));
    }

    retrieveBook() {
        this.props.dispatch(fetchBookAction(this.props.bookUuid))
    }

    retrieveCurrentReadingSession() {
        this.props.dispatch(fetchCurrentReadingSessionAction(this.props.bookUuid))
    }

    createDateReadingSession() {
        this.props.dispatch(createDateReadingSessionFieldAction(this.props.bookUuid,
            this.props.currentReadingSession.uuid,
            this.props.dateReadingSession));
    }
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return state
};

export default connect(mapStateToProps)(CurrentReadingSessionComponent);
