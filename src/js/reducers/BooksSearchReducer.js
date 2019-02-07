import { RECEIVE_BOOKS_SEARCH_TEXT_ACTION } from 'actions/BooksSearchAction';

export function booksSearchText(booksSearchText = '', action) {
    switch(action.type) {
        case RECEIVE_BOOKS_SEARCH_TEXT_ACTION:
            return action.payload;
        default:
            return booksSearchText;
    }
}
