import Axios from './axios';
import Chain from './chain';
import State from './state';

export default class Chains {

    axios = false;
    chains = [];
    totalChains = 0;

    constructor() {
        this.axios = new Axios();
        this.chains = [];
    }

    count() {
        let that = this;
        that.totalChains = 0;

        this.chains.map((chain) => {
            if(chain.active) {
                that.totalChains++;
            }
        })
    }

    get() {
        let that = this;

        this.axios.get('/chains').then(function(response) {
            that.totalChains = 0;

            response.data.forEach(function(data) {
                let chain = new Chain(that);

                chain.hydrate(data);
                that.chains[data.id] = chain;

                if(chain.active) {
                    that.totalChains++;
                }

            });
            State.updateState({chains: that});
        });
    }
}