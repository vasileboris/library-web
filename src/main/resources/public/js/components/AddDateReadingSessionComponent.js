import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';

function AddDateReadingSessionComponent (props) {
    return (
        <div className="entry">
            <input type="date"
                   name="date"
                   className="text"
                   placeholder={localizer.localize('date-reading-session-date-text')}
                   value={props.dateReadingSession.date}
                   onChange={props.onInputChange}/>
            <input type="text"
                   name="lastReadPage"
                   className="text"
                   placeholder={localizer.localize('date-reading-session-last-read-page-text')}
                   value={props.dateReadingSession.lastReadPage}
                   onChange={props.onInputChange}/>
            <input type="text"
                   name="bookmark"
                   className="text"
                   placeholder={localizer.localize('date-reading-session-bookmark-text')}
                   value={props.dateReadingSession.bookmark}
                   onChange={props.onInputChange}/>
            <button className="button"
                    onClick={props.onButtonClick}>
                {localizer.localize('date-reading-session-add-button')}
            </button>

        </div>
    );
}

AddDateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.object,
    onInputChange: PropTypes.func,
    onButtonClick: PropTypes.func
};

export default AddDateReadingSessionComponent;