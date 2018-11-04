import {
    fetchBook,
    fetchBooks,
    deleteBook,
    sanitizeBook,
    addBook,
    validateBook,
    updateBook
} from 'api/BookApi';
import { receiveMessageAction } from './MessageAction';
import { receiveBooksSearchTextAction } from './BooksSearchAction';
import { changeBookOperationAction } from './OperationAction';

export const RECEIVE_BOOK = 'RECEIVE_BOOK';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const CHANGE_BOOK = 'CHANGE_BOOK';
export const RESET_BOOK = 'RESET_BOOK';

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
            .then(() => dispatch(receiveMessageAction(null)))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function receiveBooksAction(books) {
    return {
        type: RECEIVE_BOOKS,
        payload: books
    }
}

export function deleteBookAction(searchText, uuid) {
    return function (dispatch) {
        deleteBook(uuid)
            .then(() => dispatchBookSearchData(dispatch, searchText))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

function dispatchBookSearchData(dispatch, searchText) {
    dispatch(receiveMessageAction(null));
    dispatch(changeBookOperationAction('search'));
    dispatch(resetBookAction({}));
    dispatch(receiveBooksSearchTextAction(searchText));
    dispatch(fetchBooksAction(searchText));
}

export function changeBookFieldAction(field, value) {
    return {
        type: CHANGE_BOOK,
        payload: {[field]: value}

    }
}

export function resetBookAction(book) {
    return {
        type: RESET_BOOK,
        payload: book
    }
}

export function addBookAction(searchText, book) {
    return function (dispatch) {
        const sanitizedBook = sanitizeBook(book);
        dispatch(resetBookAction(sanitizedBook));
        validateBook(sanitizedBook)
            .then(() => addBook(sanitizedBook))
            .then(() => dispatchBookSearchData(dispatch, searchText))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function updateBookAction(searchText, book) {
    return function (dispatch) {
        const sanitizedBook = sanitizeBook(book);
        dispatch(resetBookAction(sanitizedBook));
        validateBook(sanitizedBook)
            .then(() => updateBook(sanitizedBook))
            .then(() => dispatchBookSearchData(dispatch, searchText))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}
