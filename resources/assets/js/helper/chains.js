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

    modalUpdated(type, action) {
        this.updateState({modalOptions:
                {type: type,
                 action: action}})
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
                'delete_chain',
                () => this.delete(chain_id, true));
        } else {
            this.chains[chain_id].delete();
        }

        this.get();

    }

}