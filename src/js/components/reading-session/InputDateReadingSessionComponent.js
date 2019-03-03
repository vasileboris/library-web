import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';
import TextInput from 'components/controls/TextInput';
import DateInput from 'components/controls/DateInput';
import NumberInput from 'components/controls/NumberInput';

const InputDateReadingSessionComponent = React.forwardRef((props, ref) => {
    const { dateReadingSession, operation, onInputChange, onAddButtonClick, onUpdateButtonClick, onDeleteButtonClick, onCancelButtonClick } = props;
    return (
        <div ref={ref} className="entry">
            <DateInput name="date"
                   placeholder={localizer.localize('date-reading-session-date-text')}
                   value={dateReadingSession.date ? dateReadingSession.date : ''}
                   onChange={onInputChange}
                   readOnly={'add' !== operation}/>
            <NumberInput name="lastReadPage"
                   placeholder={localizer.localize('date-reading-session-last-read-page-text')}
                   value={dateReadingSession.lastReadPage ? dateReadingSession.lastReadPage : ""}
                   onChange={onInputChange}
                   readOnly={'delete' === operation}/>
            <TextInput name="bookmark"
                   placeholder={localizer.localize('date-reading-session-bookmark-text')}
                   value={dateReadingSession.bookmark ? dateReadingSession.bookmark : ""}
                   onChange={onInputChange}
                   readOnly={'delete' === operation}/>

           <div className="buttons container horizontal">
               {'add' === operation && (
               <button className="button"
                       onClick={() => onAddButtonClick(dateReadingSession)}>
                   {localizer.localize('add-button')}
               </button>
               )}
               {'edit' === operation && (
               <button className="button"
                       onClick={() => onUpdateButtonClick(dateReadingSession)}>
                   {localizer.localize('update-button')}
               </button>
               )}
               {'delete' === operation && (
                   <button className="button delete"
                           onClick={() => onDeleteButtonClick(dateReadingSession)}>
                       {localizer.localize('delete-button')}
                   </button>
               )}
               <button className="button"
                       onClick={onCancelButtonClick}>
                   {operation === 'add' ? localizer.localize('clear-button') : localizer.localize('cancel-button')}
               </button>
           </div>
        </div>
    );
});

InputDateReadingSessionComponent.propTypes = {
    operation: PropTypes.oneOf(['add', 'edit', 'delete']).isRequired,
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
    onUpdateButtonClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onCancelButtonClick: PropTypes.func
};

export default InputDateReadingSessionComponent;