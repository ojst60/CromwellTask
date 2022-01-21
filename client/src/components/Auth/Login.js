import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../helpers/api/user";
import { loginSuccess } from "../../helpers/slices/loginSlice";
import { useDispatch } from "react-redux";
import { loginFormInputErrorHandler } from "../../helpers/errorhandler/inputerror";
import "../../componentStyles/Auth.css";

const Login = () => {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const inputHandler = (event) => {
    setErrorState(false);
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (loginFormInputErrorHandler(inputData, setErrorState, setErrorMessage) === true) {
      return true;
    }
    try {
      let loginData = { ...inputData, email: inputData.email.toLowerCase() };
      let user = await loginUser(loginData);
      if (user.status === 200) {
        const email = user.data.msg.email;
        localStorage.setItem("email", email);
        dispatch(loginSuccess(user.data));
        history.push("/home");
        return;
      }
    } catch (err) {}

    setInputData({ password: "", email: "" });

    return;
  };

  return (
    <div className="main">
      <div className="form-container">
        <h2>Login.</h2>
        <form className="form">
          <input placeholder="Email" type="text" name="email" value={inputData.email} onChange={inputHandler} required />
          <input placeholder="password" type="password" name="password" value={inputData.password} onChange={inputHandler} required />
          <button type="submit" onClick={formSubmitHandler}>
            Login
          </button>
          {errorState ? <p style={{ color: "red", fontSize: "small" }}>{errorMessage} </p> : <p></p>}
        </form>
        <p>
          Not registered yet? <Link to="/register">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
