import { call } from 'redux-saga/effects'
import { watchFetchBook } from 'sagas/BookSagas';

export default function* rootSaga() {
    yield call(watchFetchBook);
}