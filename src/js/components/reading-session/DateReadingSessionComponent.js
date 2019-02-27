import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function DateReadingSessionComponent(props) {
    const { dateReadingSession, onEditClick, onDeleteClick } = props;

    return (
        <article className="result">
{/*
            <a href="#" className="delete-item" onClick={() => onDeleteClick(dateReadingSession.date)}>
                <img src="/img/delete.svg" alt={localizer.localize('date-reading-session-delete-button')} className="img-icon-large"/>
            </a>
*/}
            <div className="result-detail" onClick={() => onEditClick(dateReadingSession)}>
                <h1 className="result-important">{new Date(dateReadingSession.date).toLocaleDateString()}</h1>
                <div>{localizer.localize('date-reading-session-last-read-page-label', dateReadingSession.lastReadPage)}</div>
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