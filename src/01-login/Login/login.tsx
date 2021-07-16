import { useState } from "react";
import { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import { Card, CardContent, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import freetrailimage from '../../00-surveytester/assets/st.png'
import logo from '../../00-surveytester/assets/logo.png'
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
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

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
  const [trialForm, setTrialForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    businessEmailAddress: "",
    surveyProvider: "",
    isAccept: false
  });

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
    setisShowAfterFreeTrail(false);
    setTrialForm({
      ...trialForm, companyName: '', firstName: '', lastName: '', businessEmailAddress: '', surveyProvider: '', isAccept: false
    });
  };

  const handleCloseFreeTrail = () => {
    setisShowlogin(true);
    setisShowFreeTrial(false);
    setisShowAfterFreeTrail(false);
  };

  const handleFreeTrailSubmit = (e: any) => {
    e.preventDefault();
    setisShowlogin(false);
    setisShowFreeTrial(false);
    setisShowAfterFreeTrail(true);
  };

  const handleFreeTrailSucessClose = () => {
    setisShowlogin(true);
    setisShowFreeTrial(false);
    setisShowAfterFreeTrail(false);
  };

  let name, value;
  const handleFreeTrailRegisterForm = (e: any) => {
    debugger
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setTrialForm({ ...trialForm, [name]: value });
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
          <img className="logo-img" alt="logo" src={logo}
          />
          <MDBRow className="mt-3">
            <MDBCol lg="12">
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
            <MDBRow className="mt-2">
              <MDBCol lg="12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="email"
                  type="email"
                  label={t("login.emailAddress")}
                  name="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </MDBCol>

              <MDBCol lg="12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label={t("login.password")}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow className="mt-2">
              <MDBCol lg="12">
                <Link className="cursor-pointer" onClick={() => setOpen(true)}>
                  {t("login.forgotPassword")}
                </Link>
              </MDBCol>

              <MDBCol lg="12" className="mt-2 mb-2">
                {/* // TODO: Keep me signed in functionality*/}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={t("login.keepMeSignedIn")}
                />
              </MDBCol>

              <MDBCol lg="12" className="mt-2">
                <Button
                  name="signin"
                  value="Login"
                  type="submit"
                  id="signin"
                  className="btn btn-green mb-5"
                  color="primary"
                >
                  {t("login.signIn")}
                </Button>
              </MDBCol>

              <MDBCol lg="12" className="mt-3">
                {/* // TODO: New User UI functionality*/}
                <Link href="#" variant="body2">
                  {t("login.dontHaveAccount")}
                </Link>
              </MDBCol>

              <MDBCol lg="12" className="mt-2">
                {/* // TODO: New User UI functionality*/}
                <label className="color-white">
                  {t("login.startUsingFreeTrial")}{" "}
                </label>
              </MDBCol>

              <MDBCol lg="12" className="mt-4">
                {/* // TODO: New User UI functionality*/}
                <Button
                  className="btn btn-blue mt-3"
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
              <h3>{t("login.label1")} </h3>
              <h6 className="mt-5 mb-3">
                {t("login.label2")} .<br />
                {t("login.label3")}{" "}
              </h6>

              <div className="freetrailform">
                <CardContent>
                  <form onSubmit={(event) => handleFreeTrailSubmit(event)}>
                    <MDBRow className="mb-3">
                      <MDBCol lg="12" className="">
                        <TextField className="mb-0"
                          variant="outlined"
                          margin="normal"
                          required
                          name="companyName"
                          label={t("login.label4")}
                          type="text"
                          id="companyName"
                          value={trialForm.companyName}
                          onChange={handleFreeTrailRegisterForm}
                          placeholder={t("login.label4")}
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg="12" className="">
                        <TextField className="mb-0"
                          variant="outlined"
                          margin="normal"
                          required
                          name="firstName"
                          label={t("login.label5")}
                          type="text"
                          id="firstName"
                          value={trialForm.firstName}
                          onChange={handleFreeTrailRegisterForm}
                          placeholder={t("login.label5")}
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg="12" className="">
                        <TextField className="mb-0"
                          variant="outlined"
                          margin="normal"
                          required
                          name="lastName"
                          label={t("login.label6")}
                          type="text"
                          id="lastName"
                          value={trialForm.lastName}
                          onChange={handleFreeTrailRegisterForm}
                          placeholder={t("login.label6")}
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg="12" className="">
                        <TextField className="mb-0"
                          variant="outlined"
                          margin="normal"
                          required
                          name="businessEmailAddress"
                          label={t("login.label7")}
                          type="email"
                          id="businessEmailAddress"
                          value={trialForm.businessEmailAddress}
                          onChange={handleFreeTrailRegisterForm}
                          placeholder={t("login.label7")}
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg="12" className="">
                        <TextField className="mb-0"
                          variant="outlined"
                          margin="normal"
                          required
                          name="surveyProvider"
                          label={t("login.label8")}
                          type="text"
                          id="surveyProvider"
                          value={trialForm.surveyProvider}
                          onChange={handleFreeTrailRegisterForm}
                          placeholder={t("login.label8")}
                          fullWidth
                        />
                      </MDBCol>

                      <MDBCol lg="12" className="mt-3 mb-3">
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              required
                              name="isAccept"
                              id="reisAcceptmember"
                              checked={trialForm.isAccept}
                              onChange={(event) => setTrialForm({ ...trialForm, isAccept: event.target.checked })}
                            />
                          }
                          label={t("login.label9")}
                        />
                      </MDBCol>

                      <MDBCol lg="12" className="">
                        <Button
                          type="submit"
                          name="register"
                          id="userregisteration"
                          variant="contained"
                          value="userregisteration"
                          className="freetrailsubmit btn-green mb-3"
                        >
                          {t("login.label10")}
                        </Button>
                      </MDBCol>

                      <MDBCol lg="12" className="">
                        <p>
                          {t("login.label11")}{" "}
                          <a className="moreinfo" href="/trainingvideo">{t("login.label12")}</a>{" "}
                          {t("login.label13")}.
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
              <Button
                className="freetileclose"
                onClick={handleFreeTrailSucessClose}
              >
                <CancelIcon />
              </Button>
              <Typography variant="h4" className="mb-5">{t("login.label1")} </Typography>
              <Typography variant="body2" className="mb-4">
                {t("login.label14")} <br />
              </Typography>
              <Typography variant="body2" className="mb-4">{t("login.label15")}</Typography>
              <span className="mb-4">
                {t("login.label16")}
                <figure className="mt-4">
                  <img className="card-img" src={freetrailimage} alt="registerpics" />
                </figure>
              </span>
              <Typography variant="body2" className="mb-4">{t("login.label17")}</Typography>
              <Typography variant="body2">{t("login.label18")}</Typography>
            </Card>
          </Slide>
        </div>
      )}
    </div>
  );
};
export default Login;