import React from 'react';
import '../../../css/components/error_boundary.css';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    /*
    static propTypes = {
        errorCode: PropTypes.object.optional,
        history: PropTypes.object.required,
        children: PropTypes.object.optional
    }
    */

    state = {
        hasError: false,
        errorCode: false,
        errorMessage: false
    }

    constructor(props) {
        super(props);

        if(props.errorCode == '404') {
            this.setErrorState(404, 'Page not found');
        } else if (props.errorCode == '500') {
            this.setErrorState(500, 'An error has occurred');
        } else {
            this.setErrorState(false, false);
        }
    }

    setErrorState(errorCode, errorMessage) {
        this.state = {
            hasError: Boolean(errorCode),
            errorCode: errorCode,
            errorMessage: errorMessage
        };
    }

    componentDidCatch() {
        this.setErrorState(500, 'An error has occurred');
    }

    render() {
        if(this.state.hasError) {
            return (
                <React.Fragment>
                    (<a id='reset_error_link' href='#'
                        onClick={(e) => {
                            this.setErrorState(false, false);
                            this.props.history.push('/');
                            e.preventDefault();
                        }} >
                        reset
                    </a>)
                    <span id='error_message'>{this.state.errorMessage}</span>
                </React.Fragment>
            );
        } else if(this.props.children) {
            return this.props.children;
        }

        return null;

    }

}