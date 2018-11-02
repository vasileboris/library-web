export const FETCH_BOOK = 'FETCH_BOOK';
export const RECEIVE_BOOK = 'RECEIVE_BOOK';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const DELETE_BOOK = 'DELETE_BOOK';

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

export function fetchBooksAction(searchText) {
    return {
        type: FETCH_BOOKS,
        payload: searchText
    }
}

export function receiveBooksAction(books) {
    return {
        type: RECEIVE_BOOKS,
        payload: books
    }
}

export function deleteBookAction(searchText, uuid) {
    return {
        type: DELETE_BOOK,
        payload: {
            searchText,
            uuid
        }
    }
}