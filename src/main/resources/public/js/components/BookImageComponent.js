import React from 'react';
import urlUtil from 'utils/UrlUtil';
import localizer from 'utils/Localizer';

class BookImageComponent extends React.Component {
    render() {
        const book = this.props.book;

        let src = '/img/no-image-available.png',
            alt = localizer.localize('book-no-image-available'),
            className = 'img-book-large';
        if (book.image) {
            src = book.image;
            alt = urlUtil.previewUrl(book.image);
        }

        return React.createElement('img', {src, alt, className});
    }
}

export default BookImageComponent