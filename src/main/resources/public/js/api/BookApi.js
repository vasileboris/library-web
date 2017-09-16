import axios from 'axios';
import user from 'User';

const BOOKS_ENDPOINT = `/users/${user.id}/books`;

export function fetchBook(uuid) {
    return axios.get(`${BOOKS_ENDPOINT}/${uuid}`);
}
