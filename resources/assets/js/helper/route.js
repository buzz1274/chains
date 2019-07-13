import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const renderMergedProps = function(component, ...rest) {
    const finalProps = Object.assign({}, ...rest);

    return (
        React.createElement(component, finalProps)
    );
};

const PrivateRoute = function({ component, ...rest }) {
    return (
        <Route {...rest} render={routeProps => {
            if(rest.auth.isAuthenticated()) {
                return renderMergedProps(component, routeProps, rest);
            } else {
                return (<Redirect
                    to={{
                        pathname: '/login',
                        state: { from: routeProps.location }
                    }}
                />);
            }
        }} />
    );
};

const PublicOnlyRoute = function({ component, ...rest }) {
    return (
        <Route {...rest} render={routeProps => {
            if(!rest.auth.isAuthenticated()) {
                return renderMergedProps(component, routeProps, rest);
            } else {
                return (<Redirect
                    to={{
                        pathname: '/outstanding',
                        state: { from: routeProps.location }
                    }}
                />);
            }
        }} />
    );
};

const PropsRoute = function({ component, ...rest }) {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

renderMergedProps.propTypes = {
    component: PropTypes.func.isRequired
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
};

PublicOnlyRoute.propTypes = {
    component: PropTypes.func.isRequired
};

PropsRoute.propTypes = {
    component: PropTypes.func.isRequired
};

export {PrivateRoute, PublicOnlyRoute, PropsRoute};