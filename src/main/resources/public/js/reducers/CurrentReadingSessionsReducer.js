import { RECEIVE_CURRENT_READING_SESSION } from 'actions/ReadingSessionAction';

export function currentReadingSessions(currentReadingSessions = {}, action) {
    switch(action.type) {
        case RECEIVE_CURRENT_READING_SESSION:
            return {
                ...currentReadingSessions,
                [action.payload.bookUuid]: action.payload
            };
        default:
            return currentReadingSessions;
    }
}
