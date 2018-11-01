import React from 'react';
import BookComponent from './BookComponent';
import PropTypes from 'prop-types';

function BooksComponent(props) {
    const { books } = props;
    return (
        <div className="results">
            {books && Object.entries(books)
                .map(entry => entry[1])
                .sort((b1, b2) => b1.title.toUpperCase().localeCompare(b2.title.toUpperCase()))
                .map(book => (
                    <BookComponent key={`${book.isbn10}-${book.isbn13}`} book={book} {...props}/>
                ))}
        </div>
    );
}

BooksComponent.propTypes = {
    books: PropTypes.object
};

export default BooksComponent;