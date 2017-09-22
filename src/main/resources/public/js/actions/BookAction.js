import { fetchBook } from 'api/BookApi';
import { receiveMessageAction } from 'actions/MessageAction';

export const RECEIVE_BOOK = 'RECEIVE_BOOK';

export function fetchBookAction(uuid) {
    return function (dispatch) {
        fetchBook(uuid)
            .then(response => dispatch(receiveBookAction(response.data)))
            .catch(error => dispatch(receiveMessageAction(error)));
    }
}

export function receiveBookAction(book) {
    return {
        type: RECEIVE_BOOK,
        payload: book
    }
}
