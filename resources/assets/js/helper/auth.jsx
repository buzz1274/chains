export default class Auth {

    constructor() {
        this.name = false;
        this.userID = false;
        this.authenticated = false;
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