import React from 'react';
import localizer from 'utils/Localizer';
import BookFigureComponent from './BookFigureComponent';
import PropTypes from 'prop-types';

function ReadonlyBookComponent(props) {
    const { book } = props;
    return (
        <article className="result-single">
            <BookFigureComponent book={book} size="large"/>
            <div>{localizer.localize('book-by-label')} {book.authors}</div>
            <div>{book.pages} {localizer.localize('book-pages-label')}</div>
        </article>
    );
}

ReadonlyBookComponent.propTypes = {
    book: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.number.isRequired
    }).isRequired
};

export default ReadonlyBookComponent;