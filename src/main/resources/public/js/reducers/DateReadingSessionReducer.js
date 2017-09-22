import { UPDATE_DATE_READING_SESSION } from 'actions/DateReadingSessionAction';

export function dateReadingSession(dateReadingSession = {}, action) {
    switch(action.type) {
        case UPDATE_DATE_READING_SESSION:
            return Object.assign({}, dateReadingSession, action.payload);
        default:
            return dateReadingSession;
    }
}
