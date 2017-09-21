export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export function receiveMessageAction(message) {
    return {
        type: RECEIVE_MESSAGE,
        payload: message
    }
}
