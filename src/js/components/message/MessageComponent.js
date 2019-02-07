import React from 'react';
import PropTypes from 'prop-types';

function MessageComponent (props) {
    const { message } = props;
    return message && (
        <div className="messages">
            <div className="message-entry">{message}</div>
        </div>
    );
}

MessageComponent.propTypes = {
    message: PropTypes.string
};

export default MessageComponent;