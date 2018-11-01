import { readingSessions } from 'reducers/ReadingSessionsReducer';
import { combineReducers } from 'redux';
import { message } from "./MessageReducer";
import { books } from "./BooksReducer";
import { booksSearchText } from "./BooksSearchReducer";

export const library = combineReducers({
    message,
    booksSearchText,
    books,
    readingSessions
});
