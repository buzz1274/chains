import axios from 'axios';

export default class Axios {

    constructor() {
        return axios.create({
            baseURL: this.url(),
            timeout: 5000,
            headers: {}
        });
    }

    url() {
        return window.location.protocol + '//' +
               window.location.hostname + '/api/';
    }

}