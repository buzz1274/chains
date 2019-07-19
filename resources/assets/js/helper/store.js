import React from "react";
import Auth from "./auth";
import Chains from "./chains";
import {createBrowserHistory} from "history";

class Store extends React.Component {
    static instance = false;

    state = false;
    updateState = false;

    constructor(props) {
        super(props);

        if(typeof Store.instance === 'object') {
            return Store.instance;
        }

        this.state = {
            history: createBrowserHistory(),
            destroyState: this.destroyState.bind(this),
            updateModal: this.updateModal.bind(this)
        };

        Store.instance = this;

    }

    instantiateState(updateState = false) {
        if(updateState) {
            this.updateState = updateState;
        }

        this.state.auth = new Auth();
        this.state.chains = new Chains();
        this.state.displayOverlay = false;
        this.state.updateState = this.updateState;
        this.state.modalOptions = {
            modal_class: false,
            modal_type: false,
            modal_action: false
        }
    }

    destroyState() {
        this.instantiateState(false);
        this.state.updateState(this.state);
    }

    updateModal(modal_class, modal_type, modal_action = false) {
        this.state.updateState(
            {modalOptions:
                {modal_class: modal_class,
                 modal_type: modal_type,
                 modal_action: modal_action
                }
            });
    }
}

const store = new Store();
export default store;