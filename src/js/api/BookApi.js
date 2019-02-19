import axios from 'axios';
import user from 'User';
import localizer from 'utils/Localizer';
import {
    getReason
} from 'utils/Error';
import {
    sanitize,
    sanitizeArray,
    sanitizeNumber
} from 'validation/Sanitizer';
import {
    isRequired,
    isPositiveNumber
} from 'validation/Rule';
import validate from 'validation/Validator';

export const BOOKS_ENDPOINT = `/users/${user.id}/books`;

export function fetchBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.get(bookEndpoint(uuid))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-retrieve-error', getReason(error))))
    });
}

export function fetchBooks(searchText) {
    return new Promise((resolve, reject) => {
        axios.get(searchEndpoint(searchText))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('books-search-error', getReason(error))))
    });
}

export function deleteBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.delete(bookEndpoint(uuid))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-delete-error', getReason(error))));
    });
}

export function addBook(book) {
    return new Promise((resolve, reject) => {
        axios.post(BOOKS_ENDPOINT, book)
            .then(response => resolve(response))
            .catch(error => reject(addBookErrorMessage(error)))
    });
}

export function updateBook(book) {
    return new Promise((resolve, reject) => {
        axios.put(bookEndpoint(book.uuid), book)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-update-error', getReason(error))))
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

export function validateBook(book) {
    return new Promise((resolve, reject) => {
        let message = validate(book.title, [isRequired]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('book-title-text')));
        }

        message = validate(book.authors, [isRequired]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('book-authors-text')));
        }

        message = validate(book.pages, [isRequired, isPositiveNumber]);
        if(message) {
            reject(localizer.localize(message, localizer.localize('book-pages-text')));
        }

        resolve();
    });
}

export function sanitizeBook(book) {
    const { isbn10, isbn13, title, authors, image, pages } = book;
    const sanitizedBook = {
        ...book,
        isbn10: sanitize(isbn10),
        isbn13: sanitize(isbn13),
        title: sanitize(title),
        authors: sanitizeArray(authors),
        image: sanitize(image),
        pages: sanitizeNumber(pages)
    };
    return sanitizedBook;
}

function addBookErrorMessage(error) {
    const reason = getReason(error);
    switch (reason) {
        case 403:
            return localizer.localize('book-isbn-already-exists-error');
        default:
            return localizer.localize('book-server-error');
    }
}