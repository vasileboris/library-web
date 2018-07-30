import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchBook } from 'api/BookApi';
import { receiveBookAction, FETCH_BOOK } from 'actions/BookAction';
import { receiveMessageAction } from 'actions/MessageAction';
//Needed for Uncaught ReferenceError: regeneratorRuntime is not defined
import 'babel-polyfill';

export function* watchFetchBook() {
    yield takeLatest(FETCH_BOOK, callFetchBook);
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