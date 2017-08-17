import React from 'react';
import PropTypes from 'prop-types';

function MessageComponent (props) {
    if(!props.message) {
        return null;
    }

    return (
        <div className="message-entry">{props.message}</div>
    );
}

MessageComponent.propTypes = {
    message: PropTypes.string
};

export default MessageComponent;