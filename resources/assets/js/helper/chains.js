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

        this.chainsUpdated = () => {
            State.updateState({chains: this});
        };

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
        let that = this;

        this.axios.post('/chains/outstanding/' + id +
            '/' + status).then(function() {

            that.outstanding[id].completed = true;

            if(status == 'yes') {
                that.chains[that.outstanding[id].id].current_streak++;

                if(that.chains[that.outstanding[id].id].current_streak >=
                   that.chains[that.outstanding[id].id].max_streak) {

                    that.chains[that.outstanding[id].id].max_streak =
                        that.chains[that.outstanding[id].id].current_streak;
                }

            } else {
                that.chains[that.outstanding[id].id].current_streak = 0;
            }

            that.chainsUpdated();

            State.updateModal(
                'alert_success',
                'outstanding_chain_confirmed_success'
            );
        }).catch(function() {
            State.updateModal(
                'alert_danger',
                'outstanding_chain_confirmed_failure'
            );
        });
    }

    get() {
        let that = this;

        this.axios.get('/chains').then(function(response) {
            let count = 0;
            response.data.forEach(function(data) {
                let chain = new Chain(that.chainsUpdated);

                chain.hydrate(data);
                that.chains[count] = chain;
                count++;

            });
            that.chainsUpdated();
        });
    }
}