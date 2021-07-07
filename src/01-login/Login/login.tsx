import { useState } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios"
import {
  Button, TextField, FormControlLabel, Checkbox, Link, Grid, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import { toast } from "react-toastify";
import "../login.scss";

const Login = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { data } = await axios.post(SERVER_URL + 'API/V2/authentication.ashx?method=login', {
      email: email,
      password: password,
      timestamp: new Date().toUTCString()
    })

    if (data.Token) {
      localStorage.setItem("userData", JSON.stringify(data))
      toast.success("Login successfully.");
      history.push("/dashboard");
    } else {
      toast.error("Email or Password incorrect.");
    }
  };

  return (
    <div className="main-bg">
      <div className="login-new">
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body1">
              English
            </Link>
            <span> | </span>
            <Link href="#" variant="body2">
              German
            </Link>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <form className="login" onSubmit={(event) => handleLogin(event)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Link className="cursor-pointer" onClick={() => setOpen(true)}>I forgot my password ?</Link>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Password Recovery </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter your email address
                  here. We will send you link with instruction to reset your password .
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
                {/* // TODO: Reset Password functionality*/}
                <Button onClick={() => setOpen(false)} color="primary">
                  Send
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {/* // TODO: Keep me signed in functionality*/}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Keep me signed in"
          />
          <div className="buttons">
            <Button name="signin" value="Login" type="submit" id="signin" className="btn btn-green" color="primary">
              Sign In
            </Button>
          </div>
          <Grid item>
            {/* // TODO: New User UI functionality*/}
            <Link href="#" variant="body2">
              {"Don't have an account yet?"}
            </Link>
          </Grid>
          <label>Start Using Free Trial </label>
          <div className="buttons">
            {/* // TODO: Free Trial functionality */}
            <Button className="btn btn-blue" color="primary">
              Free Trial
            </Button>
          </div>
          <ul>
            <li>
              {/* // TODO: Create Terms of Service UI*/}
              <Link href="#" variant="body1">
                Terms of Service
              </Link>
            </li>
            <li>
              {/* // TODO: Create Disclaimer UI*/}
              <Link href="#" variant="body1">
                Disclaimer
              </Link>
            </li>
            <li>
              {/* // TODO: Create UI*/}
              <Link href="#" variant="body1">
                What is servey tester?
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div >
  );
};
export default Login;