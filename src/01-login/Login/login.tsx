import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { toast } from "react-toastify";
import "../login.scss";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const Login = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [forgetEmail, setForgetEmail] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await axios.post(
      SERVER_URL + "API/V2/authentication.ashx?method=login",
      {
        email: email,
        password: password,
        timestamp: new Date().toUTCString(),
      }
    );

    if (data.Token) {
      localStorage.setItem("userData", JSON.stringify(data));
      toast.success(t("login.loginSuccessfully"));
      history.push("/dashboard");
    } else {
      toast.error(t("login.emailPasswordIncorrect"));
    }
  };

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await axios.post(
      SERVER_URL + "api/v2/authentication.ashx?method=recoverPassword",
      {
        email: forgetEmail,
        language:
          localStorage.getItem("i18nextLng") === null ||
          localStorage.getItem("i18nextLng") === "en"
            ? "English"
            : "German",
        timestamp: new Date().toUTCString(),
      }
    );

    if (data.Status.Status === "OK") {
      toast.success(t("login.emailSendSucessful"));
    } else {
      toast.error(t("login.emailIncorrect"));
    }
    setOpen(false);
    setForgetEmail("");
  };

  return (
    <div className="main-bg">
      <div className="login-new">
        <Grid container>
          <Grid item xs>
            <Link
              href="#"
              variant="body1"
              onClick={() => i18next.changeLanguage("en")}
            >
              English
            </Link>
            <span> | </span>
            <Link
              href="#"
              variant="body2"
              onClick={() => i18next.changeLanguage("de")}
            >
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
            label={t("login.emailAddress")}
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
            label={t("login.password")}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Link className="cursor-pointer" onClick={() => setOpen(true)}>
              {t("login.forgotPassword")}
            </Link>
          </div>
          {/* // TODO: Keep me signed in functionality*/}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("login.keepMeSignedIn")}
          />
          <div className="buttons">
            <Button
              name="signin"
              value="Login"
              type="submit"
              id="signin"
              className="btn btn-green"
              color="primary"
            >
              {t("login.signIn")}
            </Button>
          </div>
          <Grid item>
            {/* // TODO: New User UI functionality*/}
            <Link href="#" variant="body2">
              {t("login.dontHaveAccount")}
            </Link>
          </Grid>
          <label>{t("login.startUsingFreeTrial")} </label>
          <div className="buttons">
            {/* // TODO: Free Trial functionality */}
            <Button className="btn btn-blue" color="primary">
              {t("login.freeTrial")}
            </Button>
          </div>
          <ul>
            <li>
              {/* // TODO: Create Terms of Service UI*/}
              <Link href="#" variant="body1">
                {t("login.termsOfService")}
              </Link>
            </li>
            <li>
              {/* // TODO: Create Disclaimer UI*/}
              <Link href="#" variant="body1">
                {t("login.disclaimer")}
              </Link>
            </li>
            <li>
              {/* // TODO: Create UI*/}
              <Link href="#" variant="body1">
                {t("login.whatIsServeyTester")}
              </Link>
            </li>
          </ul>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={(event) => handleSend(event)}>
          <DialogTitle id="form-dialog-title">
            {t("login.passwordRecovery")}{" "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("login.forgotPasswordText")}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label={t("login.emailAddress")}
              type="email"
              required
              fullWidth
              value={forgetEmail}
              onChange={(e) => setForgetEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              {t("cancel")}
            </Button>
            <Button color="primary" type="submit">
              {t("send")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default Login;
