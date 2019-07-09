import React from 'react';
import '../../../css/components/left_navigation.css';
import PropTypes from "prop-types";

export default class LeftNavigation extends React.Component {
    static propTypes = {
        chains: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
    }

    displayChainRow(chain, index) {
        return (
            <tr key={index}>
                <td>{chain.chain}</td>
            </tr>

        );
    }

    render() {
        return (
            <div id='left_navigation'>
                <table className='table table-sm table-hover chains'>
                    <thead>
                    <tr className='table_nav'>
                        <td colSpan='3'>
                            <i title='Add Chain'
                               className='oi oi-plus float-right' />
                            <div className='table_title'>Chains</div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.chains.chains.map((chain, index) => {
                            return this.displayChainRow(chain, index);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}