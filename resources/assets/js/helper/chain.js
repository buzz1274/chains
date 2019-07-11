import Axios from './axios';

export default class Chain {

    chainsUpdated = false;

    constructor(chainsUpdated) {
        this.chainsUpdated = chainsUpdated;
        this.axios = new Axios();
    }

    hydrate(chain, partial) {
        let that = this;

        Object.keys(chain).forEach(function(key, index) {
            that[key] = chain[key];
        });
    }

    delete() {
        this.chain = 'DELETED THIS CHAIN';
        this.chainsUpdated;

        console.log("CALLING DELETE IN CHAIN CLASS");

        return true;
    }

}