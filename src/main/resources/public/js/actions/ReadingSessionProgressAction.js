import { fetchReadingSessionProgress } from 'api/ReadingSessionProgressApi';
import { receiveMessageAction } from 'actions/MessageAction';

export const RECEIVE_READING_SESSION_PROGRESS = 'RECEIVE_READING_SESSION_PROGRESS';

export function fetchReadingSessionProgressAction(bookUuid, uuid) {
    return function (dispatch) {
        fetchReadingSessionProgress(bookUuid, uuid)
            .then(readingSessionProgress => dispatch(receiveReadingSessionProgressAction(readingSessionProgress.data)))
            .catch(error => {
                if(error.response.status === 404) {
                    dispatch(receiveReadingSessionProgressAction(null));
                } else {
                    dispatch(receiveMessageAction(error.response.status));
                }
            });
    }
}

export function receiveReadingSessionProgressAction(readingSessionProgress) {
    return {
        type: RECEIVE_READING_SESSION_PROGRESS,
        payload: readingSessionProgress
    }
}

