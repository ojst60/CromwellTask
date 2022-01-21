// eslint-disable-next-line no-useless-escape
const regex = new RegExp(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/);

export function registerFormInputErrorHandler(data, setErrorState, setErrorMessage) {
  const enteredEmail = data.email;

  if (
    data.firstname.trim().length === 0 ||
    data.lastname.trim().length === 0 ||
    data.password.length === 0 ||
    data.email.trim().length === 0 ||
    data.confirmPassword.trim().length === 0
  ) {
    setErrorState(true);
    setErrorMessage("All fields are required.");
    return true;
  } else if (data.password.length < 6) {
    setErrorState(true);
    setErrorMessage("Password must be 6 characters or more");
    return true;
  } else if (!regex.test(enteredEmail)) {
    setErrorState(true);
    setErrorMessage('Please enter a valid email "email@example.com"');
    return true;
  } else if (data.password !== data.confirmPassword) {
    setErrorState(true);
    setErrorMessage("Those passwords didn’t match. Try again.");
    return true;
  }
}

export function loginFormInputErrorHandler(data, setErrorState, setErrorMessage) {
  if (data.password.length === 0 || data.email.trim().length === 0) {
    setErrorState(true);
    setErrorMessage("All fields are required.");
    return true;
  } else if (data.password.length < 6) {
    setErrorState(true);
    setErrorMessage("Password must be 6 characters or more");
    return true;
  } else if (!regex.test(data.email)) {
    setErrorState(true);
    setErrorMessage('Please enter a valid email "email@example.com"');
    return true;
  }
}
