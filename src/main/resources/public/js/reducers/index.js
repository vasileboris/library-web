import {
    CREATE_DATE_READING_SESSION
} from 'actions/index';
import { combineReducers } from 'redux';

const initialState = {
    message: '',
    book: {
        uuid: 'c168f17a-3a7c-4edc-9551-57cfc64f732b',
        isbn10: 'isbn10',
        isbn13: '',
        title: 'title',
        authors: [
            'author'
        ],
        image: '',
        pages: 100
    },
    currentReadingSession: {
        uuid: '8ccea870-6264-44ab-ba63-26ff14284651',
        bookUuid: 'c168f17a-3a7c-4edc-9551-57cfc64f732b',
        deadline: null,
        dateReadingSessions: []
    },
    readingSessionProgress: {
        lastReadPage: 1,
        pagesTotal: 100,
        readPercentage: 1,
        averagePagesPerDay: 1,
        estimatedReadDaysLeft: 99,
        estimatedDaysLeft: 99,
        estimatedFinishDate: '2017-12-26',
        deadline: null
    }
};

function message(message = initialState.message, action) {
    return message;
}

function book(book = initialState.book, action) {
    return book;
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
    return readingSessionProgress;
}

const library = combineReducers({
    message,
    book,
    currentReadingSession,
    readingSessionProgress
});

export default library;