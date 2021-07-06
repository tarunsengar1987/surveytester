import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./00-surveytester/appbar";
import Login from "./01-login/login";
import Dashboard from "./02-overview/dashboard";
import "./App.scss";

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
                  <Dashboard />
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
