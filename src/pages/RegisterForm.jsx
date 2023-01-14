import styles from "./Form.module.css";
import Card from "../ui/Card";
import useInput from "../hooks/use-input";
import axios from "axios";
import { useContext } from "react";
import { uiContext } from "../context-store/ui-store";
import { useHistory } from "react-router-dom";

const server = axios.create({ baseURL: "http://localhost:8080/" });
const validateEmail = (email) => {
  var regexp =
    /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
};

const validateName = (name) => {
  return name.trim().length > 0;
};

const validatePassword = (password) => {
  return password.trim().length > 5;
};

const RegisterForm = () => {
  const firstNameInput = useInput(validateName, "");
  const lastNameInput = useInput(validateName, "");
  const emailInput = useInput(validateEmail, "");
  const passwordInput = useInput(validatePassword, "");
  const confirmPassInput = useInput(validatePassword, "");
  const history = useHistory();
  const uiCtx = useContext(uiContext);
  let passwordMatch = true;
  if (
    (confirmPassInput.isFocused && confirmPassInput.value === "") ||
    confirmPassInput.value !== passwordInput.value
  ) {
    passwordMatch = false;
  }

  let formIsValid =
    firstNameInput.isValid &&
    emailInput.isValid &&
    passwordInput.isValid &&
    confirmPassInput.isValid &&
    passwordMatch;
  const registerFormHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      uiCtx.updateNotification({
        status: "LOADING",
        message: "Saving User..Please wait!",
      });
      server
        .post(
          "/register",
          {
            emailAddress: emailInput.value,
            password: passwordInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 202) {
            uiCtx.updateNotification({
              status: "SUCCESS",
              message: "User Registered Successfully! Please login to continue",
            });
            history.push("/login")
          }
        })
        .catch((err) => {
          uiCtx.updateNotification({
            status: "ERROR",
            message: "Something went wrong! Please try again",
          });
        });
    }
  };

  return (
    <Card>
      <form onSubmit={registerFormHandler}>
        <div
          className={`${styles.control} ${
            firstNameInput.hasError ? styles.invalid : ""
          }`}
        >
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            id="firstName"
            value={firstNameInput.value}
            onChange={firstNameInput.inputChangeHandler}
            onBlur={firstNameInput.inputOnBlurHandler}
          />
          {firstNameInput.hasError && (
            <p className={styles["error-text"]}>
              First Name should not be empty
            </p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastNameInput.value}
            onChange={lastNameInput.inputChangeHandler}
            onBlur={lastNameInput.inputOnBlurHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            emailInput.hasError ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email Address*</label>
          <input
            type="email"
            id="email"
            value={emailInput.value}
            onChange={emailInput.inputChangeHandler}
            onBlur={emailInput.inputOnBlurHandler}
            autoComplete="false"
          />
          {emailInput.hasError && (
            <p className={styles["error-text"]}>Enter a valid email address</p>
          )}
        </div>
        <div
          className={`${styles.control} ${
            passwordInput.hasError ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password*</label>
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
              Password must be atleast 6 characters
            </p>
          )}
        </div>
        <div
          className={`${styles.control} ${
            confirmPassInput.hasError ? styles.invalid : ""
          }`}
        >
          <label htmlFor="confirm-password">Confirm Password*</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassInput.value}
            onChange={confirmPassInput.inputChangeHandler}
            onBlur={confirmPassInput.inputOnBlurHandler}
            autoComplete="false"
          />
          {!passwordMatch && (
            <p className={styles["error-text"]}>Password doesn't match</p>
          )}
        </div>
        <button type="submit" disabled={!formIsValid}>
          Sign up
        </button>
      </form>
    </Card>
  );
};

export default RegisterForm;
