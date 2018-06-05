import { all, call } from 'redux-saga/effects';
import { watchFetchBook } from 'sagas/BookSagas';
import { watchFetchCurrentReadingSession } from 'sagas/ReadingSessionActionSagas';
import { watchFetchReadingSessionProgress } from 'sagas/ReadingSessionProgressSagas';
import {
    watchCreateDateReadingSession,
    watchUpdateDateReadingSession } from 'sagas/DateReadingSessionSagas';

export default function* rootSaga() {
    yield all([
        call(watchFetchBook),
        call(watchFetchCurrentReadingSession),
        call(watchFetchReadingSessionProgress),
        call(watchCreateDateReadingSession),
        call(watchUpdateDateReadingSession)
    ]);
}