
import './App.css';
import Login from './login/Login';
import Dashboard from './Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


function App() {
  
  return (
 <Router>
    <Switch>
      <Route path="/" exact>
      <Login></Login>
      </Route>
      <Route path="/dashboard" exact>
      <Dashboard></Dashboard>
      </Route>
    
    </Switch>
    {/* <ConfirmDialog></ConfirmDialog> */}
    </Router>
  
  );
}

export default App;
