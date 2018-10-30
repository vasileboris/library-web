import { RECEIVE_CURRENT_READING_SESSION } from 'actions/ReadingSessionAction';

export function currentReadingSession(currentReadingSession = null, action) {
    switch(action.type) {
        case RECEIVE_CURRENT_READING_SESSION:
            return action.payload;
        default:
            return currentReadingSession;
    }
}
