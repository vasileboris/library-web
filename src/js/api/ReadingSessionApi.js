import { BOOKS_ENDPOINT } from './BookApi';
import axios from 'axios';
import localizer from 'utils/Localizer';
import {
    getReason
} from 'utils/Error';

function readingSessionsEndpoint(bookUuid) {
    return `${BOOKS_ENDPOINT}/${bookUuid}/reading-sessions`;
}

function currentReadingSessionEndpoint(bookUuid) {
    return `${BOOKS_ENDPOINT}/${bookUuid}/current-reading-session`;
}

export function fetchCurrentReadingSession(bookUuid) {
    return new Promise((resolve, reject) => {
        axios.get(currentReadingSessionEndpoint(bookUuid))
            .then(response => resolve(response))
            .catch(error => {
                if(404 === getReason(error)) {
                    axios.post(readingSessionsEndpoint(bookUuid), { bookUuid })
                        .then(response => resolve(response))
                        .catch(error => reject(fetchCurrentReadingSessionMessage(error)))
                } else {
                    reject(fetchCurrentReadingSessionMessage(error));
                }
            });
    });
}

function fetchCurrentReadingSessionMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 404:
            return localizer.localize('current-reading-session-not-found-error');
        default:
            return localizer.localize('current-reading-session-retrieve-error');
    }
}