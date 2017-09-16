import axios from 'axios';
import user from 'User';
import localizer from 'utils/Localizer';

export const BOOKS_ENDPOINT = `/users/${user.id}/books`;

export function fetchBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.get(`${BOOKS_ENDPOINT}/${uuid}`)
            .then(response => resolve(response))
            .catch(error => reject(localizer.localize('book-retrieve-error', error.response.status)))
    });
}
