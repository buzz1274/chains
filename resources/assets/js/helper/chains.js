import Axios from './axios';
import Chain from './chain';

export default class Chains {

    axios = false;
    updateState = false;
    chains = [];
    totalChains = 0;

    constructor(updateState) {
        this.chainsUpdated = this.chainsUpdated.bind(this);
        this.modalUpdated = this.modalUpdated.bind(this);

        this.axios = new Axios(updateState);
        this.updateState = updateState;
        this.chains = [];
    }

    chainsUpdated() {
        this.count();
        this.updateState({chains: this});
    }

    modalUpdated(modal_class, modal_type, modal_action = false) {
        this.updateState({modalOptions:
                {modal_class: modal_class,
                 modal_type: modal_type,
                 modal_action: modal_action}})
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
            response.data.forEach(function(data) {
                let chain = new Chain(that);

                chain.hydrate(data);
                that.chains[data.id] = chain;
            });
            that.chainsUpdated();
        });
    }
}