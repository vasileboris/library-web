import { RECEIVE_MESSAGE } from 'actions/MessageAction';

export function message(message = null, action) {
    switch(action.type) {
        case RECEIVE_MESSAGE:
            return action.payload;
        default:
            return message;
    }
}
