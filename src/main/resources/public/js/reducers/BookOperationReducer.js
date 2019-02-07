import { CHANGE_BOOK_OPERATION } from 'actions/OperationAction';

export function operation(operation = 'search', action) {
    switch(action.type) {
        case CHANGE_BOOK_OPERATION:
            return action.payload;
        default:
            return operation;
    }
}
