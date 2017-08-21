import React from 'react';
import PropTypes from 'prop-types';
import DateReadingSessionComponent from 'components/DateReadingSessionComponent'

function DateReadingSessionsComponent(props) {
    return (
        <div className="results">
            {props.dateReadingSessions.map(dateReadingSession => (
                <DateReadingSessionComponent
                    key={dateReadingSession.date}
                    dateReadingSession={dateReadingSession}/>
            ))}
        </div>
    );
}

DateReadingSessionsComponent.propTypes = {
    dateReadingSessions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DateReadingSessionsComponent;