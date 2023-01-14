import Card from "../ui/Card";
import styles from "./Form.module.css";
import useInput from "../hooks/use-input";
import axios from "axios";
import { useContext } from "react";
import authContext from "../context-store/auth-store";
import { useHistory } from "react-router-dom";
import { uiContext } from "../context-store/ui-store";

const server = axios.create({ baseURL: "http://localhost:8080" });
const validateEmail = (email) => {
  var regexp =
    /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
};

const validatePassword = (password) => {
  return password.trim().length > 5;
};

//Component
const LoginForm = () => {
  const ctx = useContext(authContext);
  const uiCtx = useContext(uiContext);
  const emailInput = useInput(validateEmail, "");
  const passwordInput = useInput(validatePassword, "");
  const history = useHistory();
  let formIsValid = false;
  if (emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  const loginFormHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      uiCtx.updateNotification({
        status: "LOADING",
        message: "Validating Credentials..Please wait!",
      });
      server
        .post("/auth/login", {
          emailAddress: emailInput.value,
          password: passwordInput.value,
        })
        .then((response) => {
          const status = response.status;
          if (status === 200) {
            console.log(response.data);
            ctx.login(
              response.data.idToken,
              Number(response.data.expirationTime),
              { userId: response.data.userId, mailId: response.data.mailId }
            );
            uiCtx.updateNotification({
              status: "SUCCESS",
              message: "Welcome User",
            });
            history.replace("/home");
          }
        })
        .catch((err) => {
          uiCtx.updateNotification({
            status: "ERROR",
            message: "Invalid credentials",
          });
        });
    }
  };

  return (
    <Card>
      <form onSubmit={loginFormHandler}>
        <div
          className={`${styles.control} ${
            emailInput.hasError ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email Address</label>

          <input
            type="email"
            id="email"
            value={emailInput.value}
            onChange={emailInput.inputChangeHandler}
            onBlur={emailInput.inputOnBlurHandler}
            autoComplete="false"
          />
          {emailInput.hasError && (
            <p className={styles["error-text"]}>Enter a valid email adddress</p>
          )}
        </div>
        <div
          className={`${styles.control} ${
            passwordInput.hasError ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordInput.value}
            onChange={passwordInput.inputChangeHandler}
            onBlur={passwordInput.inputOnBlurHandler}
            autoComplete="false"
          />
          {passwordInput.hasError && (
            <p className={styles["error-text"]}>
              Password length should be atleast 6 characters
            </p>
          )}
        </div>
        <button type="submit" disabled={!formIsValid}>
          Sign in
        </button>
      </form>
    </Card>
  );
};

export default LoginForm;
