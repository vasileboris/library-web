import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects';
import {
    fetchBook,
    fetchBooks,
    deleteBook,
    sanitizeBook,
    validateBook,
    addBook,
    updateBook
} from 'api/BookApi';
import {
    receiveBookAction,
    receiveBooksAction,
    resetBookAction,
    FETCH_BOOK,
    FETCH_BOOKS,
    DELETE_BOOK,
    ADD_BOOK,
    UPDATE_BOOK
} from 'actions/BookAction';
import { receiveMessageAction } from 'actions/MessageAction';
import { receiveBooksSearchTextAction } from 'actions/BooksSearchAction';
import { changeBookOperationAction } from 'actions/OperationAction';

//Needed for Uncaught ReferenceError: regeneratorRuntime is not defined
import 'babel-polyfill';

export function* watchFetchBook() {
    yield takeLatest(FETCH_BOOK, callFetchBook);
}

export function* watchFetchBooks() {
    yield takeLatest(FETCH_BOOKS, callFetchBooks);
}

export function* watchDeleteBook() {
    yield takeLatest(DELETE_BOOK, callDeleteBook);
}

export function* watchAddBook() {
    yield takeLatest(ADD_BOOK, callAddBook);
}

export function* watchUpdateBook() {
    yield takeLatest(UPDATE_BOOK, callUpdateBook);
}

function* callFetchBook(action) {
    try {
        const bookUuid = action.payload;
        const response = yield call(fetchBook, bookUuid);
        yield put(receiveBookAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callFetchBooks(action) {
    try {
        yield put(receiveMessageAction(null));
        const searchText = action.payload;
        const response = yield call(fetchBooks, searchText);
        yield put(receiveBooksAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callDeleteBook(action) {
    try {
        yield put(receiveMessageAction(null));
        const bookUuid = action.payload.uuid;
        yield call(deleteBook, bookUuid);
        yield dispatchBookSearchData(action);
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callAddBook(action) {
    try {
        yield put(receiveMessageAction(null));
        const book = sanitizeBook(action.payload.book);
        yield put(resetBookAction(book));
        yield call(validateBook, book);
        yield call(addBook, book);
        yield dispatchBookSearchData(action);
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* callUpdateBook(action) {
    try {
        yield put(receiveMessageAction(null));
        const book = sanitizeBook(action.payload.book);
        yield put(resetBookAction(book));
        yield call(validateBook, book);
        yield call(updateBook, book);
        yield dispatchBookSearchData(action);
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}

function* dispatchBookSearchData(action) {
    try {
        const searchText = action.payload.searchText;
        yield put(receiveMessageAction(null));
        yield put(changeBookOperationAction('search'));
        yield put(resetBookAction({}));
        yield put(receiveBooksSearchTextAction(searchText));
        const response = yield call(fetchBooks, searchText);
        yield put(receiveBooksAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}