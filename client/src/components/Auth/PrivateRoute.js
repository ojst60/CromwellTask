import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Header";
import "../../componentStyles/PrivateRoute.css";

const PrivateRoute = ({ Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.login);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <div style={{height: "100vh", padding: 0, margin: 0,}}>
            <div className="header">
              <Header />
            </div>
            <div className="content">
              <Component />
            </div>
          </div>
        )
      }
    />
  );
};

export default PrivateRoute;
