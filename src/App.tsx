import "./App.css";
import Login from "./01 -login/Login/login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./01 -login/Appbar/Appbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/">
            <div className="container">
            <Topbar />
              <Switch>
                <Route path="/dashboard">
                  
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
