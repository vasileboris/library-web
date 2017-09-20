import {
    RECEIVE_MESSAGE,
    RECEIVE_BOOK,
    RECEIVE_READING_SESSION_PROGRESS,
    CREATE_DATE_READING_SESSION
} from 'actions/index';
import { combineReducers } from 'redux';

const initialState = {
    message: null,
    book: null,
    currentReadingSession: null,
    readingSessionProgress: null
};

function message(message = initialState.message, action) {
    switch(action.type) {
        case RECEIVE_MESSAGE:
            return action.payload;
        default:
            return message;
    }
}

function book(book = initialState.book, action) {
    switch(action.type) {
        case RECEIVE_BOOK:
            return action.payload;
        default:
            return book;
    }
}

function currentReadingSession(currentReadingSession = initialState.currentReadingSession, action) {
    switch(action.type) {
        case CREATE_DATE_READING_SESSION:
            return Object.assign({}, currentReadingSession, {
                dateReadingSessions: [...currentReadingSession.dateReadingSessions, action.payload]
            });
        default:
            return currentReadingSession;
    }
}

function readingSessionProgress(readingSessionProgress = initialState.readingSessionProgress, action) {
    switch(action.type) {
        case RECEIVE_READING_SESSION_PROGRESS:
            return action.payload;
        default:
            return readingSessionProgress;
    }
}

const library = combineReducers({
    message,
    book,
    currentReadingSession,
    readingSessionProgress
});

export default library;