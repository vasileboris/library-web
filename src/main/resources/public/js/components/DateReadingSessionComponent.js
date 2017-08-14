import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';
import DateReadingSessionsDispatcher from 'events/DateReadingSessionsDispatcher';

class DateReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateReadingSessionAttributes: {...this.props.dateReadingSession.attributes}
        }
        this.props.dateReadingSession.on('change', this.updateState.bind(this));
    }

    updateState() {
        this.setState({
            dateReadingSessionAttributes: {...this.props.dateReadingSession.attributes}
        })
    }

    render() {
        const dateReadingSessionAttributes = this.state.dateReadingSessionAttributes;

        return <article className="result-date-reading-session">
            <div className="message-item"></div>
            <a href="#" className="edit-item" onClick={this.editDateReadingSession.bind(this)}>
                <img src="/img/edit.png" alt="edit reading session" className="img-icon"/>
            </a>
            <a href="#" className="delete-item">
                <img src="/img/delete.png" alt="delete reading session" className="img-icon"/>
            </a>
            <div>{localizer.localize('date-reading-session-last-read-page-label')} {dateReadingSessionAttributes.lastReadPage}</div>
            <div>{localizer.localize('date-reading-session-last-read-date-label')} {dateReadingSessionAttributes.date}</div>
            <div>{dateReadingSessionAttributes.bookmark ? localizer.localize('date-reading-session-bookmark-label') + ' "' + dateReadingSessionAttributes.bookmark + '"' : ''}</div>
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