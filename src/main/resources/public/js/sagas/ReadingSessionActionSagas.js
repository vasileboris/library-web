import { call, put, takeLatest } from 'redux-saga/effects';
import { receiveMessageAction } from 'actions/MessageAction';
import { fetchReadingSessionProgressAction } from 'actions/ReadingSessionProgressAction';
import { FETCH_CURRENT_READING_SESSION } from 'actions/ReadingSessionAction';
import {receiveCurrentReadingSessionAction} from 'actions/ReadingSessionAction';
import {fetchCurrentReadingSession} from 'api/ReadingSessionApi';


function* callFetchCurrentReadingSession(action) {
    try {
        const uuid  = action.payload;
        const response = yield call(fetchCurrentReadingSession, uuid);
        yield put(receiveCurrentReadingSessionAction(response.data));
        yield put(fetchReadingSessionProgressAction(uuid, response.data.uuid));
    } catch (error) {
        yield put(receiveMessageAction(error));
    }
}

export function* watchFetchCurrentReadingSession() {
    yield takeLatest(FETCH_CURRENT_READING_SESSION, callFetchCurrentReadingSession);
}