import { readingSessions } from 'reducers/ReadingSessionsReducer';
import { combineReducers } from 'redux';
import { message } from './MessageReducer';
import { operation } from './BookOperationReducer';
import { books } from './BooksReducer';
import { book } from './BookReducer';
import { booksSearchText } from './BooksSearchReducer';

export const library = combineReducers({
    message,
    operation,
    book,
    booksSearchText,
    books,
    readingSessions
});
