import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppBar from "../appbar/appbar";

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
const isAuthenticated = localStorage.getItem("token") ? true : false;

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return (
    <div>
      <AppBar />
      <MDBContainer fluid>
        <MDBRow className='mb-3'>
          <MDBCol lg='12'>
            <Route {...rest} render={routeComponent} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div >
  );
};

export default PrivateRoute;
