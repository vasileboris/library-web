import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function DateReadingSessionComponent(props) {
    const dateReadingSession = props.dateReadingSession;
    let bookmark = '';
    if(dateReadingSession.bookmark) {
        bookmark = localizer.localize('date-reading-session-bookmark-label') + ' "' + dateReadingSession.bookmark + '"';
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
            <div>{localizer.localize('date-reading-session-last-read-page-label')} {dateReadingSession.lastReadPage}</div>
            <div>{localizer.localize('date-reading-session-last-read-date-label')} {dateReadingSession.date}</div>
            <div>{bookmark}</div>
        </article>
    );
}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.object.isRequired
};

export default DateReadingSessionComponent;