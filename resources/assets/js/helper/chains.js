import Axios from './axios';
import Chain from './chain';
import Store from './store';

export default class Chains {

    axios = false;
    chains = [];
    outstanding = [];

    constructor() {
        this.axios = new Axios();
        this.chains = [];
        this.outstanding = [];

        this.chainsUpdated = () => {Store.updateState({chains: this})};
        this.chainsUpdated.bind(this);
    }

    count() {
        let count = 0;

        this.chains.forEach(function(chain) {
           if(chain.active) {
               count++;
           }
        });

        return count;

    }

    getOutstanding() {
        let that = this;

        this.axios.get('/chains/outstanding').then(function(response) {
            response.data.forEach(function(outstanding) {
                that.outstanding[outstanding.id] = outstanding;
            });
            that.chainsUpdated();
        });

    }

    get() {
        let that = this;

        this.axios.get('/chains').then(function(response) {
            response.data.forEach(function(data) {
                let chain = new Chain(that.chainsUpdated);

                chain.hydrate(data);
                that.chains[data.id] = chain;

            });
            that.chainsUpdated();
        });
    }
}