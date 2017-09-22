import React from 'react';
import PropTypes from 'prop-types';

function MessageComponent (props) {
    console.log(props.message);
    return (
        <div className="message-entry">{props.message}</div>
    );
}

MessageComponent.propTypes = {
    message: PropTypes.string.isRequired
};

export default MessageComponent;