import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

class DateReadingSessionComponent extends React.Component {
    render() {
        const dateReadingSession = this.props.dateReadingSession;

        const editAnchor = React.createElement('a',
            { href: '#', className: 'edit-item' },
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
}

DateReadingSessionComponent.propTypes = {
    dateReadingSession: PropTypes.object.isRequired
};

export default DateReadingSessionComponent