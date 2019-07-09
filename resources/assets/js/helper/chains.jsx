import Axios from './axios';

export default class Chains {

    constructor(updateState) {
        this.axios = new Axios();
        this.updateState = updateState;
        this.chains = [];
    }

    get() {
        let that = this;

        this.axios.get('/chains').then(function(response) {
           that.chains = response.data;
           that.updateState({chains: that});
        });
    }

}