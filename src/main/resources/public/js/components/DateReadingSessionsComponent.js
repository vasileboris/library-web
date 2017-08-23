import React from 'react';
import PropTypes from 'prop-types';
import DateReadingSessionComponent from 'components/DateReadingSessionComponent'

function DateReadingSessionsComponent(props) {
    return (
        <div className="results">
            {props.dateReadingSessions
                .sort((drs1, drs2) => drs2.date.localeCompare(drs1.date))
                .map(drs => (
                <DateReadingSessionComponent
                    key={drs.date}
                    dateReadingSession={drs} onEditClick={props.onEditClick}/>
            ))}
        </div>
    );
}

DateReadingSessionsComponent.propTypes = {
    dateReadingSessions: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEditClick: PropTypes.func.isRequired
};

export default DateReadingSessionsComponent;