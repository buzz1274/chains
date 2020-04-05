import Axios from './axios';
import Chain from './chain';
import State from './store';
import Points from './points';

export default class Chains {

    axios = false;
    chains = [];
    outstanding = [];
    auth = null;
    points = false;

    constructor() {
        this.axios = new Axios();
        this.chains = [];
        this.outstanding = [];
        this.points = new Points();
    }

    chainsUpdated() {
        this.points.get();

        State.updateState({
            chains: this,
        });
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

    extractChain(id) {
        for(const [idx, chain] of Object.entries(this.chains)) {
            if (chain.id == id) {
                return chain;
            }
        }
        return null;
    }

    outstandingComplete(id, status) {
        let that = this;

        this.axios.post('/chains/outstanding/' + id +
            '/' + status).then(function() {

            that.outstanding[id].completed = true;

            let key = null;

            for(const [idx, chain] of Object.entries(that.chains)) {
                if (chain.id === that.outstanding[id].id) {
                    key = idx;
                }
            }

            if(key !== null) {
                if(status === 'yes') {
                    that.chains[key].current_streak++;

                    if (that.chains[key].current_streak >=
                        that.chains[key].max_streak) {

                        that.chains[key].max_streak =
                            that.chains[key].current_streak;
                    }

                } else {
                    that.chains[key].current_streak = 0;
                }
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