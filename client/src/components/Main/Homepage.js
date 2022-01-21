import React, { useEffect } from "react";
import { getUserInfo } from "../../helpers/api/user";

const Homepage = () => {
  const [userInfo, setUserInfo] = React.useState(null);

  useEffect(() => {
    getUserInfo().then((res) => setUserInfo(res));
  }, []);

  return (
    <>
      {userInfo ? (
        <div style={{ textAlign: "center" }}>
          <h1>Welcome to the homepage</h1>
          <p>
            My name is {userInfo.firstname} and surname is {userInfo.lastname}
          </p>
          <p>This is my fake email: {userInfo.email}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Homepage;
