import React from 'react';
import BookComponent from './BookComponent';
import PropTypes from 'prop-types';

function BooksComponent(props) {
    const { books } = props;
    return (
        <div className="results">
            {books
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
            image: PropTypes.string,
            title: PropTypes.string.isRequired,
            authors: PropTypes.arrayOf(PropTypes.string).isRequired,
            pages: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired
        })
    ).isRequired
};

export default BooksComponent;