export const FETCH_BOOK = 'FETCH_BOOK';
export const RECEIVE_BOOK = 'RECEIVE_BOOK';

export function fetchBookAction(uuid) {
    return {
        type: FETCH_BOOK,
        payload: uuid
    }
}

export function receiveBookAction(book) {
    return {
        type: RECEIVE_BOOK,
        payload: book
    }
}
