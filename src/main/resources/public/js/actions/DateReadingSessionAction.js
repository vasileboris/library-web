import { validateDateReadingSession, createDateReadingSession } from 'api/DateReadingSessionApi';
import { receiveMessageAction } from 'actions/MessageAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';

export const UPDATE_DATE_READING_SESSION = 'UPDATE_DATE_READING_SESSION';

export function updateDateReadingSessionFieldAction(field, value) {
    return {
        type: UPDATE_DATE_READING_SESSION,
        payload: {[field]: value}

    }
}

export function updateDateReadingSessionAction(dateReadingSession) {
    return {
        type: UPDATE_DATE_READING_SESSION,
        payload: dateReadingSession

    }
}

export function createDateReadingSessionFieldAction(bookUuid, uuid, dateReadingSession) {
    return function (dispatch) {
        validateDateReadingSession(dateReadingSession)
            .then(() => createDateReadingSession(bookUuid, uuid, dateReadingSession))
            .then(() => {
                dispatch(receiveMessageAction(null));
                dispatch(updateDateReadingSessionAction({
                    date: null,
                    lastReadPage: null,
                    bookmark: null
                }));
                dispatch(fetchCurrentReadingSessionAction(bookUuid))
            })
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

