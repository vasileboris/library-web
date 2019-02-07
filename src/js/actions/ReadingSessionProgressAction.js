export const FETCH_READING_SESSION_PROGRESS = 'FETCH_READING_SESSION_PROGRESS';
export const RECEIVE_READING_SESSION_PROGRESS = 'RECEIVE_READING_SESSION_PROGRESS';

export function fetchReadingSessionProgressAction(bookUuid, uuid) {
    return {
        type: FETCH_READING_SESSION_PROGRESS,
        payload: { bookUuid, uuid }
    }
}

export function receiveReadingSessionProgressAction(readingSessionProgress) {
    return {
        type: RECEIVE_READING_SESSION_PROGRESS,
        payload: readingSessionProgress
    }
}

