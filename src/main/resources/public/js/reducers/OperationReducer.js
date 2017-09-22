import { CHANGE_OPERATION } from 'actions/OperationAction';

export function operation(operation = 'add', action) {
    switch(action.type) {
        case CHANGE_OPERATION:
            return action.payload;
        default:
            return operation;
    }
}
