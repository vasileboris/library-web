import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function DateReadingSessionComponent(props) {
    function onEditClick() {
        props.onEditClick(props.dateReadingSession);
    }

    function onDeleteClick() {
        props.onDeleteClick(props.dateReadingSession.date);
    }

    return (
        <article className="result-date-reading-session">
            <div className="message-item"></div>
            <a href="#" className="edit-item" onClick={onEditClick}>
                <img src="/img/edit.png" alt="edit reading session" className="img-icon"/>
            </a>
            <a href="#" className="delete-item" onClick={onDeleteClick}>
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
    dateReadingSession: PropTypes.shape({
        date: PropTypes.string.isRequired,
        lastReadPage: PropTypes.number.isRequired,
        bookmark: PropTypes.string
    }).isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default DateReadingSessionComponent;