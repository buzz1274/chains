import Axios from './axios';
import State from './store';

export default class Auth {
    axios = false;

    constructor() {
        this.axios = new Axios();

        this.name = false;
        this.userID = false;
        this.authenticated = false;
    }

    register(userDetails) {
        this.axios.post('user/register', {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            repeat_password: userDetails.repeat_password
        }).then(function() {
            //redirect to succesfull registration page//
        }).catch(function(e) {
            //if not a 500 error
                //display form errors
            //else redirect to 500 page
        });
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