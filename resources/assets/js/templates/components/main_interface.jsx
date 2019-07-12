import React from 'react';
import LeftNavigation from './left_navigation.jsx';
import PropTypes from 'prop-types';
import '../../../css/components/main_interface.css';

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
                <LeftNavigation {...this.props} />
            </React.Fragment>
        );
    }

}