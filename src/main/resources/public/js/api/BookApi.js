import axios from 'axios';
import user from 'User';
import localizer from 'utils/Localizer';

export const BOOKS_ENDPOINT = `/users/${user.id}/books`;

export function fetchBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.get(bookEndpoint(uuid))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-retrieve-error', error.response.status)))
    });
}

export function fetchBooks(searchText) {
    return new Promise((resolve, reject) => {
        axios.get(searchEndpoint(searchText))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('books-search-error', error.response.status)))
    });
}

export function deleteBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.delete(bookEndpoint(uuid))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-delete-error', error.response.status)));
    });
}

const bookEndpoint = uuid => `${BOOKS_ENDPOINT}/${uuid}`;

function searchEndpoint(searchText) {
    let endpoint = BOOKS_ENDPOINT;
    if (searchText) {
        endpoint = `${endpoint}?searchText=${searchText}`;
    }
    return endpoint;
}