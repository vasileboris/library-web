import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';
import DateReadingSessionsDispatcher from 'events/DateReadingSessionsDispatcher';

class DateReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateReadingSession: this.props.dateReadingSession
        }
        this.props.dateReadingSession.on('change', this.updateState.bind(this));
    }

    updateState() {
        this.setState({
            dateReadingSession: this.props.dateReadingSession
        })
    }

    render() {
        const dateReadingSession = this.state.dateReadingSession.attributes;

        const editAnchor = React.createElement('a',
            { href: '#', className: 'edit-item', onClick:  this.editDateReadingSession.bind(this) },
            React.createElement('img', { src: '/img/edit.png', alt: 'edit reading session', className: 'img-icon' }));

        const deleteAnchor = React.createElement('a',
            { href: '#', className: 'delete-item' },
            React.createElement('img', { src: '/img/delete.png', alt: 'delete reading session', className: 'img-icon' }));

        return React.createElement('article',
            {
                className: 'result-date-reading-session'
            },
            React.createElement('div', { className: 'message-item'}),
            editAnchor,
            deleteAnchor,
            React.createElement('div', {}, `${localizer.localize('date-reading-session-last-read-page-label')} ${dateReadingSession.lastReadPage}`),
            React.createElement('div', {}, `${localizer.localize('date-reading-session-last-read-date-label') } ${dateReadingSession.date}`),
            React.createElement('div', {}, `${dateReadingSession.bookmark ? localizer.localize('date-reading-session-bookmark-label') + ' "' + dateReadingSession.bookmark + '"' : ''}`));
    }

    editDateReadingSession(e) {
        e.preventDefault();
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.ERROR, '');
        DateReadingSessionsDispatcher.trigger(DateReadingSessionsDispatcher.Events.EDIT, this.props.dateReadingSession);
    }

}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.object.isRequired
};

export default DateReadingSessionComponent