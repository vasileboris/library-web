import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';
import TextInput from 'components/controls/TextInput';

function InputBookComponent(props) {
    const { operation, book, onInputChange, onAddButtonClick, onUpdateButtonClick, onCancelButtonClick } = props;
    return (
        <div className="entry">
            <TextInput name="isbn10"
                   placeholder={localizer.localize('book-isbn10-text')}
                   value={book.isbn10 ? book.isbn10 : ""}
                   onChange={onInputChange}/>
            <TextInput name="isbn13"
                   placeholder={localizer.localize('book-isbn13-text')}
                   value={book.isbn13 ? book.isbn13 : ""}
                   onChange={onInputChange}/>
            <TextInput name="title"
                   placeholder={localizer.localize('book-title-text')}
                   value={book.title ? book.title : ""}
                   onChange={onInputChange}/>
            <TextInput name="authors"
                   placeholder={localizer.localize('book-authors-text')}
                   value={book.authors ? book.authors.join(',') : ""}
                   onChange={onInputChange}/>
            <TextInput name="image"
                   placeholder={localizer.localize('book-image-text')}
                   value={book.image ? book.image : ""}
                   onChange={onInputChange}/>
            <TextInput name="pages"
                   placeholder={localizer.localize('book-pages-text')}
                   value={book.pages ? book.pages : ""}
                   onChange={onInputChange}/>

            {operation === 'add' ? (
            <button className="button"
                    onClick={onAddButtonClick}>
                {localizer.localize('book-add-button')}
            </button>
            ) : (
            <button className="button"
                    onClick={onUpdateButtonClick}>
                {localizer.localize('book-update-button')}
            </button>
            )}
            <button className="button"
                    onClick={onCancelButtonClick}>
                {localizer.localize('cancel')}
            </button>
        </div>
    );
}

InputBookComponent.propTypes = {
    operation: PropTypes.oneOf(['add', 'edit']).isRequired,
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
    onCancelButtonClick: PropTypes.func
};

export default InputBookComponent;