import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./00-surveytester/router/PrivateRoute";
import PublicRoute from "./00-surveytester/router/PublicRoute";
import Login from "./01-login/login/login";
import Dashboard from "./02-dashboard/dashboard";
import ProjectDetails from "./05-project/project-details";
import ProjectIssues from "./05-project/issues/issues";
import ProjectPages from "./05-project/pages/pages";
import ProjectTestRuns from "./05-project/testruns/testruns";

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
          <PrivateRoute exact path='/project-details/:projectId' component={ProjectDetails} />
          <PrivateRoute exact path='/project-issues/:projectId' component={ProjectIssues} />
          <PrivateRoute exact path='/project-pages/:projectId' component={ProjectPages} />
          <PrivateRoute exact path='/project-testruns/:projectId' component={ProjectTestRuns} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
