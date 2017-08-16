import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function DateReadingSessionComponent() {
    const dateReadingSessionAttributes = this.props.dateReadingSession.attributes;
    let bookmark = '';
    if(dateReadingSessionAttributes.bookmark) {
        bookmark = localizer.localize('date-reading-session-bookmark-label') + ' "' + dateReadingSessionAttributes.bookmark + '"';
    }

    return (
        <article className="result-date-reading-session">
            <div className="message-item"></div>
            <a href="#" className="edit-item">
                <img src="/img/edit.png" alt="edit reading session" className="img-icon"/>
            </a>
            <a href="#" className="delete-item">
                <img src="/img/delete.png" alt="delete reading session" className="img-icon"/>
            </a>
            <div>{localizer.localize('date-reading-session-last-read-page-label')} {dateReadingSessionAttributes.lastReadPage}</div>
            <div>{localizer.localize('date-reading-session-last-read-date-label')} {dateReadingSessionAttributes.date}</div>
            <div>{bookmark}</div>
        </article>
    );
}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.object.isRequired
};

export default DateReadingSessionComponent;