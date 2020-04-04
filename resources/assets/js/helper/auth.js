import Axios from './axios';
import State from "./store";

export default class Auth {
    axios = false;

    registrationSuccesful = false;

    constructor() {
        this.axios = new Axios();

        this.name = false;
        this.userID = false;
        this.authenticated = false;
        this.current_points = null;
    }

    isAuthenticated() {
        return this.authenticated;
    }

    login() {
        this.name = 'David';
        this.userID = 1;
        this.authenticated = true;

        return this;
    }

    logout() {
        this.name = false;
        this.userID = false;
        this.authenticated = false;

        return this;
    }

}