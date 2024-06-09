import image1 from "./images/image3.jpg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../constants/endpoints";
import { toast } from "react-toastify";
import { logEvent } from "../audit_log/logService";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = props;
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const Auth = (e) => {
    e.preventDefault();
    axios.post(auth.login, { email: email, password: password }).then(
      (res) => {
        if (res["data"]["error"] === 1) {
          toast.error(res["data"]["msg"], {
            autoClose: 5000,
            hideProgressBar: true,
            theme: "colored",
            progress: undefined,
          });
        }
        if (res["data"]["error"] === 0) {
          const token = res["data"]["token"];

          window.localStorage.setItem("jwt", token);
          setAuth(true);
          const redirect_url =
            searchParams.get("redirect") == null
              ? "/dashboard"
              : searchParams.get("redirect");
          const name = res["data"]["userData"]["name"];
          const email = res["data"]["userData"]["email"];
          const image = res["data"]["userData"]["image"];
          console.log("here is the responce data from login page", name);
          logEvent(
            name,
            email,
            image,
            "User Login",
            "Login",
            `User '${name}' logged in.`
          );
          navigate(redirect_url);
        }
      },
      (err) => {
        toast.error("User Authentication Failed", {
          autoClose: 5000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
      }
    );
  };
  return (
    <section className="container py-1">
      <div className="container  py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={image1}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={Auth}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="bi bi-capsule-pill fa-3x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">DMS</span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div class="form-floating mb-4">
                        <input
                          type="email"
                          class="form-control form-control-lg"
                          id="floatingInput"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <label className="form-label" for="floatingInput">
                          Email address
                        </label>
                      </div>

                      <div class="form-floating mb-4 ">
                        <input
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          type="password"
                          class="form-control form-control-lg"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label className="form-label" for="floatingPassword">
                          Password
                        </label>
                      </div>
                      <div className="pt-1 mb-4 d-grid gap-2 ">
                        <button
                          className="btn btn-dark btn-lg w-100 "
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#393f81" }}>
                          Register here
                        </Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
