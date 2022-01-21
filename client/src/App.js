import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Homepage from "./components/Main/Homepage";
import Myhobbies from "./components/Main/Myhobbies";
import { loginSuccess, logOut } from "./helpers/slices/loginSlice";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["session_token"]);
  const dispatch = useDispatch();

  const isUserAuthenticated = () => {
    if (cookies["session_token"] && isLoading) {
      dispatch(loginSuccess(cookies["session_token"]));
      setIsLoading(false);
    } else if (!cookies["session_token"] && isLoading) {
      dispatch(logOut());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    isUserAuthenticated();
  }, []);

  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <PrivateRoute exact path="/home" Component={Homepage} />
            <PrivateRoute exact path="/myhobbies" Component={Myhobbies} />
            <Route render={() => <Redirect to={{ pathname: "/home" }} />} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
