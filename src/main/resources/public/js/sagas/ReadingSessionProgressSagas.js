import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchReadingSessionProgress } from 'api/ReadingSessionProgressApi';
import { receiveMessageAction } from 'actions/MessageAction';
import { receiveReadingSessionProgressAction } from 'actions/ReadingSessionProgressAction';
import { FETCH_READING_SESSION_PROGRESS } from 'actions/ReadingSessionProgressAction';

function* callFetchReadingSessionProgress(action) {
    try {
        const {bookUuid, uuid} = action.payload;
        const response = yield call(fetchReadingSessionProgress, bookUuid, uuid);
        yield put(receiveReadingSessionProgressAction(response.data));
    } catch (error) {
        if (error.response.status === 404) {
            yield put(receiveReadingSessionProgressAction(null));
        } else {
            yield put(receiveMessageAction(error));
        }
    }
}

export function* watchFetchReadingSessionProgress() {
    yield takeLatest(FETCH_READING_SESSION_PROGRESS, callFetchReadingSessionProgress);
}