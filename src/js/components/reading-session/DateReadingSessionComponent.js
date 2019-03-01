import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function DateReadingSessionComponent(props) {
    const { dateReadingSession, onEditClick, onDeleteClick } = props;

    return (
        <article className="result container vertical">
            <div className="title result-important">{new Date(dateReadingSession.date).toLocaleDateString()}</div>
            <div>{localizer.localize('date-reading-session-last-read-page-label', dateReadingSession.lastReadPage)}</div>
            {dateReadingSession.bookmark && (
                <div>{localizer.localize('date-reading-session-bookmark-label')} {dateReadingSession.bookmark};</div>
            )}

            <div className="buttons container horizontal">
                <button className="edit-item button"
                        onClick={() => onEditClick(dateReadingSession)}>
                    {localizer.localize('edit-button')}
                </button>
                <button className="delete-item button"
                        onClick={() => onDeleteClick(dateReadingSession.date)}>
                    {localizer.localize('delete-button')}
                </button>
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