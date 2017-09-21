import { message } from 'reducers/MessageReducer';
import { book } from 'reducers/BookReducer';
import { currentReadingSession } from 'reducers/ReadingSessionReducer';
import { readingSessionProgress } from 'reducers/ReadingSessionProgressReducer';
import { combineReducers } from 'redux';

export const currentReadingSessionReducer = combineReducers({
    message,
    book,
    currentReadingSession,
    readingSessionProgress
});


