import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppBar from "../appbar/appbar";

const isAuthenticated = localStorage.getItem("userData") ? true : false

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) => (
    isAuthenticated
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return (
    <div>
      <AppBar />
      <Route {...rest} render={routeComponent} />
    </div>
  )
};

export default PrivateRoute;