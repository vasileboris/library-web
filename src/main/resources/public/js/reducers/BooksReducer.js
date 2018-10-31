import { RECEIVE_BOOK } from 'actions/BookAction';

export function books(books = {}, action) {
    switch(action.type) {
        case RECEIVE_BOOK:
            return {
                ...books,
                [action.payload.uuid]: action.payload
            };
        default:
            return books;
    }
}
