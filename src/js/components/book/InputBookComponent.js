import React from 'react';
import PropTypes from 'prop-types';
import localizer from 'utils/Localizer';

function InputBookComponent(props) {
    const { operation, book, onInputChange, onAddButtonClick, onUpdateButtonClick, onCancelButtonClick } = props;
    return (
        <div className="entries">
            <div className="entry">
                <input type="text"
                       name="isbn10"
                       className="text"
                       placeholder={localizer.localize('book-isbn10-text')}
                       value={book.isbn10 ? book.isbn10 : ""}
                       onChange={onInputChange}/>
                <input type="text"
                       name="isbn13"
                       className="text"
                       placeholder={localizer.localize('book-isbn13-text')}
                       value={book.isbn13 ? book.isbn13 : ""}
                       onChange={onInputChange}/>
                <input type="text"
                       name="title"
                       className="text"
                       placeholder={localizer.localize('book-title-text')}
                       value={book.title ? book.title : ""}
                       onChange={onInputChange}/>
                <input type="text"
                       name="authors"
                       className="text"
                       placeholder={localizer.localize('book-authors-text')}
                       value={book.authors ? book.authors.join(',') : ""}
                       onChange={onInputChange}/>
                <input type="text"
                       name="image"
                       className="text"
                       placeholder={localizer.localize('book-image-text')}
                       value={book.image ? book.image : ""}
                       onChange={onInputChange}/>
                <input type="text"
                       name="pages"
                       className="text"
                       placeholder={localizer.localize('book-pages-text')}
                       value={book.pages ? book.pages : ""}
                       onChange={onInputChange}/>

                {operation === 'add' ? (
                        <button className="button"
                                onClick={onAddButtonClick}>
                            {localizer.localize('book-add-button')}
                        </button>
                    ) :
                    <button className="button"
                            onClick={onUpdateButtonClick}>
                        {localizer.localize('book-update-button')}
                    </button>
                }
            </div>
            <div className="entry">
                <a href="#" onClick={onCancelButtonClick}>
                    <img src="/img/cancel.png" alt={localizer.localize('cancel-edit-book-button')} className="img-icon-large"/>
                </a>
            </div>
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