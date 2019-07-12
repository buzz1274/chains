import React from "react";
import PropTypes from "prop-types";
import MainInterface from '../components/main_interface.jsx';

export default class ChainAddEdit extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        chains: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {auth: props.auth};

    }

    render() {
        return (
            <MainInterface
                updateState={this.props.updateState}
                chains={this.props.chains} >
                ADD EDIT CHAIN
            </MainInterface>
        );
    }
}