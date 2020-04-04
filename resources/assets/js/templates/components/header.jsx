import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../css/components/header.css';


export default class Header extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        destroyState: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
    }

    logout(e) {
        e.preventDefault();

        this.props.destroyState();
        this.props.history.push('/login');
    }

    render() {
        return (
            <header>
                <div id='welcome'>
                    {this.props.auth.isAuthenticated() ? (
                        <span>
                            Welcome back, {this.props.auth.name}
                            &nbsp;
                            <Link id='welcome_link'
                                to={'/user/' + this.props.auth.userID} >
                                <i id='profile' className='oi oi-share-boxed'>
                                    &nbsp;
                                </i>
                            </Link>
                            |&nbsp;
                            <Link id='welcome_link' to='/logout'
                                onClick={(e) => {
                                    this.logout(e);
                                }} >
                                Logout
                            </Link>
                            <p id="header__points">
                                Points: {this.props.current_points}
                            </p>
                        </span>
                    ) : (
                        <Link id='welcome_link' to='/login'>Login</Link>
                    )}
                </div>
                <div id='header_content'>
                    <h1>
                        <Link to='/'>Chains</Link>
                    </h1>
                </div>
            </header>
        );
    }

}