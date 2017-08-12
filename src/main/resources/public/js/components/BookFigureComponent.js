import React from 'react';
import BookImageComponent from 'components/BookImageComponent';
import PropTypes from 'prop-types';

class BookFigureComponent extends React.Component {
    render() {
        const book = this.props.book;
        const bookImage = React.createElement(BookImageComponent, { book });
        const bookFigureCaption = React.createElement('figcaption', { className: 'title'}, book.title);
        return React.createElement('figure', { className: 'figure-book' }, bookImage, bookFigureCaption);
    }
}

BookFigureComponent.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookFigureComponent