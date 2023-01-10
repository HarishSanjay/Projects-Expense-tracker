import Card from "../ui/Card";
import styles from "./Login.module.css";
import useInput from "../hooks/use-input";
import axios from "axios";
import { useContext } from "react";
import authContext from "../context-store/auth-store";
import { useHistory } from "react-router-dom";

const server = axios.create({ baseURL: "http://localhost:8080/" });
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
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);
  const history = useHistory();
  let formIsValid = false;
  if (emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  const loginFormHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      server.post("/login", {
        emailAddress: emailInput.value,
        password: passwordInput.value,
      }).then(response => {
        if(response.status===200)
        {
          console.log(response.data);
          ctx.login(response.data.idToken, Number(response.data.expirationTime));
          history.replace('/home');
        }
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
