
import './App.css';
import LoginPage from './LoginPage/login';
import Dashboard from './Dashboard/dashboard';
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
      <LoginPage></LoginPage>
      </Route>
      <Route path="/dashboard" exact>
      <Dashboard></Dashboard>
      </Route>
    
    </Switch>
  
    </Router>
  
  );
}

export default App;
