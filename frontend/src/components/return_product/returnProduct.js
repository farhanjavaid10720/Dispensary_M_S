import SalesTable from "../shared/table_for_sale_component";
import React, { useState, useEffect, useContext } from "react";
import { Breadcrumb } from "rsuite";
import axios from "axios";
import { batch } from "../constants/endpoints";
import { ButtonToolbar, Button } from "rsuite";
import { Tooltip, Whisper } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import { logEvent } from "../audit_log/logService";
const ReturnProduct = () => {
  const { user, theme } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [dataFromId, setDataFromId] = useState([]);

  // const [tableData, setTableData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(390);
  const [tableHeight] = useState(200);

  const [showTable, setShowTable] = useState(false);

  const [tableMeta] = useState([
    {
      text: "Medicine_name",
      type: "text",
      dataKey: "medicine_name",
      search: true,
    },
    { text: "Sell_price", type: "text", dataKey: "sell_price", search: true },
    {
      text: "Quantity",
      type: "text",
      dataKey: "quantity",
      search: true,
    },
  ]);

  const FetchDataFromDatabase = () => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      axios.get(batch.read, header).then((res) => {
        setData(Object.values(res["data"]["data"]));
      });
    } catch (error) {
      console.error("An error occurred while fetching generic data: ", error);
    }
  };

  useEffect(() => {
    FetchDataFromDatabase();
  }, []);

  const fetchDataFromId = () => {
    const headers = {
      Authorization: localStorage.getItem("jwt"),
    };

    // Create an array to store the promises for each request
    const requests = checkedItems.map((id) =>
      axios.get(`/api/v1/batch/${id}`, {
        headers: headers,
      })
    );

    // Use Promise.all to wait for all requests to complete
    Promise.all(requests)
      // .then((responses) => {
      //   // Extract the data from each response
      //   const dataFromResponses = responses.map((res) => res.data.data);
      //   setDataFromId(dataFromResponses);
      // })
      .then((responses) => {
        // const dataFromResponses = responses.map((res) => {
        //   const data = res.data.data;
        //   console.log("here is the response from inside the function", data);

        //   // Define the criteria to choose which element from the data array to extract
        //   let indexToExtract = 0; // Default index to extract, change as needed

        //   // You can define your own criteria to choose which index to extract
        //   // For example, you can extract the second element if it exists (data[1])
        //   if (Array.isArray(data) && data.length > 1) {
        //     indexToExtract = 1; // Extract data[1]
        //   }

        //   // Extract medicine_name and sell_price based on the chosen index
        //   const { medicine_name, sell_price } = data[indexToExtract];

        //   return {
        //     // medicine_name: medicine_name || "N/A",
        //     // sell_price: sell_price || 0,
        //     medicine_name: medicine_name || "N/A",
        //     sell_price: sell_price || 0,
        //     quantity: 1, // Set the default quantity to 1
        //     amount: sell_price || 0,
        //   };
        // });

        // setDataFromId(dataFromResponses);
        const newData = [];

        responses.forEach((res) => {
          const data = res.data.data;

          // Define the criteria to choose which element from the data array to extract
          let indexToExtract = 0; // Default index to extract, change as needed

          // You can define your own criteria to choose which index to extract
          // For example, you can extract the second element if it exists (data[1])
          if (Array.isArray(data) && data.length > 1) {
            indexToExtract = 1; // Extract data[1]
          }

          // Extract medicine_name and sell_price based on the chosen index
          const { medicine_name, quantity, _id } = data[indexToExtract];

          const newItem = {
            _id: _id,
            medicine_name: medicine_name || "N/A",

            quantity: 0, // Set the default quantity to 1
          };

          // Check if the newItem is not already in dataFromId
          const isDuplicate = dataFromId.some(
            (item) => item.medicine_name === newItem.medicine_name
          );

          // If it's not a duplicate, add it to newData
          if (!isDuplicate) {
            newData.push(newItem);
          }
        });

        // Add the new data to the dataFromId state
        setDataFromId((prevData) => [...prevData, ...newData]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error here, such as displaying an error message to the user
      });
  };
  const handleDeleteRow = (index) => {
    // Filter the tableData to remove the row with the specified id
    // const updatedTableData = tableData.filter((item) => item.id !== id);
    // if (updatedTableData.length === 0) {
    //   setShowTable(false);
    //   setTotalAmount(0);
    //   setDiscount("");
    //   setDiscounted(0);
    //   setdiscountTotal(0);
    //   setPaid("");
    //   setReturn(0);
    // }
    // // Set the updated data in the state
    // setTableData(updatedTableData);
    const updatedData = [...dataFromId];
    updatedData.splice(index, 1); // Remove the row at the specified index
    if (updatedData.length === 0) {
      setDataFromId([]);
      setShowTable(false);
      setcheckedItems([]);
    }
    setDataFromId(updatedData);
  };
  //   useEffect(() => {
  //     fetchDataFromId();
  //     if (checkedItems.length > 0) {
  //       setShowTable(true);
  //     } else {
  //       setShowTable(false);
  //     }
  //   }, [checkedItems]);

  const handleListButton = async () => {
    await fetchDataFromId();
    if (checkedItems.length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  };
  const handleQuantityChange = (index, newQuantity) => {
    // Create a copy of the data array
    const updatedData = [...dataFromId];

    // Update the quantity for the specified row
    updatedData[index].quantity = parseInt(newQuantity);

    // Calculate the new amount based on the updated quantity and sell price
    // updatedData[index].amount = newQuantity * updatedData[index].sell_price;

    // Update the state with the modified array

    setDataFromId(updatedData);
  };
  const convertToTableString = (data) => {
    const headers = Object.keys(data[0]);
    const tableRows = data.map((item) => {
      return `[${headers.map((key) => `${key} : ${item[key]}`).join(", ")}]`;
    });
    return tableRows;
  };

  const UpdateRecord = async () => {
    try {
      if (!dataFromId || !Array.isArray(dataFromId)) {
        console.error("Invalid or missing dataFromId.");
        return;
      }

      const headers = {
        Authorization: localStorage.getItem("jwt"),
      };

      // Fetch quantities from the database, assuming you have an API endpoint to do this
      const response = await axios.get(batch.read, { headers });
      const databaseQuantities = response.data.data; // Assuming the response contains IDs and quantities

      // Create a map of IDs to quantities from the database
      const databaseQuantitiesMap = {};
      databaseQuantities.forEach((item) => {
        databaseQuantitiesMap[item._id] = item.quantity;
      });

      // Update quantities in dataFromId by matching IDs with database quantities
      // const updatedDataFromId = dataFromId.map((item) => {
      //   const updatedQuantity =
      //     item.quantity + (databaseQuantitiesMap[item._id] || 0);
      //   return {
      //     ...item,
      //     quantity: updatedQuantity,
      //   };
      // });
      const updatedDataFromId = dataFromId.map((item) => {
        const databaseQuantity = databaseQuantitiesMap[item._id] || 0;

        if (item.quantity > 0) {
          const updatedQuantity = item.quantity + databaseQuantity;
          return {
            ...item,
            quantity: updatedQuantity,
          };
        } else {
          // Handle the error case here. You can return an error object or throw an error.
          // For example, you can return an error object:
          return {
            ...item,
            error: "Quantity is not greater than zero.",
          };
        }
      });

      // Update the state with the modified array
      setDataFromId(updatedDataFromId);

      // Update quantities in the database if needed
      updatedDataFromId.forEach(async (item) => {
        const id = item._id; // Access the _id field from the item
        if (item.quantity > 0) {
          const data = {
            quantity: item.quantity, // Updated quantity
          };
          const headers = {
            Authorization: localStorage.getItem("jwt"),
          };

          const res = await axios.put(batch.update(id), data, { headers });

          if (res.status === 200) {
            toast.success(` "${item.medicine_name}" Return Record is updated`, {
              autoClose: 1000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            });
            const jsonString = JSON.stringify(dataFromId);
            const dataArray = JSON.parse(jsonString);
            const tableString = convertToTableString(dataArray);

            const dataString = JSON.stringify(tableString);
            logEvent(
              user.name,
              user.email,
              user.image,
              "Product or Products are returned",
              "Return",
              dataString,
              `User '${user.name}' Added a Returned Products.`
            );
            setDataFromId([]);
            setShowTable(false);
            FetchDataFromDatabase();
            // fetchDataFromId();
          }
        } else {
          toast.error(
            `"${item.medicine_name}" quantity should be greater than zero`,
            {
              autoClose: 1000,
              hideProgressBar: true,
              theme: "colored",
              progress: undefined,
            }
          );
        }
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  /************ for sale component******** */

  const navigate = useNavigate();
  const Navigation = () => {
    navigate("/dashboard/sales");
  };

  if (theme === "dark") {
    var divBg = "bg-dark";
    var tableTheme = "table table-dark table-bordered table-hover";
    var cardbdy = "card shadow rounded border border-dark";
    var cardbdy2 = "card-body bg-dark";
  } else if (theme === "light") {
    tableTheme = "table table-light table-bordered table-hover";
    divBg = "bg-light";
    cardbdy = "card shadow rounded border border-light";
    cardbdy2 = "card-body bg-light";
  }
  return (
    <div className="container-fluid">
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item>Sales</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/sales/return">Return</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-2">Return Products</h3>
      <div>
        <div className={cardbdy}>
          <div class={cardbdy2}>
            <SalesTable
              checkedItems={setcheckedItems}
              defaultData={data}
              headers={tableMeta}
              columnWidth={columnWidth}
              tableHeight={tableHeight}
              // inputRef={inputRef}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="card-body p-0 d-flex justify-content-end my-2">
          <div className="me-5">
            <ButtonToolbar className="align-center">
              <Whisper
                placement="top"
                controlId="control-id-hover"
                trigger="hover"
                speaker={<Tooltip>Press "Ctrl + a" For Return .</Tooltip>}
              >
                <Button
                  size="lg"
                  appearance="primary"
                  onClick={handleListButton}
                >
                  Add To List
                </Button>
              </Whisper>
            </ButtonToolbar>
          </div>
        </div>
      </div>
      <div>
        <div className={cardbdy}>
          <div class={cardbdy2}>
            <div
              style={{
                backgroundColor: "#34495e",
                color: "white",
                padding: "10px",
              }}
            >
              Return Items List
            </div>
            <div
              id="orderItems"
              tabIndex="0"
              style={{
                overflowY: "scroll",
                border: "1px solid #BFAEAE",
              }}
            >
              {showTable && (
                <table className={tableTheme}>
                  <thead>
                    <tr>
                      <th scope="col">Medicine Name</th>

                      <th scope="col">Quantity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {dataFromId.map((item, index) => (
                      <tr key={index}>
                        {/* Access object properties correctly */}
                        <td>{item.medicine_name}</td>
                        <td>
                          <input
                            className="form-control"
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteRow(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="card-body p-0 d-flex justify-content-end mt-4">
          <div className="me-5">
            <ButtonToolbar className="align-center">
              <Whisper
                placement="top"
                controlId="control-id-hover"
                trigger="hover"
                speaker={<Tooltip>Press "Ctrl + s" For Sales .</Tooltip>}
              >
                <Button size="lg" appearance="primary" onClick={Navigation}>
                  Back To Sales
                </Button>
              </Whisper>
            </ButtonToolbar>
          </div>
          <div className="me-5">
            <ButtonToolbar className="align-center">
              <Whisper
                placement="top"
                controlId="control-id-hover"
                trigger="hover"
                speaker={<Tooltip>Press "Ctrl + a" For Return .</Tooltip>}
              >
                <Button
                  size="lg"
                  appearance="primary"
                  color="green"
                  onClick={UpdateRecord}
                >
                  Click To Return
                </Button>
              </Whisper>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnProduct;
