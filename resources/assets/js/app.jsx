import React from 'react';
import update from 'immutability-helper';
import {Router as Router, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {PrivateRoute, PublicOnlyRoute, PropsRoute} from './helper/route.jsx';
import Auth from './helper/auth.jsx';
import Overlay from './templates/components/overlay.jsx';
import Header from './templates/components/header.jsx';
import ErrorBoundary from './templates/components/error_boundary.jsx';
import Index from './templates/pages/index.jsx';
import Summary from './templates/pages/summary.jsx';
import Login from './templates/pages/login.jsx';
import Register from './templates/pages/register.jsx';
import UserProfile from './templates/pages/user_profile.jsx';
import ResetPassword from './templates/pages/reset_password.jsx';
import Footer from './templates/components/footer.jsx';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: new Auth(),
            forceUpdate: false,
            displayUpdate: false
        };

        this.updateState = this.updateState.bind(this);
        this.history = createBrowserHistory();
    }

    updateState(updatedState) {
        this.setState(update(this.state, {$merge: updatedState}));
    }

    render() {
        return(
            <Router history={this.history}>
                <React.Fragment>
                    <Overlay displayUpdate={this.state.displayUpdate} />
                    <Header auth={this.state.auth}
                        updateState={this.updateState} />
                    <div id='main'>
                        <ErrorBoundary history={this.history}>
                            <Switch>
                                <PublicOnlyRoute exact path='/'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PublicOnlyRoute exact path='/login'
                                    component={Login}
                                    auth={this.state.auth}
                                    updateState={this.updateState} />
                                <PublicOnlyRoute exact path='/register'
                                    component={Register}
                                    auth={this.state.auth} />
                                <PublicOnlyRoute exact path='/reset-password'
                                    component={ResetPassword}
                                    auth={this.state.auth} />
                                <PrivateRoute exact path='/logout'
                                    component={Login}
                                    auth={this.state.auth} />
                                <PrivateRoute exact path='/summary'
                                    component={Summary}
                                    auth={this.state.auth} />
                                <PrivateRoute exact path='/uncompleted-chains'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PrivateRoute path='/chain/:chain_id'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PrivateRoute path='/chain/add'
                                    component={Index}
                                    auth={this.auth} />
                                <PrivateRoute path='/chain/edit/:chain_id'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PrivateRoute path='/user/:user_id'
                                    component={UserProfile}
                                    auth={this.state.auth} />
                                <PrivateRoute path='/user/add'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PrivateRoute path='/user/edit/:user_id'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PropsRoute
                                    component={ErrorBoundary}
                                    errorCode={'404'} />
                            </Switch>
                        </ErrorBoundary>
                    </div>
                    <Footer />
                </React.Fragment>
            </Router>
        );
    }
}