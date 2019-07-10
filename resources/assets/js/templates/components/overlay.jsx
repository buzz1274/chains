import React from 'react';
import PropTypes from "prop-types";
import '../../../css/components/overlay.css';

export default class Overlay extends React.Component {
    static propTypes = {
        displayOverlay: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.displayOverlay ? (
                    <div id='ajax_loader'>
                        <div id='opaque'></div>
                        <img id='loader_spinner' width='35' className='centred'
                             src='/images/spinner.svg'/>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}