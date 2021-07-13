import React from 'react';
import { Route, Redirect } from 'react-router';

const isAuthenticated = localStorage.getItem("token") ? true : false

const PublicRoute = ({ component, ...rest }: any) => {
    const routeComponent = (props: any) => (
        !isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{ pathname: '/dashboard' }} />
    );
    return <Route {...rest} render={routeComponent} />;
};

export default PublicRoute;