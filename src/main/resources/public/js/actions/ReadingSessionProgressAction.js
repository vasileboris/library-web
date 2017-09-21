import { fetchReadingSessionProgress } from 'api/ReadingSessionProgressApi';
import { receiveMessageAction } from 'actions/MessageAction';

export const RECEIVE_READING_SESSION_PROGRESS = 'RECEIVE_READING_SESSION_PROGRESS';

export function fetchReadingSessionProgressAction(bookUuid, uuid) {
    return function (dispatch) {
        fetchReadingSessionProgress(bookUuid, uuid)
            .then(readingSessionProgress => dispatch(receiveReadingSessionProgressAction(readingSessionProgress.data)))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function receiveReadingSessionProgressAction(readingSessionProgress) {
    return {
        type: RECEIVE_READING_SESSION_PROGRESS,
        payload: readingSessionProgress
    }
}

