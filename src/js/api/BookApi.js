import axios from 'axios';
import user from 'User';
import localizer from 'utils/Localizer';
import Error from 'utils/Error';
import {
    sanitize,
    sanitizeArray,
    sanitizeNumber
} from 'validation/Sanitizer';

export const BOOKS_ENDPOINT = `/users/${user.id}/books`;

export function fetchBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.get(bookEndpoint(uuid))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-retrieve-error', Error.getReason(error))))
    });
}

export function fetchBooks(searchText) {
    return new Promise((resolve, reject) => {
        axios.get(searchEndpoint(searchText))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('books-search-error', Error.getReason(error))))
    });
}

export function deleteBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.delete(bookEndpoint(uuid))
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-delete-error', Error.getReason(error))));
    });
}

export function addBook(book) {
    return new Promise((resolve, reject) => {
        axios.post(BOOKS_ENDPOINT, book)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-add-error', Error.getReason(error))))
    });
}

export function updateBook(book) {
    return new Promise((resolve, reject) => {
        axios.put(bookEndpoint(book.uuid), book)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-update-error', Error.getReason(error))))
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
        if(!book.isbn10 && !book.isbn13) {
            reject(localizer.localize('book-isbn-validation'));
        }

        if(!book.title) {
            reject(localizer.localize('book-title-validation'));
        }

        if(!book.authors || 0 === book.authors.length) {
            reject(localizer.localize('book-authors-validation'));
        }

        const pagesRegexp = /^\d+$/;
        if(!book || !pagesRegexp.test(book.pages) || book.pages < 1) {
            reject(localizer.localize('book-pages-validation'));
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