import React from 'react';
import localizer from 'utils/Localizer';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import BookFigureComponent from './BookFigureComponent';

function BookComponent(props) {
    const { book, onEditClick, onDeleteClick } = props;
    return (
        <article className="result-book">
            <a href="#" className="edit-item" onClick={() => onEditClick(book)}>
                <img src="/img/edit.png" alt={localizer.localize('book-update-button')} className="img-icon"/>
            </a>
            <Link to={`/books/${book.uuid}`} className="read-item">
                <img src="/img/read.png" alt={localizer.localize('book-read-button')} className="img-icon"/>
            </Link>
            <a href="#" className="delete-item" onClick={() => onDeleteClick(book)}>
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
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default BookComponent;