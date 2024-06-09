import "../dashboard/layout.css";

import { useState } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";

import { supplier } from "../constants/endpoints";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddSupplier = (props) => {
  const [supplierName, setSupplierName] = useState("");
  const [contact_Number, setContact_Number] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (supplierName && contact_Number && email) {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const data = {
        supplier_name: supplierName,
        contact_number: contact_Number,
        email: email,
      };

      axios.post(supplier.add, data, header).then(
        (res) => {
          if (res["data"]["error"] === 1) {
            toast.error(res["data"]["msg"], {
              autoClose: 5000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
          } else {
            setSupplierName("");
            setContact_Number("");
            setEmail("");
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
  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault(); // Prevent the default form submission
  //     handleSubmit();
  //   }
  // };

  return (
    <div className="container-fluid">
      <Breadcrumb className="mt-2">
        <Breadcrumb.Item>Supplier</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/supplier/add">Add</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-2">Add Supplier</h3>
      <hr style={{ border: "1px solid black" }} />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-7 ">
            <form>
              <div class="input-group mb-3">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingText"
                    placeholder="Supplier Name"
                    value={supplierName}
                    onChange={(e) => {
                      setSupplierName(e.target.value);
                    }}
                    // onKeyPress={handleKeyPress}
                  />
                  <label for="floatingInput" className="text-black-50">
                    Supplier Name
                  </label>
                </div>
                <div className="col-12 mt-3">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingText"
                      placeholder="Contact Number"
                      value={contact_Number}
                      onChange={(e) => {
                        setContact_Number(e.target.value);
                      }}
                      // onKeyPress={handleKeyPress}
                    />
                    <label for="floatingInput" className="text-black-50">
                      Contact Number
                    </label>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      // onKeyPress={handleKeyPress}
                    />
                    <label for="floatingInput" className="text-black-50">
                      Email
                    </label>
                  </div>
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
            navigate("/dashboard/supplier");
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

export default AddSupplier;
