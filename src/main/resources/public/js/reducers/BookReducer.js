import { RECEIVE_BOOK } from 'actions/BookAction';

export function book(book = null, action) {
    switch(action.type) {
        case RECEIVE_BOOK:
            return action.payload;
        default:
            return book;
    }
}
