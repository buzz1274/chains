import React from 'react';
import { hot } from 'react-hot-loader';
import update from 'immutability-helper';
import {Router as Router, Switch} from 'react-router-dom';
import {PrivateRoute, PublicOnlyRoute, PropsRoute} from './helper/route.js';
import CustomModal from './templates/components/custom_modal.jsx';
import Overlay from './templates/components/overlay.jsx';
import Header from './templates/components/header.jsx';
import ErrorBoundary from './templates/components/error_boundary.jsx';
import ChainAddEdit from './templates/pages/chain_add_edit.jsx';
import Index from './templates/pages/index.jsx';
import Outstanding from './templates/pages/outstanding.jsx';
import Login from './templates/pages/login.jsx';
import Register from './templates/pages/register.jsx';
import UserProfile from './templates/pages/user_profile.jsx';
import ResetPassword from './templates/pages/reset_password.jsx';
import Footer from './templates/components/footer.jsx';
import Store from './helper/store.js';


class App extends React.Component {
    state = {}

    constructor(props) {
        super(props);
        this.state = Store.state;
    }

    updateState(updatedState) {
        this.setState(update(this.state, {$merge: updatedState}));
    }

    UNSAFE_componentWillMount() {
        Store.instantiateState(this.updateState.bind(this));
        this.updateState(Store.state);
    }

    render() {
        return(
            <Router {...this.state} >
                <React.Fragment>
                    <Overlay {...this.state} />
                    <CustomModal {...this.state} />
                    <Header {...this.state} />
                    <div id='main'>
                        <ErrorBoundary {...this.state} >
                            <Switch>
                                <PublicOnlyRoute exact path='/'
                                    component={Index}
                                    {...this.state} />
                                <PublicOnlyRoute exact path='/login'
                                    component={Login}
                                    {...this.state} />
                                <PublicOnlyRoute exact path='/register'
                                    component={Register}
                                    {...this.state} />
                                <PublicOnlyRoute exact path='/reset-password'
                                    component={ResetPassword}
                                    {...this.state} />
                                <PrivateRoute exact path='/logout'
                                    component={Login}
                                    {...this.state} />
                                <PrivateRoute exact path='/outstanding'
                                    component={Outstanding}
                                    {...this.state} />
                                <PrivateRoute exact path='/uncompleted-chains'
                                    component={Index}
                                    {...this.state} />
                                <PrivateRoute path='/chain/:chain_id'
                                    component={Index}
                                    {...this.state} />
                                <PrivateRoute exact path='/chain/add'
                                    component={ChainAddEdit}
                                    {...this.state} />
                                <PrivateRoute path='/chain/edit/:chain_id'
                                    component={Index}
                                    {...this.state} />
                                <PrivateRoute path='/user/:user_id'
                                    component={UserProfile}
                                    {...this.state} />
                                <PrivateRoute path='/user/add'
                                    component={Index}
                                    {...this.state} />
                                <PrivateRoute path='/user/edit/:user_id'
                                    component={Index}
                                    {...this.state} />
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