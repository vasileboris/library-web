import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function DateReadingSessionComponent(props) {
    const { dateReadingSession, onEditClick, onDeleteClick } = props;

    return (
        <article className="result-date-reading-session">
            <a href="#" className="edit-item" onClick={() => onEditClick(dateReadingSession)}>
                <img src="/img/edit.svg" alt={localizer.localize('date-reading-session-update-button')} className="img-icon-large"/>
            </a>
            <a href="#" className="delete-item" onClick={() => onDeleteClick(dateReadingSession.date)}>
                <img src="/img/delete.svg" alt={localizer.localize('date-reading-session-delete-button')} className="img-icon-large"/>
            </a>
            <div className="result-detail">
                <div>{localizer.localize('date-reading-session-last-read-page-label')} {dateReadingSession.lastReadPage}</div>
                <div>{localizer.localize('date-reading-session-last-read-date-label')} {dateReadingSession.date}</div>
                {dateReadingSession.bookmark && (
                    <div>{localizer.localize('date-reading-session-bookmark-label')} {dateReadingSession.bookmark};</div>
                )}
            </div>
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