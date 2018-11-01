import { fetchBook, fetchBooks } from 'api/BookApi';
import { receiveMessageAction } from 'actions/MessageAction';

export const RECEIVE_BOOK = 'RECEIVE_BOOK';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

export function fetchBookAction(uuid) {
    return function (dispatch) {
        fetchBook(uuid)
            .then(response => dispatch(receiveBookAction(response.data)))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function receiveBookAction(book) {
    return {
        type: RECEIVE_BOOK,
        payload: book
    }
}

export function fetchBooksAction(searchText) {
    return function (dispatch) {
        fetchBooks(searchText)
            .then(response => dispatch(receiveBooksAction(response.data)))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function receiveBooksAction(books) {
    return {
        type: RECEIVE_BOOKS,
        payload: books
    }
}
