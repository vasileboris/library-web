import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';
import BookImageComponent from './BookImageComponent';

function BookComponent(props) {
    const { book, onReadClick, onEditClick, onDeleteClick } = props;
    return (
        <article className="result container vertical">
            <BookImageComponent image={book.image} size="small"/>
            <button className="button"
                    onClick={() => onReadClick(book)}>
                {localizer.localize('read-button')}
            </button>
            <div className="result-detail container vertical">
                <div>
                    <div className="title result-important">{book.title}</div>
                    <div>{localizer.localize('book-by-label')} {book.authors.join(', ')}</div>
                    <div>{book.pages} {localizer.localize('book-pages-label')}</div>
                </div>
                <div className="buttons small container horizontal">
                    <button className="button"
                            onClick={() => onEditClick(book)}>
                        {localizer.localize('edit-button')}
                    </button>
                    <button className="button"
                            onClick={() => onDeleteClick(book)}>
                        {localizer.localize('delete-button')}
                    </button>
                </div>
            </div>
        </article>
    );
}

BookComponent.propTypes = {
    book: PropTypes.shape({
        isbn10: PropTypes.string,
        isbn13: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
    }).isRequired,
    onReadClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default BookComponent;