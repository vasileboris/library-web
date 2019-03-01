import React from 'react';
import BookComponent from './BookComponent';
import PropTypes from 'prop-types';

function BooksComponent(props) {
    const { books, onReadClick, onEditClick, onDeleteClick } = props;
    return (
        <div className="results container horizontal">
            {books && Object.entries(books)
                .map(entry => entry[1])
                .sort((b1, b2) => b1.title.toUpperCase().localeCompare(b2.title.toUpperCase()))
                .map(book => (
                    <BookComponent
                        key={`${book.isbn10}-${book.isbn13}`}
                        book={book}
                        onReadClick={onReadClick}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}/>
                ))}
        </div>
    );
}

BooksComponent.propTypes = {
    books: PropTypes.object,
    onReadClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default BooksComponent;