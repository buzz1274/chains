import React from 'react';
import LeftNavigation from './left_navigation.jsx';
import PropTypes from 'prop-types';
import '../../../css/components/main_interface.css';

export default class MainInterface extends React.Component {
    static propTypes = {
        children: PropTypes.any.isRequired,
        chains: PropTypes.object.isRequired,
        page_title: PropTypes.string.isRequired
    }

    render() {
        return (
            <React.Fragment>
                <div id='main_interface'>
                    <div id='main-interface-title-bar'>
                        {this.props.page_title}
                    </div>
                    <div id='main-interface-body'>
                        {this.props.children}
                    </div>
                </div>
                <LeftNavigation {...this.props} />
            </React.Fragment>
        );
    }

}