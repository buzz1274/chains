import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/pages/register.css';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            errors: {
                name: '',
                email: '',
                password: '',
                repeatPassword: ''
            }
        }
    }

    styleFormError(field) {
        if(this.state.errors[field]) {
            return 'form-error';
        }

        return '';
    }

    render() {
        return (
            <div className='form'>
                <fieldset>
                    <legend>Register</legend>
                    <form>
                        <div className={'form-group ' + this.styleFormError('name')}>
                            <label htmlFor='name'>Name:</label>
                            <input type='text' name='name'
                                   className={'form-control ' + this.styleFormError('name')}
                                   value={this.state.name}
                                   onChange={(e) => {
                                       this.setState({name: e.target.value});
                                   }} />
                            {this.state.errors.name ? (
                                <div className='form-error'>
                                    {this.state.errors.name}
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                        <div className={'form-group ' + this.styleFormError('email')}>
                            <label htmlFor='email'>Email:</label>
                            <input type='text' name='email'
                                   className={'form-control ' + this.styleFormError('email')}
                                   value={this.state.email}
                                   onChange={(e) => {
                                       this.setState({email: e.target.value})
                                   }} />
                            {this.state.errors.email ? (
                                <div className='form-error'>
                                    {this.state.errors.email}
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                        <div className={'form-group ' + this.styleFormError('password')}>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' name='password'
                                   className={'form-control ' + this.styleFormError('password')}
                                   value={this.state.password}
                                   onChange={(e) => {
                                       this.setState({password: e.target.value})
                                   }} />
                            {this.state.errors.password ? (
                                <div className='form-error'>
                                    {this.state.errors.password}
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                        <div className={'form-group ' + this.styleFormError('repeatPassword')}>
                            <label htmlFor='repeatPassword'>
                                Repeat Password:
                            </label>
                            <input type='password' name='repeatPassword'
                                   className={'form-control ' + this.styleFormError('repeatPassword')}
                                   value={this.state.repeatPassword}
                                   onChange={(e) => {
                                       this.setState({repeatPassword: e.target.value})
                                   }} />
                            {this.state.errors.repeatPassword ? (
                                <div className='form-error'>
                                    {this.state.errors.repeatPassword}
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </form>
                    <div className='buttons'>
                        <Link to='/'>
                            <button type='button' className='btn btn-light'>
                                Cancel
                            </button>
                        </Link>
                        <button type='button' className='btn btn-primary'
                                onClick={() => {
                                    this.props.auth.register(this.state);
                                }} >
                            Register
                        </button>
                    </div>
                </fieldset>
            </div>
        );
    }
}