import React from 'react';
import '../../../css/components/overlay.css';

export default class Overlay extends React.Component {
    render() {
        return (
            <div id='ajax_loader'>
                <div id='opaque'></div>
                <img id='loader_spinner' width='35' className='centred'
                    src='/images/spinner.svg'/>
            </div>
        );
    }
}