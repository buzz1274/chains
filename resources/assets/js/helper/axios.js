import axios from 'axios';

export default class Axios {

    instance = false;
    updateState = false;

    constructor(updateState) {
        this.instance = axios.create({
            baseURL: this.url(),
            timeout: 5000,
            headers: {}
        });

        this.updateState = updateState;

        this.addRequestInterceptor();
        this.addResponseInterceptor();

        return this.instance;

    }

    url() {
        return window.location.protocol + '//' +
               window.location.hostname + '/api/';
    }

    addRequestInterceptor() {
        let that = this;

        this.instance.interceptors.request.use(function(config) {
            that.updateState({displayOverlay: true});

            return config;
        }, function() {
            that.updateState({displayOverlay: false});

            window.location.href = '/error';
        });
    }

    addResponseInterceptor() {
        let that = this;

        this.instance.interceptors.response.use(function(response) {
            that.updateState({displayOverlay: false});

            return response;
        }, function () {
            that.updateState({displayOverlay: false});

            window.location.href = '/error';
        });
    }

}