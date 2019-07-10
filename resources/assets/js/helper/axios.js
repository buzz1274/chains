import axios from 'axios';
import React from "react";

export default class Axios {

    instance = false;

    constructor() {
        this.instance = axios.create({
            baseURL: this.url(),
            timeout: 5000,
            headers: {}
        });

        this.addResponseInterceptor();

        return this.instance;

    }

    url() {
        return window.location.protocol + '//' +
               window.location.hostname + '/api/';
    }

    addResponseInterceptor() {
        this.instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            window.location.href = '/error';
        });
    }

}