import React from 'react';
import LeftNavigation from './left_navigation.jsx';
import '../../../css/components/main_interface.css';
import PropTypes from 'prop-types';

export default class MainInterface extends React.Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
        chains: PropTypes.object.isRequired
    }

    render() {
        return (
            <React.Fragment>
                <div id='main_interface'>
                    {this.props.children}
                </div>
                <LeftNavigation updateState={this.props.updateState}
                                chains={this.props.chains} />
            </React.Fragment>
        );
    }

}