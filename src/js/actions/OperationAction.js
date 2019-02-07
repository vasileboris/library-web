export const CHANGE_DATE_READING_SESSION_OPERATION = 'CHANGE_DATE_READING_SESSION_OPERATION';
export const CHANGE_BOOK_OPERATION = 'CHANGE_BOOK_OPERATION';

export function changeDateReadingSessionOperationAction(operation) {
    return {
        type: CHANGE_DATE_READING_SESSION_OPERATION,
        payload: operation
    }
}

export function changeBookOperationAction(operation) {
    return {
        type: CHANGE_BOOK_OPERATION,
        payload: operation
    }
}
