export const FETCH_CURRENT_READING_SESSION = 'FETCH_CURRENT_READING_SESSION';
export const RECEIVE_CURRENT_READING_SESSION = 'RECEIVE_CURRENT_READING_SESSION';

export function fetchCurrentReadingSessionAction(bookUuid) {
    return {
        type: FETCH_CURRENT_READING_SESSION,
        payload: bookUuid
    }
}

export function receiveCurrentReadingSessionAction(currentReadingSession) {
    return {
        type: RECEIVE_CURRENT_READING_SESSION,
        payload: currentReadingSession
    }
}

