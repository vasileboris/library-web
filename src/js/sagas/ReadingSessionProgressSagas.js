import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchReadingSessionProgress } from 'api/ReadingSessionProgressApi';
import {
    receiveReadingSessionProgressAction,
    clearReadingSessionProgressAction,
    FETCH_READING_SESSION_PROGRESS } from 'actions/ReadingSessionProgressAction';
import { receiveMessageAction } from 'actions/MessageAction';

export function* watchFetchReadingSessionProgress() {
    yield takeLatest(FETCH_READING_SESSION_PROGRESS, callFetchReadingSessionProgress);
}

function* callFetchReadingSessionProgress(action) {
    const { bookUuid, uuid } = action.payload;
    try {
        const response = yield call(fetchReadingSessionProgress, bookUuid, uuid);
        yield put(receiveReadingSessionProgressAction(response.data));
    } catch (error) {
        yield put(receiveMessageAction(error));
        yield put(clearReadingSessionProgressAction(bookUuid));
    }
}