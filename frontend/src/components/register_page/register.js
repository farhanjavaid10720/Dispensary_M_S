import "./register.css";
import image1 from "../login_page/images/image3.jpg";
import { Link } from "react-router-dom";
import ImageUpload from "../image_upload/imageUpload";
const Register = () => {
  return (
    <section className="container py-1">
      <div className="container  py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-7 d-flex align-items-center ">
                  <div className="card-body p-5 p-lg-5 text-black ">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="bi bi-capsule-pill fa-3x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">DMS</span>
                      </div>
                      <h1
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign Up
                      </h1>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          id="floatingInput"
                          placeholder="Name"
                        />
                        <label className="form-label" for="floatingInput">
                          Name
                        </label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          class="form-control form-control-lg"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label className="form-label" for="floatingInput">
                          Email address
                        </label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          id="floatingInput"
                          placeholder="Age"
                        />
                        <label className="form-label" for="floatingInput">
                          Age
                        </label>
                      </div>

                      <div class="form-floating mb-2 ">
                        <input
                          type="password"
                          class="form-control form-control-lg"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label className="form-label" for="floatingPassword">
                          Password
                        </label>
                      </div>
                      <div className="pt-1 mb-2 d-grid gap-2 ">
                        <Link to="/dashboard">
                          <button
                            className="btn btn-dark btn-lg w-100 "
                            type="button"
                          >
                            Sign Up
                          </button>
                        </Link>
                      </div>

                      <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
                        Have an account?{" "}
                        <Link to="/" style={{ color: "#393f81" }}>
                          Login here
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
                <div className="col-md-6 col-lg-5 d-none d-md-block border-start">
                  <ImageUpload />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
