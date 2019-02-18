import { BOOKS_ENDPOINT } from './BookApi';
import axios from 'axios';
import localizer from 'utils/Localizer';
import {
    getReason
} from 'utils/Error';
import {
    sanitize,
    sanitizeNumber
} from 'validation/Sanitizer';
import {
    isRequired,
    isPositiveNumber,
    isDate
} from 'validation/Rule';
import validate from 'validation/Validator';

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
            .catch(error => reject(localizer.localize('date-reading-sessions-retrieve-error', getReason(error))));
    });
}

export function createDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        axios.post(dateReadingSessionsEndpoint(bookUuid, uuid), dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('date-reading-session-add-error', getReason(error))));
    });
}

export function updateDateReadingSession(bookUuid, uuid, dateReadingSession) {
    return new Promise((resolve, reject) => {
        axios.put(dateReadingSessionEndpoint(bookUuid, uuid, dateReadingSession.date), dateReadingSession)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('date-reading-session-update-error', getReason(error))));
    });
}

export function deleteDateReadingSession(bookUuid, uuid, date) {
    return new Promise((resolve, reject) => {
        axios.delete(dateReadingSessionEndpoint(bookUuid, uuid, date))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('date-reading-session-delete-error', getReason(error))));
    });
}

export function validateDateReadingSession(dateReadingSession) {
    return new Promise((resolve, reject) => {
        let message = validate(dateReadingSession.date, [isRequired, isDate]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('date-reading-session-date-text')));
        }

        message = validate(dateReadingSession.lastReadPage, [isRequired, isPositiveNumber]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('date-reading-session-last-read-page-text')));
        }

        resolve();
    });
}

export function sanitizeDateReadingSession(dateReadingSession) {
    const { date, lastReadPage, bookmark } = dateReadingSession;
    const sanitizedDateReadingSession = {
        ...dateReadingSession,
        date: sanitize(date),
        lastReadPage: sanitizeNumber(lastReadPage),
        bookmark: sanitize(bookmark)
    };
    return sanitizedDateReadingSession;
}