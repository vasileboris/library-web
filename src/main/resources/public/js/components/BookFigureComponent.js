import React from 'react';
import BookImageComponent from 'components/BookImageComponent';
import PropTypes from 'prop-types';

function BookFigureComponent (props) {
    return (
        <figure className="figure-book">
            <BookImageComponent image={props.book.image}/>
            <figcaption className="title">{props.book.title}</figcaption>
        </figure>
    );
}

BookFigureComponent.propTypes = {
    book: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default BookFigureComponent;