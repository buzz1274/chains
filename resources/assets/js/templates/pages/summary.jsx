import React from 'react';
import PropTypes from 'prop-types';
import MainInterface from '../components/main_interface.jsx';
import '../../../css/pages/summary.css';

export default class Summary extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        chains: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainInterface {...this.props} >
                SUMMARY
            </MainInterface>
        );
    }

}