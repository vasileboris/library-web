import {
    CHANGE_DATE_READING_SESSION,
    CLEAR_DATE_READING_SESSION
} from 'actions/DateReadingSessionAction';

export function dateReadingSession(dateReadingSession = {date: currentISODate()}, action) {
    switch(action.type) {
        case CHANGE_DATE_READING_SESSION:
            return Object.assign({}, dateReadingSession, action.payload);
        case CLEAR_DATE_READING_SESSION:
            return {date: currentISODate()};
        default:
            return dateReadingSession;
    }
}

const currentISODate = () => new Date().toISOString().split('T')[0];