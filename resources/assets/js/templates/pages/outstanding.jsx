import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MainInterface from '../components/main_interface.jsx';
import '../../../css/pages/outstanding.css';

export default class Outstanding extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        chains: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired
    }

    today = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.today = moment().format('Y-MM-DD');
        this.props.chains.getOutstanding();
    }

    formatOutstandingChain(outstanding) {
        let output = outstanding.chain;

        if(outstanding.frequency == 'daily' || outstanding.frequency == 'weekday') {
            if(this.today == outstanding.chain_completion_date) {
                output += ' today';
            } else {
                output += ' on ' + moment(outstanding.chain_completion_date).format('Do, MMMM Y');
            }
        } else if(outstanding.frequency == 'weekly') {
            if(this.today == outstanding.chain_completion_date) {
                output += ' this week';
            } else {
                output += ' week ending on ' + moment(outstanding.chain_completion_date).format('Do, MMMM Y');
            }
        } else if(outstanding.frequency == 'weekly') {
            if (this.today == outstanding.chain_completion_date) {
                output += ' this week';
            } else {
                output += ' in ' + moment(outstanding.chain_completion_date).format('MMMM Y');
            }
        }

        return output;
    }

    displayOutstanding(outstanding) {
        return (
            <div className='container d-flex outstanding-outstanding' key={outstanding.chain_completion_id}>
                <div className='outstanding-outstanding-content row col-12 align-self-center'>
                    <div className='row col-9 outstanding-outstanding-content-chain'>
                        {this.formatOutstandingChain(outstanding)}
                    </div>
                    <div className='outstanding-outstanding-buttons row col-4 justify-content-end'>
                        <button type='button' className='btn btn-success'
                                onClick={(e) => {
                                    this.props.chains.outstandingComplete(
                                        outstanding.chain_completion_id,
                                        'complete'
                                    );
                                }} >
                            Yes
                            <i className='oi oi-circle-check outstanding-outstanding-buttons-icon' />
                        </button>
                        <button type='button' className='btn btn-danger'
                                onClick={(e) => {
                                    this.props.chains.outstandingComplete(
                                        outstanding.chain_completion_id,
                                        'failed'
                                    );
                                }} >
                            No
                            <i className='oi oi-circle-x outstanding-outstanding-buttons-icon' />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let last_displayed = false;
        return (
            <MainInterface page_title='Outstanding' {...this.props} >
                {this.props.chains.count('outstanding') > 0 ? (
                    this.props.chains.outstanding.map((outstanding) => {
                        if(outstanding.completed == null &&
                           (!last_displayed || last_displayed != outstanding.id)) {

                            last_displayed = outstanding.id;

                            return this.displayOutstanding(outstanding);
                        }
                    })
                ) : (
                    <p>You have no outstanding chains to confirm.</p>
                )}
            </MainInterface>
        );
    }

}