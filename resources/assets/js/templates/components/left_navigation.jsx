import React from 'react';
import ChainsNavigation from '../components/chains_navigation.jsx';
import '../../../css/components/left_navigation.css';

export default class LeftNavigation extends React.Component {
    render() {
        return (
            <div id='left_navigation'>
                <ChainsNavigation />
            </div>
        );
    }

}