import { readingSession } from 'reducers/ReadingSessionReducer';
import { combineReducers } from 'redux';
import { message } from "./MessageReducer";
import { books } from "./BooksReducer";

export const library = combineReducers({
    message,
    books,
    readingSession
});
