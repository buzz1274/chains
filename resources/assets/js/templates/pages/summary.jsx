import React from 'react';
import PropTypes from 'prop-types';
import MainInterface from '../components/main_interface.jsx';
import '../../../css/pages/summary.css';

export default class Summary extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        chains: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {auth: props.auth};

    }

    render() {
        return (
            <MainInterface chains={this.props.chains}>
                SUMMARY
            </MainInterface>
        );
    }

}