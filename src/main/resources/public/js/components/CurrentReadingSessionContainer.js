import { connect } from 'react-redux';
import { createDateReadingSessionAction } from 'actions/index';
import CurrentReadingSessionComponent from 'components/CurrentReadingSessionComponent';
import React from 'react';

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onAddButtonClick: dateReadingSession => {
            console.log('onAddButtonClick');
            dispatch(createDateReadingSessionAction(dateReadingSession));
        }
    }
}

const CurrentReadingSessionContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentReadingSessionComponent);

export default CurrentReadingSessionContainer;