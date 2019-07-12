import State from './state';

export default class Chain {

    id = false;
    active = false;
    chain = false;
    frequency = false;

    chains = false;

    constructor(chains) {
        this.chains = chains;
        this.delete = this.delete.bind(this);
    }

    hydrate(chain) {
        let that = this;

        Object.keys(chain).forEach(function(key) {
            that[key] = chain[key];
        });
    }

    add() {

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

            this.chains.axios.post('/chain/' + this.id + '/delete').then(function() {
                State.updateModal(
                    'alert_success',
                    'delete_chain_success'
                );

                that.active = false;
                that.chains.chainsUpdated();

            }).catch(function() {
                State.updateModal(
                    'alert_danger',
                    'delete_chain_failure'
                );
            });
        }
    }
}