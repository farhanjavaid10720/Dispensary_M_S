import axios from "axios";
import { Logout } from "./components/Auth/Auth";
import { auth } from "./components/constants/endpoints";
axios.interceptors.response.use(
  (response) => {
    // console.log("----------interceptor-------------");
    // console.log(response);
    // console.log("----------interceptor-------------");
    // if (
    //   response["data"]["msg"] === "invalid token" ||
    //   response["data"]["msg"] === "Unexpected token"
    // ) {
    //   // Logout();
    // } else {
    return response;
    // }
  },
  (err) => {
    const req_url = err["config"]["url"];

    if (err["response"]["status"] === 401 && req_url === auth.login) {
      localStorage.clear();
    } else if (err["response"]["status"] === 401) {
      Logout();
    }

    return Promise.reject(err);
  }
);

export default axios;
