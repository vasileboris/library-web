import { BOOKS_ENDPOINT } from './BookApi';
import axios from 'axios';
import localizer from 'utils/Localizer';

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
            .catch(error => reject(localizer.localize('date-reading-sessions-retrieve-error', error.response.status)));
    });
}

export function createDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        axios.post(dateReadingSessionsEndpoint(bookUuid, uuid), dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(error.response? localizer.localize('date-reading-session-add-error', error.response.status): error));
    });
}

export function updateDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        axios.put(dateReadingSessionEndpoint(bookUuid, uuid, dateReadingSession.date), dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('date-reading-session-update-error', error.response.status)));
    });
}

export function deleteDateReadingSession(bookUuid, uuid, date) {
    return new Promise((resolve, reject) => {
        axios.delete(dateReadingSessionEndpoint(bookUuid, uuid, date))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('date-reading-session-delete-error', error.response.status)));
    });
}

export function validateDateReadingSession(dateReadingSession) {
    return new Promise((resolve, reject) => {
        let error = null;

        const dateRegexp = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateRegexp.test(dateReadingSession.date)) {
            error = localizer.localize('date-reading-session-date-validation');
        }

        const pagesRegexp = /^\d+$/;
        if(!pagesRegexp.test(dateReadingSession.lastReadPage) || dateReadingSession.lastReadPage < 1) {
            error = localizer.localize('date-reading-session-last-read-page-validation');
        }

        if(!error) {
            resolve();
        } else {
            reject(error);
        }
    });
}
