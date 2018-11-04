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

export function addBook(book) {
    return new Promise((resolve, reject) => {
        axios.post(BOOKS_ENDPOINT, book)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-add-error', error.response.status)))
    });
}

export function updateBook(book) {
    return new Promise((resolve, reject) => {
        axios.put(bookEndpoint(book.uuid), book)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-update-error', error.response.status)))
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
        isbn10: sanitizeString(isbn10),
        isbn13: sanitizeString(isbn13),
        title: sanitizeString(title),
        authors: sanitizeStringArray(authors),
        image: sanitizeString(image),
        pages: sanitizeNumber(pages)
    };
    return sanitizedBook;
}

function sanitizeString(value) {
    if(!value) {
        return '';
    }

    if('string' === typeof value) {
        return value.trim();
    }

    return '';
}

function sanitizeStringArray(value) {
    if(!value) {
        return [];
    }

    if(Array.isArray(value)) {
        return value
            .map(v => sanitizeString(v))
            .filter(v => v);
    }

    return [];
}

function sanitizeNumber(value) {
    if(!value) {
        return '';
    }

    if('number' === typeof value) {
        return value;
    }

    if('string' === typeof value) {
        return value.trim();
    }

    return '';
}