import Card from "../ui/Card";
import useInput from "../hooks/use-input";
import { useCallback, useContext } from "react";
import authContext from "../context-store/auth-store";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Input from "../ui/Input";
import Button from "../ui/Button";

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
  const http = useHttp();
  const emailInput = useInput(validateEmail, "");
  const passwordInput = useInput(validatePassword, "");
  const history = useHistory();
  let formIsValid = false;
  if (emailInput.isValid && passwordInput.isValid) {
    formIsValid = true;
  }

  const saveLoginDetails = useCallback(
    (data) => {
      ctx.login(data.idToken, Number(data.expirationTime), {
        userId: data.userId,
        mailId: data.mailId,
        firstName: data.firstName,
      });
      history.replace("/home");
    },
    [ctx, history]
  );

  const loginFormHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const body = {
        emailAddress: emailInput.value,
        password: passwordInput.value,
      };
      const url = "http://localhost:8080/auth/login";
      http.sendRequest(
        "POST",
        body,
        url,
        false,
        {
          showMessage: true,
          loading: "Validating Credentials! Please wait",
          success: `Welcome User!`,
          error: "Invalid credentials!",
        },
        saveLoginDetails
      );
    }
  };

  return (
    <Card>
      <form onSubmit={loginFormHandler}>
        <Input
          type="email"
          value={emailInput.value}
          onChange={emailInput.inputChangeHandler}
          onBlur={emailInput.inputOnBlurHandler}
          label="Email Address"
          hasError={emailInput.hasError}
          error="Enter a valid email address"
          autoComplete="true"
        />
        <Input
          type="password"
          value={passwordInput.value}
          onChange={passwordInput.inputChangeHandler}
          onBlur={passwordInput.inputOnBlurHandler}
          hasError={passwordInput.hasError}
          label="Password"
          error="Password length should be atleast 6 characters"
          autoComplete="true"
        />
        <Button type="submit" title="Sign in" disabled={!formIsValid} />
      </form>
    </Card>
  );
};

export default LoginForm;
