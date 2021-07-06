import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from "axios";//Axios has the ability to intercept HTTP requests. Fetch, by default, doesn't provide a way to intercept requests. Axios has built-in support for download progress. Fetch does not support upload progress
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);
//state type
type State = {
  username: string
  password: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};
const initialState: State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};
type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
  }
}
const Login: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const history = useHistory();
  const [checked, setChecked] = React.useState(true);
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  function togglePopup() {
    setPopupVisible(!popupVisible)
  }
  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password]);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const SERVER_URL = process.env.REACT_APP_SERVER;
    // console.log(SERVER_URL)
    // console.log(userName)
    // console.log(password)
    const credentials = {
      Email: state.username,
      Password: state.password
    }
    const { data } = await axios.post(SERVER_URL + 'API/V2/authentication.ashx?method=login', credentials)
    console.log(data)
    if (data.Token) {
      setOpenAlertInvalid(true)
      localStorage.setItem("userData", JSON.stringify(data))
      setTimeout(() => {
        history.push("/dashboard") 
      }, 1000);
    } else {
      dispatch({
        type: "loginFailed",
        payload: "Wrong credentials"
      })
      setOpenAlert(true)
    }
  };
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertInvalid, setOpenAlertInvalid] = React.useState(false);
  const handleClick = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleCloseAlertInvalid = () => {
    setOpenAlertInvalid(false);
  };
  // const handleKeyPress = (event: React.KeyboardEvent) => {
  //   if (event.keyCode === 13 || event.which === 13) {
  //     state.isButtonDisabled || handleLogin(event)
  //   }
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: "setUsername",
        payload: event.target.value
      })
    };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: "setPassword",
        payload: event.target.value
      })
    }
  return (
    <>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={handleLogin}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Survey tester" />
          <CardContent>
            <div>
              <TextField
                error={state.isError}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={handleUsernameChange}
                value={state.username}
              />
              <TextField
                error={state.isError}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={state.helperText}
                onChange={handlePasswordChange}
                value={state.password}
              />
            </div>
            {/* <Button onClick={() => confirmDialog('Please enter your email address. We will send you a link with instructions to reset your password.',handleSubmit)}>I forgot my password</Button> */}
            <div>
              <Link className="cursor-pointer" onClick={handleClickOpen}>I forgot my password ?</Link>
              <Dialog
                open={open}
                onClose={handleClose}
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
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Send
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <FormControlLabel className="keep_me"
              control={
                <Checkbox
                  defaultChecked
                  color="primary"
                />
              }
              label="Keep me signed in"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              type="submit"
              disabled={state.isButtonDisabled}
            >
              Sign In
            </Button>
          </CardActions>
          <CardContent>
            <FormControlLabel
              control={
                <Button
                />
              }
              label="Don't have an account yet?"
            />
            <FormControlLabel
              control={
                <Button
                />
              }
              label="Start using SurveyTester now!"
            />
          </CardContent>
          <CardActions>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.loginBtn}
            // onClick={handleLogin}
        disabled={state.isButtonDisabled}
          >
            Free trial
          </Button>
        </CardActions>
        </Card>
      </form>
      {state.isError}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          Invalid Login Credential
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertInvalid} autoHideDuration={6000} onClose={handleCloseAlertInvalid}>
        <Alert onClose={handleCloseAlertInvalid} severity="success">
          Login Successfully
        </Alert>
      </Snackbar>
    </>
  );
}
export default Login;