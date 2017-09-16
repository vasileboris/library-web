import { BOOKS_ENDPOINT } from './BookApi';
import axios from 'axios';
import localizer from 'utils/Localizer';

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
                if(404 === error.response.status) {
                    axios.post(readingSessionsEndpoint(bookUuid), { bookUuid })
                        .then(response => resolve(response))
                        .catch(error => reject(localizer.localize('reading-session-retrieve-error', error.response.status)));
                } else {
                    reject(localizer.localize('reading-session-retrieve-error', error.response.status))
                }
            });
    });
}
