import React from 'react';
import BookComponent from './BookComponent';
import PropTypes from 'prop-types';

function BooksComponent(props) {
    const { books, onEditClick, onDeleteClick } = props;
    return (
        <div className="results">
            {books && books
                .sort((b1, b2) => b1.title.toUpperCase().localeCompare(b2.title.toUpperCase()))
                .map(book => (
                    <BookComponent
                        key={`${book.isbn10}-${book.isbn13}`}
                        book={book}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}/>
                ))}
        </div>
    );
}

BooksComponent.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            isbn10: PropTypes.string,
            isbn13: PropTypes.string,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default BooksComponent;