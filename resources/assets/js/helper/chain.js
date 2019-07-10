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

}