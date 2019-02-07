import {
    RECEIVE_BOOK,
    RECEIVE_BOOKS
} from 'actions/BookAction';

export function books(books = {}, action) {
    switch(action.type) {
        case RECEIVE_BOOK:
            return {
                ...books,
                [action.payload.uuid]: action.payload
            };
        case RECEIVE_BOOKS:
            return action.payload.reduce(
                (books, book) => ({
                    ...books,
                    [book.uuid]: book
                }),
                {});
        default:
            return books;
    }
}
