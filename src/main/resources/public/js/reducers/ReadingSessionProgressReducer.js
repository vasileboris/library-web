import { RECEIVE_READING_SESSION_PROGRESS } from 'actions/ReadingSessionProgressAction';

export function readingSessionProgress(readingSessionProgress = null, action) {
    switch(action.type) {
        case RECEIVE_READING_SESSION_PROGRESS:
            return action.payload;
        default:
            return readingSessionProgress;
    }
}
