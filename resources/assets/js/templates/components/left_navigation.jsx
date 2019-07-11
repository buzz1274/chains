import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/components/left_navigation.css';

export default class LeftNavigation extends React.Component {
    static propTypes = {
        chains: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
    }

    edit(e) {
        console.log("EDIT");
        console.log(e);
    }

    add(e) {
        console.log("ADD");
        console.log(e);
    }

    displayChainRow(chain, index) {
        return (
            <React.Fragment key={index}>
                {chain.active ? (
                    <tr>
                        <td>{chain.chain}</td>
                        <td>0</td>
                        <td className="text-center">
                            <a className="black" title="Edit Chain">
                                <i className="oi oi-wrench"
                                    onClick={(e) => {
                                        this.edit(e);
                                }} >
                                </i>
                            </a>
                            <a className="black" title="Delete Chain">
                                <i className="oi oi-trash"
                                    onClick={() => {
                                        chain.delete(false);
                                }} >
                                </i>
                            </a>
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
                            <i title='Add Chain'
                               className='oi oi-plus float-right'
                                onClick={(e) => {
                                    this.add(e);
                                }} >
                            </i>
                            <div className='table_title'>Chains</div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>Streak(days)</td>
                            <td>-</td>
                        </tr>
                        {this.props.chains.totalChains ? (
                            this.props.chains.chains.map((chain, index) => {
                                return this.displayChainRow(chain, index);
                            })
                        ) : (
                            <tr>
                                <td colSpan="3">
                                    <p className="text-center text-danger">
                                        You have no Chains. Add some.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}