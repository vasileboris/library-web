import React from 'react';
import urlUtil from 'utils/UrlUtil';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function BookImageComponent(props) {
    const imgAttributes = buildImgAttributes(props);
    return <img src={imgAttributes.src} alt={imgAttributes.alt} className="img-book-large"/>;
}

function buildImgAttributes(props) {
    let src = '/img/no-image-available.png',
        alt = localizer.localize('book-no-image-available');
    if (props.book.image) {
        src = props.book.image;
        alt = urlUtil.previewUrl(props.book.image);
    }
    return {src, alt}
}

BookImageComponent.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookImageComponent;