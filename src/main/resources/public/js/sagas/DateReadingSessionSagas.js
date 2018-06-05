import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    validateDateReadingSession,
    createDateReadingSession } from 'api/DateReadingSessionApi';
import {
    changeDateReadingSessionAction,
    CREATE_DATE_READING_SESSION } from 'actions/DateReadingSessionAction';
import { receiveMessageAction } from 'actions/MessageAction';
import { changeOperationAction } from 'actions/OperationAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';


export function* watchCreateDateReadingSession() {
    yield takeLatest(CREATE_DATE_READING_SESSION, callCreateDateReadingSession);
}

function* callCreateDateReadingSession(action) {
    try {
        const {bookUuid, uuid, dateReadingSession} = action.payload;
        yield call(validateDateReadingSession, dateReadingSession);
        yield call(createDateReadingSession, bookUuid, uuid, dateReadingSession);
        yield call(dispatchCurrentReadingSessionData, bookUuid);
    } catch (error) {
        yield put(receiveMessageAction(error));
    }
}

function* dispatchCurrentReadingSessionData(bookUuid) {
    yield all([
        put(receiveMessageAction(null)),
        put(changeOperationAction('add')),
        put(changeDateReadingSessionAction({
            date: null,
            lastReadPage: null,
            bookmark: null
        })),
        put(fetchCurrentReadingSessionAction(bookUuid))
    ]);
}
