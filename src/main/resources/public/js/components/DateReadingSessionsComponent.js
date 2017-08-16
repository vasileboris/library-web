import React from 'react';
import PropTypes from 'prop-types';
import DateReadingSessionComponent from 'components/DateReadingSessionComponent'

function DateReadingSessionsComponent() {
    const dateReadingSessions = this.props.dateReadingSessions;
    return (
        <div className="results">
            {dateReadingSessions.map(dateReadingSession => (
                <DateReadingSessionComponent
                    key={dateReadingSession.attributes.date}
                    dateReadingSession={dateReadingSession}/>
            ))}
        </div>
    );
}

DateReadingSessionsComponent.propTypes = {
    dateReadingSessions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DateReadingSessionsComponent;