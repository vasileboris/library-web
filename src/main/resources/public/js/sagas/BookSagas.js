import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchBook, fetchBooks } from 'api/BookApi';
import {
    receiveBookAction,
    receiveBooksAction,
    FETCH_BOOK,
    FETCH_BOOKS
} from 'actions/BookAction';
import { receiveMessageAction } from 'actions/MessageAction';
//Needed for Uncaught ReferenceError: regeneratorRuntime is not defined
import 'babel-polyfill';

export function* watchFetchBook() {
    yield takeLatest(FETCH_BOOK, callFetchBook);
}

export function* watchFetchBooks() {
    yield takeLatest(FETCH_BOOKS, callFetchBooks);
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
        const searchText = action.payload;
        const response = yield call(fetchBooks, searchText);
        yield put(receiveBooksAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));
    }
}