import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { logOut } from "../helpers/slices/loginSlice";
import "../componentStyles/Header.css";

const Header = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["session_token"]);
  const dispatch = useDispatch();

  const signoutHandler = () => {
    removeCookie("session_token");
    dispatch(logOut());
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/myhobbies">My hobbies</Link>
          </li>
        </ul>
      </nav>
      <button className="signout" onClick={signoutHandler}>
        Log out
      </button>
    </header>
  );
};

export default Header;
