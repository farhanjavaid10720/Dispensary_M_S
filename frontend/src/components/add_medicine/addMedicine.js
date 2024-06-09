import "../dashboard/layout.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";

import {
  medicine,
  category,
  manufacturer,
  genericName,
} from "../constants/endpoints";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddMedicine = (props) => {
  const [medicine_name, setMedicine_Name] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [generic_name, setGeneric_name] = useState([]);
  const [selectedGeneric_Name, setSelectedGeneric_name] = useState("");
  const [manufacturer_name, setManufacturer_Name] = useState([]);
  const [selectedManufacturer_Name, setSelectedManufacturer_Name] =
    useState("");
  const navigate = useNavigate();

  const getDataFromDatabase = () => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      axios.get(category.read, header).then((res) => {
        setCategories(Object.values(res["data"]["data"]));
      });
      axios.get(genericName.read, header).then((res) => {
        setGeneric_name(Object.values(res["data"]["data"]));
      });
      axios.get(manufacturer.read, header).then((res) => {
        setManufacturer_Name(Object.values(res["data"]["data"]));
      });
    } catch (error) {
      console.error(
        "An error occurred while fetching data fromdatabase in addmedcicne.js : ",
        error
      );
    }
  };

  useEffect(() => {
    getDataFromDatabase();
  }, [medicine_name]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleGenericNameChange = (event) => {
    setSelectedGeneric_name(event.target.value);
  };
  const handleManufactureNameChange = (event) => {
    setSelectedManufacturer_Name(event.target.value);
  };

  const handleSubmit = () => {
    if (
      (medicine_name,
      selectedCategory,
      selectedGeneric_Name,
      selectedManufacturer_Name)
    ) {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const data = {
        medicine_name: medicine_name,
        category: selectedCategory,
        generic_name: selectedGeneric_Name,
        manufacturer_name: selectedManufacturer_Name,
      };

      axios.post(medicine.add, data, header).then(
        (res) => {
          if (res["data"]["error"] === 1) {
            toast.error(res["data"]["msg"], {
              autoClose: 5000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
          } else {
            setMedicine_Name("");
            setSelectedCategory("");
            setSelectedGeneric_name("");
            setSelectedManufacturer_Name("");
            toast.success(" Sales Record Is added", {
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
      <Breadcrumb className="mt-1">
        <Breadcrumb.Item>Medicine</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/medicine/add">Add</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-1">Add Medicine</h3>
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
                    placeholder="Medicine Name"
                    value={medicine_name}
                    onChange={(e) => {
                      setMedicine_Name(e.target.value);
                    }}
                    // onKeyPress={handleKeyPress}
                  />
                  <label for="floatingInput" className="text-black-50">
                    Medicine Name
                  </label>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                    <label for="floatingInput">Category</label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <select
                      value={selectedGeneric_Name}
                      onChange={handleGenericNameChange}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select a Generic Name</option>
                      {generic_name.map((generic) => (
                        <option key={generic.id} value={generic.id}>
                          {generic.generic_name}
                        </option>
                      ))}
                    </select>
                    <label for="floatingInput">Generic Name</label>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div class="form-floating mb-3">
                    <select
                      value={selectedManufacturer_Name}
                      onChange={handleManufactureNameChange}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Select a Manufacturer</option>
                      {manufacturer_name.map((manufacturer) => (
                        <option key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.manufacturer_name}
                        </option>
                      ))}
                    </select>
                    <label for="floatingInput">Manufacturer Name</label>
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
            navigate("/dashboard/medicine");
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

export default AddMedicine;
