import {
    RECEIVE_READING_SESSION_PROGRESS,
    CLEAR_READING_SESSION_PROGRESS
} from 'actions/ReadingSessionProgressAction';

export function readingSessionsProgress(readingSessionsProgress = {}, action) {
    switch(action.type) {
        case RECEIVE_READING_SESSION_PROGRESS:
            return {
                ...readingSessionsProgress,
                [action.payload.bookUuid]: action.payload
            };
        case CLEAR_READING_SESSION_PROGRESS:
            return {
                ...readingSessionsProgress,
                [action.payload.bookUuid]: null
            };
        default:
            return readingSessionsProgress;
    }
}
