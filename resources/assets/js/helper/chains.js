import Axios from './axios';
import Chain from './chain';
import State from './store';

export default class Chains {

    axios = false;
    chains = [];
    outstanding = [];

    constructor() {
        this.axios = new Axios();
        this.chains = [];
        this.outstanding = [];

        this.chainsUpdated = () => {State.updateState({chains: this})};
        this.chainsUpdated.bind(this);
    }

    count(type = 'chains') {
        let count = 0;

        if(type == 'chains') {
            this.chains.forEach(function (chain) {
                if (chain.active) {
                    count++;
                }
            });
        } else if(type == 'outstanding') {
            this.outstanding.forEach(function (outstanding) {
                if (outstanding.completed == null) {
                    count++;
                }
            });
        }

        return count;
    }

    getOutstanding() {
        let that = this;

        this.axios.get('/chains/outstanding').then(function(response) {
            response.data.forEach(function(data) {
                that.outstanding[data.chain_completion_id] = data;
            });
            that.chainsUpdated();
        });

    }

    outstandingComplete(id, status) {
        if(status == 'complete') {
            this.outstanding[id].completed = true;
            this.chains[this.outstanding[id].id].current_streak++;

            State.updateModal(
                'alert_success',
                'delete_chain_success'
            );

        } else {
            this.outstanding[id].completed = false;
            this.chains[this.outstanding[id].id].current_streak = 0;
        }

        //this.chainsUpdated();
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