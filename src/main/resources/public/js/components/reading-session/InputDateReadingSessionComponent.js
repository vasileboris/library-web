import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';

function InputDateReadingSessionComponent(props) {
    return (
        <div className="entry">
            <input type="date"
                   name="date"
                   className="text"
                   placeholder={localizer.localize('date-reading-session-date-text')}
                   value={props.dateReadingSession.date ? props.dateReadingSession.date : ""}
                   onChange={props.onInputChange}
                   readOnly={props.operation !== 'add'}/>
            <input type="text"
                   name="lastReadPage"
                   className="text"
                   placeholder={localizer.localize('date-reading-session-last-read-page-text')}
                   value={props.dateReadingSession.lastReadPage ? props.dateReadingSession.lastReadPage : ""}
                   onChange={props.onInputChange}/>
            <input type="text"
                   name="bookmark"
                   className="text"
                   placeholder={localizer.localize('date-reading-session-bookmark-text')}
                   value={props.dateReadingSession.bookmark ? props.dateReadingSession.bookmark : ""}
                   onChange={props.onInputChange}/>

            {props.operation === 'add' ? (
                <button className="button"
                        onClick={() => props.onAddButtonClick(props.dateReadingSession)}>
                    {localizer.localize('date-reading-session-add-button')}
                </button>
            ) :
                <button className="button"
                        onClick={() => props.onUpdateButtonClick(props.dateReadingSession)}>
                    {localizer.localize('date-reading-session-update-button')}
                </button>
            }
        </div>
    );
}

InputDateReadingSessionComponent.propTypes = {
    operation: PropTypes.oneOf(['add', 'edit']).isRequired,
    dateReadingSession: PropTypes.shape({
        date: PropTypes.string,
        lastReadPage: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        bookmark: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }),
    onInputChange: PropTypes.func,
    onAddButtonClick: PropTypes.func,
    onUpdateButtonClick: PropTypes.func
};

export default InputDateReadingSessionComponent;