import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUser } from "../../helpers/api/user";
import { registerFormInputErrorHandler } from "../../helpers/errorhandler/inputerror";
import { registersucess, registerfail } from "../../helpers/slices/registerSlice";
import { loginSuccess } from "../../helpers/slices/loginSlice";
import { useDispatch } from "react-redux";

import "../../componentStyles/Auth.css";

const Register = () => {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  // form submission handler
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (registerFormInputErrorHandler(input, setErrorState, setErrorMessage) === true) {
      return;
    }
    try {
      let inputData = { ...input, email: input.email.toLowerCase() };
      let registerUser = await createUser(inputData);
      if (registerUser.status === 409) {
        setErrorState(true);
        setErrorMessage(registerUser.msg);
        return;
      }
      if (registerUser.status === 200) {
        dispatch(registersucess(registerUser));

        //Automatically logs the user on successful registraion
        dispatch(loginSuccess(registerUser.data));
        history.push("/home");
        localStorage.setItem("email", registerUser.data.msg.email);
      } else {
        dispatch(registerfail(registerUser.email));
      }
    } catch (err) {}

    setInput({
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      email: "",
    });

    return;
  };

  //input change Handler
  const inputChangeHandler = (event) => {
    if (errorState) {
      setErrorMessage("");
      setErrorState(false);
    }
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="main">
      <div className="form-container">
        <h2>REGISTER</h2>
        <form className="form">
          <input
            placeholder="Enter you first name"
            type="text"
            name="firstname"
            onChange={inputChangeHandler}
            value={input.firstname}
            required
          />
          <input
            placeholder="Enter you last name"
            type="text"
            name="lastname"
            onChange={inputChangeHandler}
            value={input.lastname}
            required
          />
          <input
            placeholder="Enter your email address"
            type="email"
            name="email"
            onChange={inputChangeHandler}
            value={input.email}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            minLength={6}
            onChange={inputChangeHandler}
            value={input.password}
            required
          />
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            minLength={6}
            onChange={inputChangeHandler}
            value={input.confirmPassword}
            required
          />
          <button type="submit" onClick={formSubmitHandler}>
            Register
          </button>
          {errorState ? <p style={{ color: "red", fontSize: "small" }}>{errorMessage} </p> : <p></p>}
        </form>
        <p>
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
