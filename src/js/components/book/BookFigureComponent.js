import React from 'react';
import BookImageComponent from './BookImageComponent';
import PropTypes from 'prop-types';

function BookFigureComponent (props) {
    const { book, size } = props;
    return (
        <figure className="figure-book">
            <BookImageComponent image={book.image} size={size}/>
            <figcaption className="title">{book.title}</figcaption>
        </figure>
    );
}

BookFigureComponent.propTypes = {
    book: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string.isRequired
    }).isRequired,
    size: PropTypes.string.isRequired
};

export default BookFigureComponent;