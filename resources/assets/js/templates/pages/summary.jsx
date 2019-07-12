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
            <MainInterface {...this.props} page_title='Summary'>
                {this.props.chains.outstanding.length > 0 ? (
                    null
                ) : (
                    <p>You have no outstanding chains to confirm.</p>
                )}
            </MainInterface>
        );
    }

}