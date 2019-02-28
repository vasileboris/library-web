import React from 'react';
import localizer from 'utils/Localizer';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import BookImageComponent from './BookImageComponent';

function BookComponent(props) {
    const { book, onEditClick, onDeleteClick } = props;
    return (
        <article className="result">
{/*
            <a href="#" className="edit-item" onClick={() => onEditClick(book)}>
                <img src="/img/edit.svg" alt={localizer.localize('book-update-button')} className="img-icon-large"/>
            </a>
            <Link to={`/books/${book.uuid}`} className="read-item">
                <img src="/img/read.svg" alt={localizer.localize('book-read-button')} className="img-icon-large"/>
            </Link>
            <a href="#" className="delete-item" onClick={() => onDeleteClick(book)}>
                <img src="/img/delete.svg" alt={localizer.localize('book-delete-button')} className="img-icon-large"/>
            </a>
*/}
            <Link to={`/books/${book.uuid}`} className="read-item">
                <BookImageComponent image={book.image} size="small"/>
            </Link>
            <div className="result-detail" onClick={() => onEditClick(book)}>
                <div className="title">{book.title}</div>
                <div>{localizer.localize('book-by-label')} {book.authors.join(', ')}</div>
                <div>{book.pages} {localizer.localize('book-pages-label')}</div>
                <div>{book.isbn10}</div>
                <div>{book.isbn13}</div>
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
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default BookComponent;