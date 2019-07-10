import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Chains from '../../helper/chains';
import Auth from "../../helper/auth";
import '../../../css/components/header.css';


export default class Header extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        updateState: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

    }

    logout(e) {
        e.preventDefault();

        this.props.updateState({
            auth: new Auth(),
            chains: new Chains(this.props.updateState),
        });

        return (<Redirect
            to={{
                pathname: '/login'
            }}
        />);
    }

    render() {
        return (
            <header>
                <div id='welcome'>
                    {this.props.auth.isAuthenticated() ? (
                        <p>
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
                        </p>
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