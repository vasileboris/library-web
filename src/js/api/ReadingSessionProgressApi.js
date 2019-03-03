import { BOOKS_ENDPOINT } from './BookApi';
import axios from 'axios';
import {getReason} from "../utils/Error";
import localizer from "../utils/Localizer";

function readingSessionProgressEndpoint(bookUuid, uuid) {
    return `${BOOKS_ENDPOINT}/${bookUuid}/reading-sessions/${uuid}/progress`;
}

export function fetchReadingSessionProgress(bookUuid, uuid) {
    return new Promise((resolve, reject) => {
        axios.get(readingSessionProgressEndpoint(bookUuid, uuid))
            .then(response => resolve(response))
            .catch(error => reject(fetchReadingSessionProgressMessage(error)))
    });
}

function fetchReadingSessionProgressMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 404:
            return null;
        default:
            return localizer.localize('current-reading-session-retrieve-error');
    }
}