import React from 'react';
import PropTypes from 'prop-types';

function MessageComponent (props) {
    const { message } = props;
    return message && (
        <div className="message entry">{message}</div>
    );
}

MessageComponent.propTypes = {
    message: PropTypes.string
};

export default MessageComponent;