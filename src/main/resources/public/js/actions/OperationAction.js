export const CHANGE_OPERATION = 'CHANGE_OPERATION';

export function changeOperationAction(operation) {
    return {
        type: CHANGE_OPERATION,
        payload: operation
    }
}
