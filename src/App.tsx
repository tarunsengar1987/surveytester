
import './App.css';
import Login from './Login/login';
import Dashboard from './Dashboard/dashboard.jsx';
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
  
    </Router>
  
  );
}

export default App;
