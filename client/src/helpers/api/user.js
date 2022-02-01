import axios from "axios";

const server = "http://localhost:3002";

export async function createUser(details) {
  const register = await axios.post(server + "/user/register", details, { withCredentials: true });
  let response = { status: register.data.status, msg: register.data.msg };
    console.log(22, response);
  return response;
}

export async function loginUser(details) {
  const login = await axios.post(server + "/user/login", details, { withCredentials: true });
  let response = { status: login.status, data: login.data };
  return response;
}

export async function getUserInfo() {
  const getInfo = await axios.get(server + "/user", {
    withCredentials: true,
  });
  return getInfo.data;
}
