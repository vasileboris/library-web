import { fetchCurrentReadingSession } from 'api/ReadingSessionApi';
import { receiveMessageAction } from 'actions/MessageAction';
import { fetchReadingSessionProgressAction } from 'actions/ReadingSessionProgressAction';

export const RECEIVE_CURRENT_READING_SESSION = 'RECEIVE_CURRENT_READING_SESSION';

export function fetchCurrentReadingSessionAction(bookUuid) {
    return function (dispatch) {
        fetchCurrentReadingSession(bookUuid)
            .then(response => {
                dispatch(receiveCurrentReadingSessionAction(response.data));
                dispatch(fetchReadingSessionProgressAction(bookUuid, response.data.uuid));
            })
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function receiveCurrentReadingSessionAction(currentReadingSession) {
    return {
        type: RECEIVE_CURRENT_READING_SESSION,
        payload: currentReadingSession
    }
}

