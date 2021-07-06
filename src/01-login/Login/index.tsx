import { useState } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios"

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../login.scss";

const UserLogin = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    const { data } = await axios.post(SERVER_URL + 'API/V2/authentication.ashx?method=login', {
      Email: email,
      Password: password
    })

    if (data.Token) {
      localStorage.setItem("userData", JSON.stringify(data))
      history.push("/dashboard");
    } else {
      alert("Email or Password incorrect.")
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
        <form className="login">
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
                <Button onClick={() => setOpen(false)} color="primary">
                  Send
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Keep me signed in "
          />
          <div className="buttons">
            <Button name="signin" value="Login"
              onClick={handleLogin} id="signin" className="btn btn-green" color="primary">
              Sign In
            </Button>
          </div>
          <Grid item>
            <Link href="" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
          <label>Start Using Free Trial </label>
          <div className="buttons">
            <Button className="btn btn-blue" color="primary">
              Free Trial
            </Button>
          </div>
          <ul>
            <li>
              <Link href="#" variant="body1">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" variant="body1">
                Disclaimer
              </Link>
            </li>
            <li>
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
export default UserLogin;