import Axios from './axios';
import Chain from './chain';

export default class Chains {

    constructor(updateState) {
        this.chainsUpdated = this.chainsUpdated.bind(this);
        this.axios = new Axios();
        this.updateState = updateState;
        this.chains = [];
    }

    chainsUpdated() {
        this.updateState({chains: this});
    }

    get() {
        let that = this;

        this.axios.get('/chains').then(function(response) {
            response.data.forEach(function(data, index) {
                let chain = new Chain(that.chainsUpdated);

                chain.hydrate(data);
                that.chains[index] = chain;
            });
            that.chainsUpdated();
        });
    }

}