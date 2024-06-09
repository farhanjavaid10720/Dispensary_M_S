import "../dashboard/layout.css";

import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";

import { category } from "../constants/endpoints";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AddCategory = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (categoryName) {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const data = {
        category_name: categoryName,
      };

      axios.post(category.add, data, header).then(
        (res) => {
          if (res["data"]["error"] === 1) {
            toast.error(res["data"]["msg"], {
              autoClose: 5000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
          } else {
            setCategoryName("");
            toast.success(" Sales Record Is added", {
              autoClose: 1000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });

            // window.location.reload();
          }
        },
        (err) => {
          toast.error(err, {
            autoClose: 5000,
            hideProgressBar: true,
            theme: "colored",
            progress: undefined,
          });
        }
      );
    } else {
      toast.error("All fields are required", {
        autoClose: 5000,
        hideProgressBar: true,
        theme: "colored",
        progress: undefined,
      });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      handleSubmit();
    }
  };

  return (
    <div className="container-fluid">
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item>Category</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/category/add">Add</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-2">Add Category</h3>
      <hr style={{ border: "1px solid black" }} />
      <br />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 ">
            <form>
              <div class="input-group mb-3">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingText"
                    placeholder="Manufacturer Name"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  <label for="floatingInput" className="text-black-50">
                    Category Name
                  </label>
                </div>

                <div className="col-12 mt-3">
                  <div class="d-flex justify-content-start">
                    <button
                      type="button"
                      class="btn btn-primary "
                      onClick={handleSubmit}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-start mt-5">
        <a
          type="button"
          class="btn text-primary"
          onClick={() => {
            navigate("/dashboard/category");
          }}
        >
          Back To List
        </a>
      </div>
      <br />
      <hr style={{ border: "1px solid black" }} />
    </div>
  );
};

export default AddCategory;