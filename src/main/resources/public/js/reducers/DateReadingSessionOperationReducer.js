import { CHANGE_DATE_READING_SESSION_OPERATION } from 'actions/OperationAction';

export function operation(operation = 'add', action) {
    switch(action.type) {
        case CHANGE_DATE_READING_SESSION_OPERATION:
            return action.payload;
        default:
            return operation;
    }
}
