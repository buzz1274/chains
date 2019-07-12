import React from 'react';
import { hot } from 'react-hot-loader';
import update from 'immutability-helper';
import {Router as Router, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {PrivateRoute, PublicOnlyRoute, PropsRoute} from './helper/route.js';
import Auth from './helper/auth.js';
import Chains from './helper/chains.js';
import CustomModal from './templates/components/custom_modal.jsx';
import Overlay from './templates/components/overlay.jsx';
import Header from './templates/components/header.jsx';
import ErrorBoundary from './templates/components/error_boundary.jsx';
import ChainAddEdit from './templates/pages/chain_add_edit.jsx';
import Index from './templates/pages/index.jsx';
import Summary from './templates/pages/summary.jsx';
import Login from './templates/pages/login.jsx';
import Register from './templates/pages/register.jsx';
import UserProfile from './templates/pages/user_profile.jsx';
import ResetPassword from './templates/pages/reset_password.jsx';
import Footer from './templates/components/footer.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateState = this.updateState.bind(this);

        this.state = {
            auth: new Auth(),
            chains: new Chains(this.updateState),
            history: createBrowserHistory(),
            updateState: this.updateState,
            forceUpdate: false,
            displayOverlay: false,
            modalOptions: {
                modal_class: false,
                modal_type: false,
                modal_action: false
            }
        };
    }

    updateState(updatedState) {
        this.setState(update(this.state, {$merge: updatedState}));
    }

    render() {
        return(
            <Router {...this.state} >
                <React.Fragment>
                    <Overlay displayOverlay={this.state.displayOverlay} />
                    <CustomModal modalOptions={this.state.modalOptions}
                                 updateState={this.updateState} />
                    <Header auth={this.state.auth}
                            updateState={this.updateState} />
                    <div id='main'>
                        <ErrorBoundary history={this.state.history} >
                            <Switch>
                                <PublicOnlyRoute exact path='/'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PublicOnlyRoute exact path='/login'
                                    component={Login}
                                    auth={this.state.auth}
                                    chains={this.state.chains}
                                    updateState={this.updateState} />
                                <PublicOnlyRoute exact path='/register'
                                    component={Register}
                                    auth={this.state.auth} />
                                <PublicOnlyRoute exact path='/reset-password'
                                    component={ResetPassword}
                                    auth={this.state.auth} />
                                <PrivateRoute exact path='/logout'
                                    component={Login}
                                    {...this.state} />
                                <PrivateRoute exact path='/summary'
                                    component={Summary}
                                    {...this.state} />
                                <PrivateRoute exact path='/uncompleted-chains'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PrivateRoute path='/chain/:chain_id'
                                    component={Index}
                                    auth={this.state.auth} />
                                <PrivateRoute exact path='/chain_add'
                                    component={ChainAddEdit}
                                    updateState={this.updateState}
                                    chains={this.state.chains}
                                    auth={this.state.auth} />
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
                                    path='/error'
                                    component={ErrorBoundary}
                                    errorCode={'500'} />
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

export default hot(module)(App);