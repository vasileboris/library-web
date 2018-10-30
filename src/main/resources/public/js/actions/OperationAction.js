export const CHANGE_DATE_READING_SESSION_OPERATION = 'CHANGE_DATE_READING_SESSION_OPERATION';

export function changeDateReadingSessionOperationAction(operation) {
    return {
        type: CHANGE_DATE_READING_SESSION_OPERATION,
        payload: operation
    }
}
