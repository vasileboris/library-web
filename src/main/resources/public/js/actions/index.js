export const CREATE_DATE_READING_SESSION = 'CREATE_DATE_READING_SESSION';
export const UPDATE_DATE_READING_SESSION = 'UPDATE_DATE_READING_SESSION';
export const DELETE_DATE_READING_SESSION = 'DELETE_DATE_READING_SESSION';

export function createDateReadingSessionAction(dateReadingSession) {
    return {
        type: CREATE_DATE_READING_SESSION,
        payload: dateReadingSession
    }
}

export function updateDateReadingSessionAction(dateReadingSession) {
    return {
        type: UPDATE_DATE_READING_SESSION,
        payload: dateReadingSession
    }
}

export function deleteDateReadingSessionAction(date) {
    return {
        type: DELETE_DATE_READING_SESSION,
        payload: date
    }
}