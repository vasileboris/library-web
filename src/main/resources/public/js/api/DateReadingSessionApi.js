import { BOOKS_ENDPOINT } from './BookApi';
import axios from 'axios';

function dateReadingSessionsEndpoint(bookUuid, uuid) {
    return `${BOOKS_ENDPOINT}/${bookUuid}/reading-sessions/${uuid}/date-reading-sessions`;
}

function dateReadingSessionEndpoint(bookUuid, uuid, date) {
    return `${dateReadingSessionsEndpoint(bookUuid, uuid)}/${date}`;
}

export function fetchDateReadingSessions(bookUuid, uuid) {
    return new Promise((resolve, reject) => {
        axios.get(dateReadingSessionsEndpoint(bookUuid, uuid))
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function createDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        axios.post(dateReadingSessionsEndpoint(bookUuid, uuid), dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function updateDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        axios.put(dateReadingSessionEndpoint(bookUuid, uuid, dateReadingSession.date), dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function deleteDateReadingSession(bookUuid, uuid, date) {
    return new Promise((resolve, reject) => {
        axios.delete(dateReadingSessionEndpoint(bookUuid, uuid, date))
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}
