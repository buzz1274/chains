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

    delete(e) {
        console.log("DELETE");
        console.log(e);
        this.props.chains.get();
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
            <tr key={index}>
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
                            onClick={(e) => {
                            this.delete(e);
                        }} >
                        </i>
                    </a>
                </td>
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
                        {this.props.chains.chains.map((chain, index) => {
                            return this.displayChainRow(chain, index);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}