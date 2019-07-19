import Axios from './axios';
import State from './store';

export default class Chain {

    id = false;

    active = false;

    chain = false;

    frequency = false;

    last_completed = false;

    current_streak = 0;

    max_streak = 0;

    outstanding = [];

    axios = false;

    chainsUpdated = false;

    constructor(chainsUpdated) {
        this.delete = this.delete.bind(this);
        this.chainsUpdated = chainsUpdated;
        this.axios = new Axios();
    }

    hydrate(chain) {
        let that = this;

        Object.keys(chain).forEach(function(key) {
            that[key] = chain[key];
        });
    }

    delete(confirmed) {
        if(!confirmed) {
            State.updateModal(
                'confirmation',
                'delete_chain',
                () => this.delete(true)
            );
        } else {
            let that = this;

            that.active = false;
            that.chainsUpdated();

            this.axios.post('/chain/' + this.id + '/delete').then(function() {
                State.updateModal(
                    'alert_success',
                    'delete_chain_success'
                );
            }).catch(function() {
                State.updateModal(
                    'alert_danger',
                    'delete_chain_failure'
                );
            });
        }
    }
}