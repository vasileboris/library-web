import React from 'react';
import localizer from 'utils/Localizer';
import BookFigureComponent from './BookFigureComponent';
import PropTypes from 'prop-types';

function BookComponent(props) {
    const { book, onEdit, onDelete } = props;
    return (
        <article className="result-book">
            <a href="#" className="edit-item" onClick={() => onEdit(book)}>
                <img src="/img/edit.png" alt={localizer.localize('book-update-button')} className="img-icon"/>
            </a>
            {/* TODO - Use Link after all book handling is in react */}
            <a href={`/books/${book.uuid}`} className="read-item">
                <img src="/img/read.png" alt={localizer.localize('book-read-button')} className="img-icon"/>
            </a>
            <a href="#" className="delete-item" onClick={() => onDelete(book)}>
                <img src="/img/delete.png" alt={localizer.localize('book-delete-button')} className="img-icon"/>
            </a>
            <div className="result-detail">
                <BookFigureComponent book={book} size="small"/>
            </div>
            <div>{localizer.localize('book-by-label')} {book.authors}</div>
            <div>{book.pages} {localizer.localize('book-pages-label')}</div>
            <div>{book.isbn10}</div>
            <div>{book.isbn13}</div>
        </article>
    );
}

BookComponent.propTypes = {
    book: PropTypes.shape({
        isbn10: PropTypes.string.isRequired,
        isbn13: PropTypes.string.isRequired,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default BookComponent;