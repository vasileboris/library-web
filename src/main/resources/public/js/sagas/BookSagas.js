import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchBook } from 'api/BookApi';
import { receiveBookAction, FETCH_BOOK } from 'actions/BookAction';
import { receiveMessageAction } from 'actions/MessageAction';

function* fetchBookWorker(action) {
    try {
        const response = yield call(fetchBook, action.payload);
        yield put(receiveBookAction(response.data));
    } catch(error) {
        yield put(receiveMessageAction(error));

    }
}

export function* fetchBookSaga() {
    yield takeLatest(FETCH_BOOK, fetchBookWorker);
}