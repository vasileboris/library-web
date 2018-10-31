import { operation } from 'reducers/OperationReducer';
import { dateReadingSession } from 'reducers/DateReadingSessionReducer';
import { currentReadingSessions } from 'reducers/CurrentReadingSessionsReducer';
import { readingSessionsProgress } from 'reducers/ReadingSessionsProgressReducer';
import { combineReducers } from 'redux';

export const readingSessions = combineReducers({
    operation,
    dateReadingSession,
    currentReadingSessions,
    readingSessionsProgress
});


