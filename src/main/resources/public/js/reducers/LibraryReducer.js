import { readingSessions } from 'reducers/ReadingSessionsReducer';
import { combineReducers } from 'redux';
import { message } from "./MessageReducer";
import { books } from "./BooksReducer";

export const library = combineReducers({
    message,
    books,
    readingSessions
});
