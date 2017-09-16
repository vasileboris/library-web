import axios from 'axios';
import user from 'User';

export const BOOKS_ENDPOINT = `/users/${user.id}/books`;

export function fetchBook(uuid) {
    return new Promise((resolve, reject) => {
        axios.get(`${BOOKS_ENDPOINT}/${uuid}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}
