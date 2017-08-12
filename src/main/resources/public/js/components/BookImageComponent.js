import React from 'react';
import urlUtil from 'utils/UrlUtil';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

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

BookImageComponent.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookImageComponent