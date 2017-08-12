import React from 'react';
import localizer from 'utils/Localizer';
import BookFigureComponent from 'components/BookFigureComponent';

class ReadonlyBookComponent extends React.Component {
    render() {
        const book = this.props.book;

        const bookFigureDiv = React.createElement(BookFigureComponent, {book});

        const bookAuthorsDiv = React.createElement('div', {},
            `${localizer.localize('book-by-label')} ${book.authors}`);

        const bookPagesDiv = React.createElement('div', {},
            `${book.pages} ${localizer.localize('book-pages-label')}`);

        return React.createElement('div', {},
            bookFigureDiv, bookAuthorsDiv, bookPagesDiv);
    }
}

export default ReadonlyBookComponent;