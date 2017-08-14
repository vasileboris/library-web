import React from 'react';
import localizer from 'utils/Localizer';
import BookFigureComponent from 'components/BookFigureComponent';
import PropTypes from 'prop-types';

function ReadonlyBookComponent(props) {
    const book = props.book;

    return <div>
        <BookFigureComponent book={book}/>
        <div>{localizer.localize('book-by-label')} {book.authors}</div>
        <div>{book.pages} {localizer.localize('book-pages-label')}</div>
    </div>
}

ReadonlyBookComponent.propTypes = {
    book: PropTypes.object.isRequired
};

export default ReadonlyBookComponent;