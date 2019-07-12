import axios from 'axios';
import State from './state';

export default class Axios {

    instance = false;

    constructor() {
        this.instance = axios.create({
            baseURL: this.url(),
            timeout: 5000,
            headers: {}
        });

        this.addRequestInterceptor();
        this.addResponseInterceptor();

        return this.instance;

    }

    url() {
        return window.location.protocol + '//' +
               window.location.hostname + '/api/';
    }

    addRequestInterceptor() {
        this.instance.interceptors.request.use(function(config) {
            State.updateState({displayOverlay: true});

            return config;
        }, function(error) {
            State.updateState({displayOverlay: false});

            return Promise.reject(error);
        });
    }

    addResponseInterceptor() {
        this.instance.interceptors.response.use(function(response) {
            State.updateState({displayOverlay: false});

            return response;
        }, function (error) {
            State.updateState({displayOverlay: false});

            throw Promise.reject(error);
        });
    }

}