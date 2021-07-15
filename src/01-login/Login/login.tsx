import { useState } from "react";
import { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import { Card, CardContent, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
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
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Login: FunctionComponent<RouteComponentProps> = (props) => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [slideIn] = useState(true);
  const [forgetEmail, setForgetEmail] = useState("");
  const [isShowLogin, setisShowlogin] = useState(true);
  const [isShowFreeTrail, setisShowFreeTrial] = useState(false);
  const [isShowAfterFreeTrail, setisShowAfterFreeTrail] = useState(false);
  const { t } = useTranslation();


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await axios.post(
      SERVER_URL + "/API/V2/authentication.ashx?method=login",
      {
        email: email,
        password: password,
        timestamp: new Date().toUTCString(),
      }
    );

    if (data.Status.Status === "OK") {
      localStorage.setItem("token", data.Token);
      localStorage.setItem("EmailForTestOnly", data.Email);
      props.history.push("/dashboard");
      window.location.reload();
    } else {
      toast.error(t("login.emailPasswordIncorrect"));
    }
  };

  const handleFreetrail = () => {
    setisShowlogin(false);
    setisShowFreeTrial(true);
    setisShowAfterFreeTrail(false)
  };

  const handleCloseFreeTrail = () => {
    setisShowlogin(true);
    setisShowFreeTrial(false);
    setisShowAfterFreeTrail(false)
  };

  const handleFreeTrailSubmit = () => {
    setisShowlogin(false);
    setisShowFreeTrial(false);
    setisShowAfterFreeTrail(true);
  }

  const handleFreeTrailSucessClose = () => {
    setisShowlogin(true);
    setisShowFreeTrial(false);
    setisShowAfterFreeTrail(false);
  };

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await axios.post(
      SERVER_URL + "/api/v2/authentication.ashx?method=recoverPassword",
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
      {isShowLogin && (
        <div className="login-form">

          <MDBRow className='mt-3'>
            <MDBCol lg='12'>
              <Link
                href="#"
                variant="body1"
                onClick={() => i18next.changeLanguage("en")}
              >
                English
              </Link>
              <span className="color-white"> | </span>
              <Link
                href="#"
                variant="body2"
                onClick={() => i18next.changeLanguage("de")}
              >
                German
              </Link>
            </MDBCol>
          </MDBRow>

          <form className="login" onSubmit={(event) => handleLogin(event)}>
            <MDBRow className='mt-2'>
              <MDBCol lg='12'>
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
              </MDBCol>

              <MDBCol lg='12'>
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
              </MDBCol>
            </MDBRow>

            <MDBRow className='mt-2'>
              <MDBCol lg='12'>
                <Link className="cursor-pointer" onClick={() => setOpen(true)}>
                  {t("login.forgotPassword")}
                </Link>
              </MDBCol>

              <MDBCol lg='12' className='mt-2'>
                {/* // TODO: Keep me signed in functionality*/}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={t("login.keepMeSignedIn")}
                />
              </MDBCol>

              <MDBCol lg='12' className='mt-2'>
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
              </MDBCol>

              <MDBCol lg='12' className='mt-3'>
                {/* // TODO: New User UI functionality*/}
                <Link href="#" variant="body2">
                  {t("login.dontHaveAccount")}
                </Link>
              </MDBCol>

              <MDBCol lg='12' className='mt-2'>
                {/* // TODO: New User UI functionality*/}
                <label className='color-white'>{t("login.startUsingFreeTrial")} </label>
              </MDBCol>

              <MDBCol lg='12' className='mt-4'>
                {/* // TODO: New User UI functionality*/}
                <Button
                  className="btn btn-blue"
                  color="primary"
                  onClick={handleFreetrail}
                >
                  {t("login.freeTrial")}
                </Button>
              </MDBCol>

            </MDBRow>

            <ul className="loginformterms">
              <li>
                {/* // TODO: Create Terms of Service UI*/}
                <Link href="#" variant="body1">
                  {t("login.termsOfService")}
                </Link>{" "}
                <span className="pipe">|</span>
              </li>
              <li>
                {/* // TODO: Create Disclaimer UI*/}
                <Link href="#" variant="body1">
                  {t("login.disclaimer")}
                </Link>{" "}
                <span className="pipe">|</span>
              </li>
              <li>
                {/* // TODO: Create UI*/}
                <Link href="#" variant="body1">
                  {t("login.whatIsServeyTester")}
                </Link>
              </li>
            </ul>
          </form>

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
      )}

      {isShowFreeTrail && (
        <div className="freetrail">
          <Slide direction="right" in={slideIn} mountOnEnter unmountOnExit>
            <Card>
              <Button className="freetileclose" onClick={handleCloseFreeTrail}>
                <CancelIcon />
              </Button>
              <h3>Today's Best Decision </h3>
              <h6 className="mt-5 mb-3">
                Use 2X4 Survey Tester for free with our 14 days trail and see
                for your self .<br />
                Your Trial will end automitically{" "}
              </h6>

              <div className="freetrailform">
                <CardContent>
                  <form>
                    <MDBRow className='mb-3'>
                      <MDBCol lg='12' className='mb-3'>
                        <TextField
                          variant="outlined"
                          placeholder="Company Address"
                          required
                          label="Company Address"
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg='12' className='mb-3'>
                        <TextField
                          variant="outlined"
                          placeholder="First Name"
                          required
                          label="First Name"
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg='12' className='mb-3'>
                        <TextField
                          variant="outlined"
                          placeholder="lastname"
                          required
                          label="Last Name "
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg='12' className='mb-3'>
                        <TextField
                          variant="outlined"
                          placeholder="Business Emaill Address"
                          required
                          label="Business Emaill Address"
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg='12' className='mb-3'>
                        <TextField
                          variant="outlined"
                          placeholder="Survey Provider"
                          required
                          label="Survey Provider"
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg='12' className='mb-3'>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="remember"
                              color="secondary"
                              required
                            />
                          }
                          label="I accept the Survey Tester terms of use and privacy policy "
                        />
                      </MDBCol>

                      <MDBCol lg='12' className='mb-3'>
                        <Button
                          type="submit"
                          variant="contained"
                          className="freetrailsubmit"
                          onClick={handleFreeTrailSubmit}
                        >
                          Free 14 Day's Trial
                        </Button>
                      </MDBCol>

                      <MDBCol lg='12' className='mb-3'>
                        <p>
                          or watch the initial walkthru{" "}
                          <a href="/trainingvideo">training video</a> first.
                        </p>
                      </MDBCol>
                    </MDBRow>
                  </form>
                </CardContent>
              </div>
            </Card>
          </Slide>
        </div>
      )}

      {isShowAfterFreeTrail && (
        <div className="freetrail">
          <Slide direction="right" in={slideIn} mountOnEnter unmountOnExit>
            <Card>
              <Button className="aftertrail" onClick={handleFreeTrailSucessClose}>
                <CancelIcon />
              </Button>
              <Typography variant="h4">Today's Best Decision </Typography>
              <Typography variant="h6">
                You'r only few minute away to start your journey to grether survey
                quality <br />
              </Typography>
              <Typography variant="h6">
                To start your test-phase right now,please click on the
                confirmation link in the mail we send to .if we cannot find the
                email in your inbox ,please check your spam folder .
              </Typography>
              <Typography variant="h6">
                Please also check some of our training videos to get started.
                <figure>
                  {/* <img src={afterlogin} alt="registerpics" /> */}
                </figure>
              </Typography>
              <Typography variant="h6">
                If you have any question during the test, please use our support
                system and we are happy to help you.
              </Typography>
              <Typography variant="h6">Your Survey tester team</Typography>
            </Card>
          </Slide>
        </div>
      )}

    </div>
  );
};
export default Login;
