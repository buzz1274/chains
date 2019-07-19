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
            repeat_password: ''
        }
    }
    render() {
        return (
            <div className='form'>
                <fieldset>
                    <legend>Register</legend>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name:</label>
                            <input type='text' name='name' className='form-control'
                                   value={this.state.name}
                                   onChange={(e) => {
                                       this.setState({name: e.target.value})
                                   }} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input type='text' name='email' className='form-control'
                                   value={this.state.email}
                                   onChange={(e) => {
                                       this.setState({email: e.target.value})
                                   }} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' name='password' className='form-control'
                                   value={this.state.password}
                                   onChange={(e) => {
                                       this.setState({password: e.target.value})
                                   }} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='repeat_password'>
                                Repeat Password:
                            </label>
                            <input type='password' name='repeat_password' className='form-control'
                                   value={this.state.repeat_password}
                                   onChange={(e) => {
                                       this.setState({repeat_password: e.target.value})
                                   }} />
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