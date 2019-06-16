import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/pages/register.css';

export default class ResetPassword extends React.Component {
    render() {
        return (
            <div className='form'>
                <fieldset>
                    <legend>Reset Password</legend>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input className='form-control'
                                data-bind='value: Email'/>
                        </div>
                    </form>
                    <div className='buttons'>
                        <Link to='/'>
                            <button type='button' className='btn btn-light'>
                                Cancel
                            </button>
                        </Link>
                        <button type='button' className='btn btn-primary'>
                            Reset
                        </button>
                    </div>
                </fieldset>
            </div>
        );
    }
}