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
