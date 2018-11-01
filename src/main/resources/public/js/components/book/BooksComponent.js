import React from 'react';
import BookComponent from './BookComponent';
import PropTypes from 'prop-types';

function BooksComponent(props) {
    const { books } = props;
    return (
        <div className="results">
            {books && books
                .sort((b1, b2) => b1.title.toUpperCase().localeCompare(b2.title.toUpperCase()))
                .map(book => (
                    <BookComponent key={`${book.isbn10}-${book.isbn13}`} book={book} {...props}/>
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
    )
};

export default BooksComponent;