import React from 'react';
import BookImageComponent from 'components/BookImageComponent';
import PropTypes from 'prop-types';

function BookFigureComponent (props) {
    return (
        <figure className="figure-book">
            <BookImageComponent book={props.book}/>
            <figcaption className="title">{props.book.title}</figcaption>
        </figure>
    );
}

BookFigureComponent.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookFigureComponent;