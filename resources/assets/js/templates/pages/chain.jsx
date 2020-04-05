import React from "react";
import PropTypes from "prop-types";
import MainInterface from '../components/main_interface.jsx';
import '../../../css/pages/chain.css';

export default class Chain extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        chains: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {auth: props.auth};
    }

    displayChain(chain) {
        return (
            <ul id="list-chain-detail-view">
                <li>
                    <span className="chain-detail-view-title">
                        Name:
                    </span>
                    <span>
                        {chain.chain}
                    </span>
                </li>
            </ul>
        );
    }

    render() {
        let chain = this.props.chains.extractChain(
            this.props.match.params.chain_id
        );

        return (
            <MainInterface page_title='Chain Detail' {...this.props} >
                {chain !== null ? (
                    (this.displayChain(chain))
                ) : (
                    <p>Chain not found.</p>
                )}
            </MainInterface>
        );
    }
}