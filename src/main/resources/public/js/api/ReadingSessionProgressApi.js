import { BOOKS_ENDPOINT } from './BookApi';
import axios from 'axios';

function readingSessionProgressEndpoint(bookUuid, uuid) {
    return `${BOOKS_ENDPOINT}/${bookUuid}/reading-sessions/${uuid}/progress`;
}

export function fetchCurrentReadingSessionProgress(bookUuid, uuid) {
    return new Promise((resolve, reject) => {
        axios.get(readingSessionProgressEndpoint(bookUuid, uuid))
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}
