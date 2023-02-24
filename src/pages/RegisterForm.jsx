import Card from "../ui/Card";
import useInput from "../hooks/use-input";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Input from "../ui/Input";
import Button from "../ui/Button";

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

const RegisterForm = (props) => {
  const editUser = props.editUser;
  console.log({ editUser });
  const firstNameInput = useInput(
    validateName,
    editUser ? editUser.firstName : ""
  );
  const lastNameInput = useInput(
    validateName,
    editUser ? editUser.lastName : ""
  );
  const emailInput = useInput(validateEmail, editUser ? editUser.mailId : "");
  const passwordInput = useInput(validatePassword, "");
  const confirmPassInput = useInput(validatePassword, "");
  const history = useHistory();
  const http = useHttp();
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
      const body = {
        emailAddress: emailInput.value,
        password: passwordInput.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
      };
      const url = "http://localhost:8080/register";
      http.sendRequest("POST", body, url, false, {
        showMessage: true,
        loading: "Saving User Details...Please wait!",
        success: "User Created successfully...Please login again",
      });
      history.push("/login");
    }
  };

  console.log(firstNameInput);

  return (
    <Card>
      <form onSubmit={registerFormHandler}>
        <Input
          label="First Name"
          type="text"
          id="firstName"
          value={firstNameInput.value}
          onChange={firstNameInput.inputChangeHandler}
          onBlur={firstNameInput.inputOnBlurHandler}
          hasError={firstNameInput.hasError}
          error="First name should not be empty"
        />
        <Input
          label="Last Name"
          type="text"
          id="lastName"
          value={lastNameInput.value}
          onChange={lastNameInput.inputChangeHandler}
          onBlur={lastNameInput.inputOnBlurHandler}
        />
        <Input
          type="email"
          value={emailInput.value}
          onChange={emailInput.inputChangeHandler}
          onBlur={emailInput.inputOnBlurHandler}
          disabled={!!editUser}
          label="Email Address"
          hasError={emailInput.hasError}
          error="Enter a valid email address"
          autoComplete="true"
        />
        {!editUser && (
          <Input
            label="Password"
            type="password"
            id="password"
            value={passwordInput.value}
            onChange={passwordInput.inputChangeHandler}
            onBlur={passwordInput.inputOnBlurHandler}
            hasError={passwordInput.hasError}
            error="Password length should be atleast 6 characters"
            autoComplete="false"
          />
        )}
        {!editUser && (
          <Input
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassInput.value}
            onChange={confirmPassInput.inputChangeHandler}
            onBlur={confirmPassInput.inputOnBlurHandler}
            hasError={!passwordMatch}
            error="Password should match"
            autoComplete="false"
          />
        )}
        <Button type="submit" title="Sign up" disabled={!formIsValid} />
      </form>
    </Card>
  );
};

export default RegisterForm;
