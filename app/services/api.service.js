import { api_url } from '../constants/constants';

export default class RequestService {
    static get = (path) => {
        return fetch(`${api_url}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    static post = (path, body = {}) => {
        return fetch(`${api_url}/${path}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    static put = (path, body = {}) => {
        return fetch(`${api_url}/${path}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}