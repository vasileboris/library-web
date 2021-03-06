import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';
import TextInput from 'components/controls/TextInput';
import NumberInput from 'components/controls/NumberInput';

const InputBookComponent = React.forwardRef((props, ref) => {
    const { operation, book, onInputChange, onAddButtonClick, onUpdateButtonClick, onDeleteButtonClick, onCancelButtonClick } = props;
    return (
        <div ref={ref} className="entry">
            <TextInput name="title"
                   placeholder={localizer.localize('book-title-text')}
                   value={book.title ? book.title : ""}
                   onChange={onInputChange}
                   readOnly={'delete' === operation}/>
            <TextInput name="authors"
                   placeholder={localizer.localize('book-authors-text')}
                   value={book.authors ? book.authors.join(',') : ""}
                   onChange={onInputChange}
                   readOnly={'delete' === operation}/>
            <NumberInput name="pages"
                   placeholder={localizer.localize('book-pages-text')}
                   value={book.pages ? book.pages : ""}
                   onChange={onInputChange}
                   readOnly={'delete' === operation}/>

            <div className="buttons container horizontal">
                {'add' === operation && (
                <button className="button"
                        onClick={onAddButtonClick}>
                    {localizer.localize('add-button')}
                </button>
                )}
                {'edit' === operation && (
                <button className="button"
                        onClick={onUpdateButtonClick}>
                    {localizer.localize('update-button')}
                </button>
                )}
                {'delete' === operation && (
                <button className="button delete"
                        onClick={onDeleteButtonClick}>
                    {localizer.localize('delete-button')}
                </button>
                )}
                <button className="button"
                        onClick={onCancelButtonClick}>
                    {localizer.localize('cancel-button')}
                </button>
            </div>
        </div>
    );
});

InputBookComponent.propTypes = {
    operation: PropTypes.oneOf(['add', 'edit', 'delete']).isRequired,
    book: PropTypes.shape({
        isbn10: PropTypes.string,
        isbn13: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        pages: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
    }),
    onInputChange: PropTypes.func,
    onAddButtonClick: PropTypes.func,
    onUpdateButtonClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onCancelButtonClick: PropTypes.func
};

export default InputBookComponent;