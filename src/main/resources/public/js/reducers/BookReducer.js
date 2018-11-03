import {
    CHANGE_BOOK,
    RESET_BOOK
} from 'actions/BookAction';

export function book(book = {}, action) {
    switch(action.type) {
        case CHANGE_BOOK:
            return {
                ...book,
                ...action.payload
            };
        case RESET_BOOK:
            return action.payload;
        default:
            return book;
    }
}
