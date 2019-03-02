import React from 'react';
import PropTypes from 'prop-types';

const MessageComponent = React.forwardRef((props, ref) => {
    const { message } = props;
    return message && (
        <div ref={ref} className="message entry">{message}</div>
    );
});

MessageComponent.propTypes = {
    message: PropTypes.string
};

export default MessageComponent;