import constants from '../constants/constants';

const { api_url } = constants;
export default class StripeService {
    static createCharge = (body) => {
        return fetch(`${api_url}/stripe`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}