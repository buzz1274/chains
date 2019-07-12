import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import '../../../css/components/left_navigation.css';

export default class LeftNavigation extends React.Component {
    static propTypes = {
        chains: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    displayChainRow(chain) {
        return (
            <React.Fragment key={chain.id}>
                {chain.active ? (
                    <tr key={chain.id} className="left-nav-chain-row">
                        <td onClick={() => {
                            this.props.history.push('/chain/' + chain.id);
                        }}>
                            {chain.chain}
                        </td>
                        <td className="left-nav-chain-streak">0</td>
                        <td className="text-center">
                            <i className="oi oi-wrench left-nav-action-icon"
                               title='Edit Chain'
                               onClick={() => {
                                   this.props.history.push('/chain/' + chain.id + '/edit');
                            }} />
                            <i className="oi oi-trash left-nav-action-icon"
                               title='Delete Chain'
                               onClick={() => {
                                    chain.delete(false);
                            }} />
                        </td>
                    </tr>
                ) : (
                    null
                )}
            </React.Fragment>
        );
    }

    render() {
        return (
            <div id='left_navigation'>
                <table className='table table-sm table-hover chains'>
                    <thead>
                        <tr className='table_nav'>
                            <td colSpan='3'>
                                <Link id='left-nav-add-chain-link' to='/chain/add' >
                                    <i title='Add Chain'
                                       className='oi oi-plus float-right'>
                                    </i>
                                </Link>
                                <div className='table_title'>Chains</div>
                            </td>
                        </tr>
                        <tr className="left-nav-table-title">
                            <td>Title</td>
                            <td>Streak</td>
                            <td className="text-center left-nav-action-links">-</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.chains.count() > 0 ? (
                        this.props.chains.chains.map((chain) => {
                            return this.displayChainRow(chain);
                        })
                    ) : (
                        <tr>
                            <td colSpan="3">
                                <p className="text-center text-danger">
                                    You have no Chains. Add some.
                                </p>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}