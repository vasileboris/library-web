import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function DateReadingSessionComponent(props) {
    return (
        <article className="result-date-reading-session">
            <div className="message-item"></div>
            <a href="#" className="edit-item" onClick={e => {e.preventDefault(); props.onEditClick()}}>
                <img src="/img/edit.png" alt="edit reading session" className="img-icon"/>
            </a>
            <a href="#" className="delete-item">
                <img src="/img/delete.png" alt="delete reading session" className="img-icon"/>
            </a>
            <div>{localizer.localize('date-reading-session-last-read-page-label')} {props.dateReadingSession.lastReadPage}</div>
            <div>{localizer.localize('date-reading-session-last-read-date-label')} {props.dateReadingSession.date}</div>
            {props.dateReadingSession.bookmark ? (
                <div>{localizer.localize('date-reading-session-bookmark-label')} {props.dateReadingSession.bookmark};</div>
            ) : null}
        </article>
    );
}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.object.isRequired,
    onEditClick: PropTypes.func.isRequired
};

export default DateReadingSessionComponent;