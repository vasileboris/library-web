export const CHANGE_DATE_READING_SESSION = 'CHANGE_DATE_READING_SESSION';
export const CLEAR_DATE_READING_SESSION = 'CLEAR_DATE_READING_SESSION';
export const CREATE_DATE_READING_SESSION = 'CREATE_DATE_READING_SESSION';
export const UPDATE_DATE_READING_SESSION = 'UPDATE_DATE_READING_SESSION';
export const DELETE_DATE_READING_SESSION = 'DELETE_DATE_READING_SESSION';

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

export function clearDateReadingSessionAction() {
    return {
        type: CLEAR_DATE_READING_SESSION
    }
}

export function createDateReadingSessionAction(bookUuid, uuid, dateReadingSession) {
    return {
        type: CREATE_DATE_READING_SESSION,
        payload: { bookUuid, uuid, dateReadingSession }
    }
}

export function updateDateReadingSessionAction(bookUuid, uuid, dateReadingSession) {
    return {
        type: UPDATE_DATE_READING_SESSION,
        payload: { bookUuid, uuid, dateReadingSession }
    }
}

export function deleteDateReadingSessionAction(bookUuid, uuid, date) {
    return {
        type: DELETE_DATE_READING_SESSION,
        payload: { bookUuid, uuid, date }
    }
}
