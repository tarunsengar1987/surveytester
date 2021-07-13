import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./00-surveytester/router/PrivateRoute";
import PublicRoute from "./00-surveytester/router/PublicRoute";
import Login from "./01-login/login/login";
import Dashboard from "./02-dashboard/dashboard";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;