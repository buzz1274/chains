import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/pages/register.css';

export default class Register extends React.Component {
    render() {
        return (
            <div className='form'>
                <fieldset>
                    <legend>Register</legend>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name:</label>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='repeat_password'>
                                Repeat Password:
                            </label>
                            <input type='password' className='form-control' />
                        </div>
                    </form>
                    <div className='buttons'>
                        <Link to='/'>
                            <button type='button' className='btn btn-light'>
                                Cancel
                            </button>
                        </Link>
                        <button type='button' className='btn btn-primary'>
                            Register
                        </button>
                    </div>
                </fieldset>
            </div>
        );
    }
}