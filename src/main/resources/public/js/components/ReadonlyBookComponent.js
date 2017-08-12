import React from 'react';
import urlUtil from 'utils/UrlUtil';
import localizer from 'utils/Localizer';

class ReadonlyBookComponent extends React.Component {
    render() {
        const book = this.props.book;

        let bookImage;
        if (book.image) {
            bookImage = React.createElement('img',
                {
                    src: book.image,
                    alt: urlUtil.previewUrl(book.image),
                    className: 'img-book-large'
                });
        } else {
            bookImage = React.createElement('img',
                {
                    src: '/img/no-image-available.png',
                    alt: localizer.localize('book-no-image-available'),
                    className: 'img-book-large'
                });
        }
        const bookFigureCaption = React.createElement('figcaption',
            {
                className: 'title'
            },
            book.title);
        const bookFigureDiv = React.createElement('div', {},
            React.createElement('figure',
                {
                    className: 'figure-book'
                },
                bookImage,
                bookFigureCaption));

        const bookAuthorsDiv = React.createElement('div', {},
            `${localizer.localize('book-by-label')} ${book.authors}`);

        const bookPagesDiv = React.createElement('div', {},
            `${book.pages} ${localizer.localize('book-pages-label')}`);

        return React.createElement('div', {},
            bookFigureDiv, bookAuthorsDiv, bookPagesDiv);
    }
}

export default ReadonlyBookComponent;