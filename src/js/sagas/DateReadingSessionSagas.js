import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    sanitizeDateReadingSession,
    validateDateReadingSession,
    createDateReadingSession,
    updateDateReadingSession,
    deleteDateReadingSession } from 'api/DateReadingSessionApi';
import {
    changeDateReadingSessionAction,
    clearDateReadingSessionAction,
    CREATE_DATE_READING_SESSION,
    UPDATE_DATE_READING_SESSION,
    DELETE_DATE_READING_SESSION } from 'actions/DateReadingSessionAction';
import { receiveMessageAction } from 'actions/MessageAction';
import { changeDateReadingSessionOperationAction } from 'actions/OperationAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';


export function* watchCreateDateReadingSession() {
    yield takeLatest(CREATE_DATE_READING_SESSION, callCreateDateReadingSession);
}

export function* watchUpdateDateReadingSession() {
    yield takeLatest(UPDATE_DATE_READING_SESSION, callUpdateDateReadingSession);
}

export function* watchDeleteDateReadingSession() {
    yield takeLatest(DELETE_DATE_READING_SESSION, callDeleteDateReadingSession);
}

function* callCreateDateReadingSession(action) {
    try {
        const {bookUuid, uuid} = action.payload;
        const dateReadingSession = sanitizeDateReadingSession(action.payload.dateReadingSession);
        yield put(changeDateReadingSessionAction(dateReadingSession));
        yield call(validateDateReadingSession, dateReadingSession);
        yield call(createDateReadingSession, bookUuid, uuid, dateReadingSession);
        yield call(dispatchCurrentReadingSessionData, bookUuid);
    } catch (error) {
        yield put(receiveMessageAction(error));
    }
}

function* callUpdateDateReadingSession(action) {
    try {
        const {bookUuid, uuid} = action.payload;
        const dateReadingSession = sanitizeDateReadingSession(action.payload.dateReadingSession);
        yield put(changeDateReadingSessionAction(dateReadingSession));
        yield call(validateDateReadingSession, dateReadingSession);
        yield call(updateDateReadingSession, bookUuid, uuid, dateReadingSession);
        yield call(dispatchCurrentReadingSessionData, bookUuid);
    } catch (error) {
        yield put(receiveMessageAction(error));
    }
}

function* callDeleteDateReadingSession(action) {
    try {
        const {bookUuid, uuid, date} = action.payload;
        yield call(deleteDateReadingSession, bookUuid, uuid, date);
        yield call(dispatchCurrentReadingSessionData, bookUuid);
    } catch (error) {
        yield put(receiveMessageAction(error));
    }
}

function* dispatchCurrentReadingSessionData(bookUuid) {
    try {
        yield all([
            put(receiveMessageAction(null)),
            put(changeDateReadingSessionOperationAction('add')),
            put(clearDateReadingSessionAction()),
            put(fetchCurrentReadingSessionAction(bookUuid))
        ]);
    } catch (error) {
        yield put(receiveMessageAction(error));
    }
}
