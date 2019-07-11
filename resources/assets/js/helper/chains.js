import Axios from './axios';
import Chain from './chain';

export default class Chains {

    constructor(updateState) {
        this.chainsUpdated = this.chainsUpdated.bind(this);
        this.delete = this.delete.bind(this);

        this.axios = new Axios(updateState);
        this.updateState = updateState;
        this.chains = [];
    }

    chainsUpdated() {
        this.updateState({chains: this});
    }

    modalUpdated(modal_class, modal_type, modal_action = false) {
        this.updateState({modalOptions:
                {modal_class: modal_class,
                 modal_type: modal_type,
                 modal_action: modal_action}})
    }

    get() {
        let that = this;

        this.axios.get('/chains').then(function(response) {
            response.data.forEach(function(data, index) {
                let chain = new Chain(that.chainsUpdated);

                chain.hydrate(data);
                that.chains[data.id] = chain;
            });
            that.chainsUpdated();
        });
    }

    delete(chain_id, confirmed) {
        if(!confirmed) {
            this.modalUpdated(
                'confirmation',
                'delete_chain',
                () => this.delete(chain_id, true)
            );
        } else {
            if(this.chains[chain_id].delete()) {
                this.modalUpdated(
                    'alert_success',
                    'delete_chain_success'
                );
            } else {
                this.modalUpdated(
                    'alert_danger',
                    'delete_chain_failure'
                );
            }
        }

        this.get();

    }

}