export default class Chain {

    id = false;
    active = false;
    chain = false;

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

    delete (confirmed) {
        if(!confirmed) {
            this.chains.modalUpdated(
                'confirmation',
                'delete_chain',
                () => this.delete(true)
            );
        } else {
            let that = this;

            that.active = false;
            that.chains.chainsUpdated();

            this.chains.axios.post('/chain/' + this.id + '/delete').then(function() {
                that.chains.modalUpdated(
                    'alert_success',
                    'delete_chain_success'
                );

                that.active = false;
                that.chains.chainsUpdated();

            }).catch(function() {
                that.chains.modalUpdated(
                    'alert_danger',
                    'delete_chain_failure'
                );
            });
        }
    }
}