import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';
import ReadingSessionProgressComponent from 'components/ReadingSessionProgressComponent'
import MessageComponent from 'components/MessageComponent';
import DateReadingSessionsComponent from 'components/DateReadingSessionsComponent';
import InputDateReadingSessionComponent from 'components/InputDateReadingSessionComponent';
import { fetchBookAction } from 'actions/index';

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'add',
            dateReadingSession: {}
        };
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
                    operation={this.state.operation}
                    dateReadingSession={this.state.dateReadingSession}
                    onInputChange={this.onInputChange}
                    onAddButtonClick={() => this.props.onAddButtonClick(this.state.dateReadingSession)}
                    onUpdateButtonClick={this.props.onUpdateButtonClick}/>
                    {dateReadingSessions && dateReadingSessions.length > 0 ? (
                        <DateReadingSessionsComponent
                            dateReadingSessions={this.props.currentReadingSession.dateReadingSessions}
                            onEditClick={() => this.props.onEditDateReadingSessionClick(this.state.dateReadingSession)}
                            onDeleteClick={this.props.onDeleteDateReadingSessionClick}/>
                    ) : null}
            </div>
        );
    }

    componentDidMount() {
        this.retrieveBook();
    }

    componentWillUnmount() {
        console.log('Moving away from react!')
    }

    retrieveBook() {
        this.props.dispatch(fetchBookAction(this.props.bookUuid))
    }

    onInputChange(e) {
        const dateReadingSession = Object.assign({}, this.state.dateReadingSession);
        dateReadingSession[e.target.name] = e.target.value;
        this.setState({
            dateReadingSession
        });
    }
}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return state
};

export default connect(mapStateToProps)(CurrentReadingSessionComponent);
