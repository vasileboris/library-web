import { fetchBook} from 'api/BookApi';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_BOOK = 'RECEIVE_BOOK';
export const RECEIVE_READING_SESSION_PROGRESS = 'RECEIVE_READING_SESSION_PROGRESS';
export const CREATE_DATE_READING_SESSION = 'CREATE_DATE_READING_SESSION';
export const UPDATE_DATE_READING_SESSION = 'UPDATE_DATE_READING_SESSION';
export const DELETE_DATE_READING_SESSION = 'DELETE_DATE_READING_SESSION';

export function receiveMessageAction(message) {
    return {
        type: RECEIVE_MESSAGE,
        payload: message
    }
}

export function receiveBookAction(book) {
    return {
        type: RECEIVE_BOOK,
        payload: book
    }
}

export function fetchBookAction(uuid) {
    return function (dispatch) {
        fetchBook(uuid)
            .then(response => dispatch(receiveBookAction(response.data)))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

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