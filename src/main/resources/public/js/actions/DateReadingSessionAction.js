import {
    validateDateReadingSession,
    createDateReadingSession,
    updateDateReadingSession,
    deleteDateReadingSession
} from 'api/DateReadingSessionApi';
import { receiveMessageAction } from 'actions/MessageAction';
import { changeOperationAction } from 'actions/OperationAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';

export const CHANGE_DATE_READING_SESSION = 'CHANGE_DATE_READING_SESSION';

export function changeDateReadingSessionFieldAction(field, value) {
    return {
        type: CHANGE_DATE_READING_SESSION,
        payload: {[field]: value}

    }
}

export function changeDateReadingSessionAction(dateReadingSession) {
    return {
        type: CHANGE_DATE_READING_SESSION,
        payload: dateReadingSession

    }
}

export function createDateReadingSessionAction(bookUuid, uuid, dateReadingSession) {
    return function (dispatch) {
        validateDateReadingSession(dateReadingSession)
            .then(() => createDateReadingSession(bookUuid, uuid, dateReadingSession))
            .then(() => dispatchCurrentReadingSessionData(dispatch, bookUuid))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function updateDateReadingSessionAction(bookUuid, uuid, dateReadingSession) {
    return function (dispatch) {
        validateDateReadingSession(dateReadingSession)
            .then(() => updateDateReadingSession(bookUuid, uuid, dateReadingSession))
            .then(() => dispatchCurrentReadingSessionData(dispatch, bookUuid))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function deleteDateReadingSessionAction(bookUuid, uuid, date) {
    return function (dispatch) {
        deleteDateReadingSession(bookUuid, uuid, date)
            .then(() => dispatchCurrentReadingSessionData(dispatch, bookUuid))
            .catch(error => dispatch(receiveMessageAction(error)));
    }

}

function dispatchCurrentReadingSessionData(dispatch, bookUuid) {
    dispatch(receiveMessageAction(null));
    dispatch(changeOperationAction('add'))
    dispatch(changeDateReadingSessionAction({
        date: null,
        lastReadPage: null,
        bookmark: null
    }));
    dispatch(fetchCurrentReadingSessionAction(bookUuid))
}
