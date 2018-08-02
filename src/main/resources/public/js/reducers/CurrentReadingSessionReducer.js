import { operation } from 'reducers/OperationReducer';
import { dateReadingSession } from 'reducers/DateReadingSessionReducer';
import { message } from 'reducers/MessageReducer';
import { book } from 'reducers/BookReducer';
import { currentReadingSession } from 'reducers/ReadingSessionReducer';
import { readingSessionProgress } from 'reducers/ReadingSessionProgressReducer';
import { combineReducers } from 'redux';

export const currentReadingSessionReducer = combineReducers({
    operation,
    dateReadingSession,
    message,
    book,
    currentReadingSession,
    readingSessionProgress
});

