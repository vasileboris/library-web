import React from 'react';
import urlUtil from 'utils/UrlUtil';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function BookImageComponent(props) {
    const { image, size } = props;
    const imgAttributes = buildImgAttributes(image);
    return <img src={imgAttributes.src} alt={imgAttributes.alt} className={`img-book-${size}`}/>;
}

function buildImgAttributes(image) {
    let src = '/img/no-image-available.png',
        alt = localizer.localize('book-no-image-available');
    if (image) {
        src = image;
        alt = urlUtil.previewUrl(image);
    }
    return {src, alt}
}

BookImageComponent.propTypes = {
    image: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
};

export default BookImageComponent;