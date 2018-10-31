import { readingSession } from 'reducers/ReadingSessionReducer';
import { combineReducers } from 'redux';
import {message} from "./MessageReducer";
import {book} from "./BookReducer";

export const library = combineReducers({
    message,
    book,
    readingSession
});
