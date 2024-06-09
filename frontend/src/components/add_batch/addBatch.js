import "../dashboard/layout.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";

import { batch, supplier, medicine } from "../constants/endpoints";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CustomProvider } from "rsuite";

const AddBatch = (props) => {
  const [batch_Id, setBatch_Id] = useState("");
  const [supplieres, setSupplieres] = useState([]);
  const [selectedSupplieres, setSelectedSupplieres] = useState("");
  const [medicine_name, setMedicine_Name] = useState([]);
  const [selectedMedicine_Name, setSelectedMedicine_Name] = useState("");

  const [quantity, setQuantity] = useState("");
  const [cost_Price, setCost_Price] = useState("");
  const [sell_Price, setSell_Price] = useState("");
  const [production_Date, setProduction_Date] = useState("");
  const [expire_Date, setExpire_Date] = useState("");
  const navigate = useNavigate();

  const getDataFromDatabase = async () => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      axios.get(medicine.read, header).then((res) => {
        setMedicine_Name(Object.values(res["data"]["data"]));
      });
      axios.get(supplier.read, header).then((res) => {
        setSupplieres(Object.values(res["data"]["data"]));
      });
    } catch (error) {
      console.error(
        "An error occurred while fetching batch data in addbatch.js: ",
        error
      );
    }
  };

  useEffect(() => {
    getDataFromDatabase();
  }, [batch_Id]);

  const handleSuppliersChange = (event) => {
    setSelectedSupplieres(event.target.value);
  };
  const handleMedicineChange = (event) => {
    setSelectedMedicine_Name(event.target.value);
  };

  const handleSubmit = () => {
    if (
      batch_Id &&
      selectedMedicine_Name &&
      selectedSupplieres &&
      quantity &&
      cost_Price &&
      sell_Price &&
      production_Date &&
      expire_Date
    ) {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const data = {
        batch_id: batch_Id,
        supplier_name: selectedSupplieres,
        medicine_name: selectedMedicine_Name,
        quantity: quantity,
        cost_price: cost_Price,
        sell_price: sell_Price,
        production_date: production_Date,
        expire_date: expire_Date,
      };

      axios.post(batch.add, data, header).then(
        (res) => {
          if (res["data"]["error"] === 1) {
            toast.error(res["data"]["msg"], {
              autoClose: 5000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
          } else {
            setBatch_Id("");
            setSelectedSupplieres("");
            setSelectedMedicine_Name("");
            setQuantity("");
            setCost_Price("");
            setSell_Price("");
            setProduction_Date("");
            setExpire_Date("");
            toast.success(" Batch Record Is added", {
              autoClose: 1000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
            getDataFromDatabase();
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
      toast.error("Please fill all the fields", {
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
      <Breadcrumb className="mt-1">
        <Breadcrumb.Item>Batch</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/batch/add">Add</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-1">Add Batch</h3>
      <hr style={{ border: "1px solid black" }} />

      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-7 ">
            <form>
              <div class="input-group mb-3">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingText"
                    placeholder="Batch Id"
                    value={batch_Id}
                    onChange={(e) => {
                      setBatch_Id(e.target.value);
                    }}
                    // onKeyPress={handleKeyPress}
                  />
                  <label className="text-black-50" for="floatingInput">
                    Batch Id
                  </label>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <select
                      value={selectedSupplieres}
                      onChange={handleSuppliersChange}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select a Supplier</option>
                      {supplieres.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.supplier_name}
                        </option>
                      ))}
                    </select>
                    <label for="floatingInput">Supplier</label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <select
                      value={selectedMedicine_Name}
                      onChange={handleMedicineChange}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select a Medicine Name</option>
                      {medicine_name.map((medicine) => (
                        <option key={medicine.id} value={medicine.id}>
                          {medicine.medicine_name}
                        </option>
                      ))}
                    </select>
                    <label for="floatingInput">Medicine Name</label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingText"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      // onKeyPress={handleKeyPress}
                    />
                    <label className="text-black-50" for="floatingInput">
                      Quantity
                    </label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingText"
                      placeholder="Cost Price"
                      value={cost_Price}
                      onChange={(e) => {
                        setCost_Price(e.target.value);
                      }}
                      // onKeyPress={handleKeyPress}
                    />
                    <label className="text-black-50" for="floatingInput">
                      Cost Price
                    </label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingText"
                      placeholder="Sell Price"
                      value={sell_Price}
                      onChange={(e) => {
                        setSell_Price(e.target.value);
                      }}
                      // onKeyPress={handleKeyPress}
                    />
                    <label className="text-black-50" for="floatingInput">
                      Sell Price
                    </label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      type="date"
                      id="datePicker"
                      value={production_Date}
                      onChange={(e) => {
                        setProduction_Date(e.target.value);
                      }}
                    />
                    <label for="floatingInput">Production Date</label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      type="date"
                      id="datePicker"
                      value={expire_Date}
                      onChange={(e) => {
                        setExpire_Date(e.target.value);
                      }}
                    />
                    <label for="floatingInput">Expire Date</label>
                  </div>
                </div>
                <div className="col-12 mt-1">
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
      <div class="d-flex justify-content-start mt-2">
        <a
          type="button"
          class="btn text-primary"
          onClick={() => {
            navigate("/dashboard/batch");
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

export default AddBatch;
