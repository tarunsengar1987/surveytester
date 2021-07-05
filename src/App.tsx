import "./App.css";
import Login from "./Login/login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Demo Routes now 

import Topbar from "./01-login/Appbar/appbar";
import Dashboard from "./01-login/Dashboard/dashboard";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/">
          <Topbar />
            <div className="container">
            
              <Switch>
                <Route path="/dashboard">
                  <Dashboard/>
                </Route>
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
