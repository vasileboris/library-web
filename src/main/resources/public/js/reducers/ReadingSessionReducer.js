import { operation } from 'reducers/OperationReducer';
import { dateReadingSession } from 'reducers/DateReadingSessionReducer';
import { currentReadingSession } from 'reducers/CurrentReadingSessionReducer';
import { readingSessionProgress } from 'reducers/ReadingSessionProgressReducer';
import { combineReducers } from 'redux';

export const readingSession = combineReducers({
    operation,
    dateReadingSession,
    currentReadingSession,
    readingSessionProgress
});


