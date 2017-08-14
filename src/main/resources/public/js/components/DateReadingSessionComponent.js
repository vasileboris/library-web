import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';
import DateReadingSessionsDispatcher from 'events/DateReadingSessionsDispatcher';

class DateReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateReadingSession: this.props.dateReadingSession
        }
        this.props.dateReadingSession.on('change', this.updateState.bind(this));
    }

    updateState() {
        this.setState({
            dateReadingSession: this.props.dateReadingSession
        })
    }

    render() {
        const dateReadingSession = this.state.dateReadingSession.attributes;

        return <article className="result-date-reading-session">
            <div className="message-item"></div>
            <a href="#" className="edit-item" onClick={this.editDateReadingSession.bind(this)}>
                <img src="/img/edit.png" alt="edit reading session" className="img-icon"/>
            </a>
            <a href="#" className="delete-item">
                <img src="/img/delete.png" alt="delete reading session" className="img-icon"/>
            </a>
            <div>{localizer.localize('date-reading-session-last-read-page-label')} {dateReadingSession.lastReadPage}</div>
            <div>{localizer.localize('date-reading-session-last-read-date-label')} {dateReadingSession.date}</div>
            <div>{dateReadingSession.bookmark ? localizer.localize('date-reading-session-bookmark-label') + ' "' + dateReadingSession.bookmark + '"' : ''}</div>
        </article>
    }

    editDateReadingSession(e) {
        e.preventDefault();
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.ERROR, '');
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.EDIT, this.props.dateReadingSession);
    }

}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.object.isRequired
};

export default DateReadingSessionComponent