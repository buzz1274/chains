import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../css/pages/login.css';

export default class Login extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();

        this.props.updateState({auth: this.props.auth.login(false, false)});
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='form'>
                <fieldset>
                    <legend>Login</legend>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' className='form-control' />
                        </div>
                    </form>
                    <div className='buttons'>
                        <Link to='/'>
                            <button type='button' className='btn btn-light'>
                                Cancel
                            </button>
                        </Link>
                        <Link to='/register'>
                            <button type='button' className='btn btn-light'>
                                Register
                            </button>
                        </Link>
                        <button type='button' className='btn btn-primary'
                            onClick={(e) => {
                                this.login(e);
                            }} >
                            Login
                        </button>
                    </div>
                    <span className='pull-left'>
                        <Link to='/reset-password'>
                            <button type='button' className='btn btn-light'>
                                Reset Password
                            </button>
                        </Link>
                    </span>
                </fieldset>
            </div>
        );
    }

}