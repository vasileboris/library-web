export const RECEIVE_BOOKS_SEARCH_TEXT_ACTION = 'RECEIVE_BOOKS_SEARCH_TEXT_ACTION';

export function receiveBooksSearchTextAction(booksSearchText) {
    return {
        type: RECEIVE_BOOKS_SEARCH_TEXT_ACTION,
        payload: booksSearchText
    }
}
