import React from 'react';
import PropTypes from 'prop-types';
import DateReadingSessionComponent from './DateReadingSessionComponent'

function DateReadingSessionsComponent(props) {
    return (
        <div className="results">
            {props.dateReadingSessions
                .sort((drs1, drs2) => drs2.date.localeCompare(drs1.date))
                .map(drs => (
                <DateReadingSessionComponent
                    key={drs.date}
                    dateReadingSession={drs}
                    onEditClick={props.onEditClick}
                    onDeleteClick={props.onDeleteClick}/>
            ))}
        </div>
    );
}

DateReadingSessionsComponent.propTypes = {
    dateReadingSessions: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            lastReadPage: PropTypes.number.isRequired,
            bookmark: PropTypes.string
        })
    ).isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default DateReadingSessionsComponent;