import React from 'react';
import BookImageComponent from 'components/BookImageComponent';
import PropTypes from 'prop-types';

function BookFigureComponent (props) {
    const book = props.book;

    return <figure className="figure-book">
        <BookImageComponent book={book}/>
        <figcaption className="title">{book.title}</figcaption>
    </figure>;
}

BookFigureComponent.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookFigureComponent