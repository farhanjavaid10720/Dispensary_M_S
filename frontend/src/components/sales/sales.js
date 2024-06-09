import "../dashboard/layout.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for styling
import axios from "axios";
import { sales, batch } from "../constants/endpoints";
import { toast } from "react-toastify";
import { Modal, ButtonToolbar, Button } from "rsuite";
import SalesTable from "../shared/table_for_sale_component";

import { Tooltip, Whisper } from "rsuite";
import { useReactToPrint } from "react-to-print";
import { AppContext } from "../Context/AppContext";
import { json, useNavigate } from "react-router-dom";
import { logEvent } from "../audit_log/logService";
const PrintableReceipt = ({
  updatedInvoice,
  selectedDate,
  discount,
  dataFromId,
  discountTotal,
  paid,
  returned,
  componentRef,
  // printableAreaRef, // Pass the ref as a prop
}) => {
  return (
    <div ref={componentRef} className="printable-receipt">
      <h1>Medicine Receipt</h1>
      <p>Invoice Number: {updatedInvoice}</p>
      <p>Date: {selectedDate.toLocaleDateString()}</p>
      <p>Discount: {discount}</p>
      <table className="table1 table table-bordered">
        <thead>
          <tr>
            <th className="td1 col">Medicine Name</th>
            <th className="td1 col">Price</th>
            <th className="td1 col">Quantity</th>
            <th className="td1 col">Subtotal</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {dataFromId.map((item, index) => (
            <tr key={index}>
              <td className="td1">{item.medicine_name}</td>
              <td className="td1">{item.sell_price}</td>
              <td className="td1">{item.quantity}</td>
              <td className="td1">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Amount: {discountTotal}</p>
      <p>Amount Paid: {paid}</p>
      <p>Return Amount: {returned}</p>
    </div>
  );
};
const Sale = (props) => {
  const { user, theme } = useContext(AppContext);
  const [invoice, setInvoice] = useState("");
  const [updatedInvoice, setUpdateInvoice] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState([]);
  // const [sellprice, setSellprice] = useState("");
  // // const [random, setRandom] = useState("");
  // const amount = useRef("null");

  const [showTable, setShowTable] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState("");
  const [discounted, setDiscounted] = useState(0);
  const [discountTotal, setdiscountTotal] = useState(0);
  const [paid, setPaid] = useState("");
  const [returned, setReturn] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [convertedLastDate, setConvertedLastDate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const [clearQuantity, setClearQuantity] = useState(true);

  const [data, setData] = useState([]);
  const [dataFromId, setDataFromId] = useState([]);
  // const [tableData, setTableData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(400);
  const [tableHeight] = useState(400);
  const [tableMeta] = useState([
    {
      text: "Medicine_name",
      type: "text",
      dataKey: "medicine_name",
      search: true,
    },
    { text: "Sell_price", type: "text", dataKey: "sell_price", search: true },
    { text: "Quantity", type: "text", dataKey: "quantity", search: true },
  ]);

  const fetchDataForTable = async () => {
    // const header = {
    //   headers: {
    //     Authorization: localStorage.getItem("jwt"),
    //   },
    // };
    // axios.get(batch.read, header).then((res) => {
    //   setData(Object.values(res["data"]["data"]));
    // });
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const response = await axios.get(batch.read, header);

      if (response.status === 200) {
        const responseData = response.data.data; // Assuming data is a property of the response
        const values = Object.values(responseData);
        setData(values);
      } else {
        console.error(
          "Failed to fetch generic data. Status code: ",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching generic data: ", error);
    }
  };

  useEffect(() => {
    fetchDataForTable();
  }, []);

  const handleOpen = (value) => {
    setSize(value);
    fetchDataForTable();

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getDataFromDatabase = () => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      axios.get(sales.invoice, header).then((res) => {
        if (res && res.data) {
          setInvoice(res["data"]);
        } else {
          console.error("Invalid or missing data in the response.");
        }
      });
      axios.get(sales.date, header).then((res) => {
        if (res && res.data) {
          setLastDate(res["data"]);
        } else {
          console.error("Invalid or missing data in the response.");
        }
      });
    } catch (error) {
      console.error(
        "An error occurred while fetching lastinvoice and lastdate: ",
        error
      );
    }
  };

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
          const { medicine_name, sell_price, _id } = data[indexToExtract];

          const newItem = {
            _id: _id,
            medicine_name: medicine_name || "N/A",
            sell_price: sell_price || 0,
            quantity: 1, // Set the default quantity to 1
            amount: sell_price || 0,
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

  // useEffect(() => {
  //   fetchDataFromId();
  // }, [checkedItems]);

  const dateConvert = () => {
    const date = new Date(lastDate);

    // Extract year, month, and day
    const year = date.getFullYear();
    // Note: getMonth() returns a zero-based month, so we add 1 to it.
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Format the result
    const formattedDate = `${year}${month}${day}`;
    setConvertedLastDate(formattedDate);
    // Output: "20230914"
  };
  useEffect(() => {
    getDataFromDatabase();
    dateConvert();
  });

  // const handleInvoice = () => {
  //   const currentDate = new Date();
  //   const formattedDate = currentDate
  //     .toISOString()
  //     .slice(0, 10)
  //     .replace(/-/g, ""); // Format as YYYYMMDD

  //   let lastNumber = parseInt(invoice.split("-")[2]);

  //   if (isNaN(lastNumber)) {
  //     lastNumber = 0;
  //   }
  //   console.log(lastNumber);
  //   const nextNumber = lastNumber + 1;
  //   const nextInvoiceNumber = `grt-${formattedDate}-${nextNumber
  //     .toString()
  //     .padStart(4, "0")}`;
  //   return nextInvoiceNumber;
  // };

  // let lastDate = useRef(""); // Variable to store the last formatted date

  // const handleInvoice = () => {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear().toString();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1
  //   const day = currentDate.getDate().toString().padStart(2, "0");

  //   const formattedDate = year + month + day;
  //   let lastNumber;
  //   if (formattedDate !== lastDate.current) {
  //     // If it's a new day, reset the incrementing number to 0
  //     lastDate.current = formattedDate;
  //     lastNumber = 0;
  //   }
  //   lastNumber = parseInt(invoice.split("-")[2]);

  //   if (isNaN(lastNumber)) {
  //     lastNumber = 0;
  //   }

  //   const nextNumber = lastNumber + 1;
  //   const nextInvoiceNumber = `grt-${formattedDate}-${nextNumber
  //     .toString()
  //     .padStart(4, "0")}`;

  //   return nextInvoiceNumber;
  // };
  // let lastDate = useRef(""); // Variable to store the last formatted date

  const handleInvoice = () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1
      const day = currentDate.getDate().toString().padStart(2, "0");

      const formattedDate = year + month + day;

      let lastNumber = parseInt(invoice.split("-")[2]);

      if (isNaN(lastNumber) || formattedDate !== convertedLastDate) {
        // If it's a new day or lastNumber is NaN, reset the incrementing number to 0
        // lastDate.current = formattedDate;
        lastNumber = 0;
      }
      // console.log("here is the last date", lastDate);
      const nextNumber = lastNumber + 1;
      const nextInvoiceNumber = `grt-${formattedDate}-${nextNumber
        .toString()
        .padStart(4, "0")}`;

      return nextInvoiceNumber;
    } catch (error) {
      console.error(
        "An error occurred while handling invoice data in sale.js: ",
        error
      );
    }
  };

  const updateInvoiceNumber = () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1
      const day = currentDate.getDate().toString().padStart(2, "0");

      const formattedDate = year + month + day;

      let lastNumber = parseInt(invoice.split("-")[2]);

      if (isNaN(lastNumber) || formattedDate !== convertedLastDate) {
        lastNumber = 0;
      }

      const nextNumber = lastNumber + 1;
      const nextInvoiceNumber = `grt-${formattedDate}-${nextNumber
        .toString()
        .padStart(4, "0")}`;

      setUpdateInvoice(nextInvoiceNumber);
    } catch (error) {
      console.error(
        "An error occurred while updating invoice Data in sale.js : ",
        error
      );
    }
  };

  useEffect(() => {
    updateInvoiceNumber();
  });
  // const handleInvoice = (e) => {
  //   const randomNumber = _.random(1, 100000000000000);

  //   setInvoice(randomNumber);
  // };
  // const handleDateChange = (newDate) => {
  //   setSelectedDate(newDate);
  // };

  useEffect(() => {
    // Get the current date and time based on the user's system
    const currentDateTime = new Date();

    // Set the selectedDate state with the current date and time
    setSelectedDate(currentDateTime);
  }, []);

  // const handleProduct = (e) => {
  //   const newProduct = e.target.value;
  //   setProduct(newProduct);
  // };
  // const handleQuantity = (e) => {
  //   setQuantity(e.target.value);
  // };
  // const handleSellPrice = (e) => {
  //   setSellprice(e.target.value);
  // };

  // const result = quantity * sellprice;
  // amount.current = result;

  const handleButtonClick = async () => {
    await fetchDataFromId();

    setShowTable(true);
    handleClose();
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
      setTotalAmount(0);
      setDiscount("");
      setDiscounted(0);
      setdiscountTotal(0);
      setPaid("");
      setReturn(0);
    }
    setDataFromId(updatedData);
  };

  const handleQuantityChange = (index, newQuantity) => {
    // Create a copy of the data array
    const updatedData = [...dataFromId];

    // Update the quantity for the specified row
    updatedData[index].quantity = parseInt(newQuantity);

    // Calculate the new amount based on the updated quantity and sell price
    updatedData[index].amount = newQuantity * updatedData[index].sell_price;

    // Update the state with the modified array
    setQuantity(updatedData);
    setDataFromId(updatedData);
  };
  const handleCalculateTotal = () => {
    // Calculate the total amount by summing up the amounts from all rows
    const calculatedTotal = dataFromId.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    // Update the total amount state
    setTotalAmount(calculatedTotal);
    setdiscountTotal(calculatedTotal);
    UpdateRecord();
  };
  const handleDiscount = (e) => {
    const newValue = e.target.value; // Get the new input value from the event
    // Check if newValue is a valid number, and if not, set it to an empty string
    setDiscount(isNaN(newValue) ? "" : newValue);

    // Pass the updated discount value to handleApplyDiscount
    handleApplyDiscount(newValue);
  };

  const handleApplyDiscount = (newDiscount) => {
    // Step 4: Apply the discount percentage using newDiscount

    const discountedTotal = totalAmount * (1 - newDiscount / 100);

    // Ensure the discounted total doesn't go below zero
    const finalTotal = Math.max(discountedTotal, 0);

    // Update the total amount state with the discounted value
    setdiscountTotal(parseInt(finalTotal));
    setDiscounted(parseInt(totalAmount - finalTotal));
  };

  const handlePaid = (e) => {
    const newValue = e.target.value; // Get the new input value from the event
    // Check if newValue is a valid number, and if not, set it to an empty string
    setPaid(isNaN(newValue) ? "" : newValue);

    handleApplyReturn(newValue);
  };

  const handleApplyReturn = (newReturn) => {
    const parsedNewReturn = parseFloat(newReturn);
    const parsedTotalAmount = parseFloat(totalAmount);
    const parsedDiscountTotal = parseFloat(discountTotal);

    // Check if either value is not a valid number
    if (isNaN(parsedNewReturn) || isNaN(parsedTotalAmount)) {
      setReturn(0);
    } else {
      // Calculate the return value

      // if (discountTotal === " ") {
      //   const returnedValue = parsedNewReturn - parsedTotalAmount;

      //   // Ensure the return value doesn't go below zero
      //   const finalReturn = Math.max(returnedValue, 0);

      //   // Update the return state with the calculated value
      //   setReturn(finalReturn);
      // } else {
      const returnedValue = parsedNewReturn - parsedDiscountTotal;

      // Ensure the return value doesn't go below zero
      const finalReturn = Math.max(returnedValue, 0);

      // Update the return state with the calculated value
      setReturn(finalReturn);
      // }
    }
  };

  /************ for handling quantity******** */
  const updatedDataFromId = useRef([]);
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
      updatedDataFromId.current = dataFromId.map((item) => {
        const databaseQuantity = databaseQuantitiesMap[item._id] || 0;
        let updatedQuantity;

        if (
          item.quantity < databaseQuantity ||
          item.quantity === databaseQuantity
        ) {
          setClearQuantity(true);
          updatedQuantity = databaseQuantity - item.quantity;
        } else {
          setClearQuantity(false);
          return databaseQuantity; // Don't update the quantity
        }

        return {
          ...item,
          quantity: updatedQuantity,
        };
      });

      // Update the state with the modified array
      // setDataFromId(updatedDataFromId.current);

      // Update quantities in the database if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  const saveRecord = () => {
    try {
      updatedDataFromId.current.forEach(async (item) => {
        const id = item._id; // Access the _id field from the item
        const data = {
          quantity: item.quantity, // Updated quantity
        };
        const headers = {
          Authorization: localStorage.getItem("jwt"),
        };

        const res = await axios.put(batch.update(id), data, { headers });

        if (res.status === 200) {
          toast.success("Inventory Record is updated", {
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored",
            progress: undefined,
          });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };
  const convertToTableString = (data) => {
    const headers = Object.keys(data[0]);
    const tableRows = data.map((item) => {
      return `[${headers.map((key) => `${key} : ${item[key]}`).join(", ")}]`;
    });
    return tableRows;
  };

  const handleSubmit = () => {
    try {
      if (clearQuantity === true) {
        if (totalAmount !== 0 && paid !== "") {
          if (paid >= discountTotal) {
            const newInvoiceNumber = handleInvoice();
            const header = {
              headers: {
                Authorization: localStorage.getItem("jwt"),
              },
            };
            const data = {
              invoice_number: newInvoiceNumber,
              entry_date: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),

              total_amount: totalAmount,
              discount: discount,
              discount_amount: discounted,
              total_payable: discountTotal,
              paid: paid,
              return_amount: returned,
            };

            // const fd = new FormData();
            // fd.append("image", image);
            // fd.append("data", JSON.stringify(data));
            axios.post(sales.add, data, header).then(
              (res) => {
                if (res["data"]["error"] === 1) {
                  toast.error(res["data"]["msg"], {
                    autoClose: 5000,
                    hideProgressBar: true,
                    theme: "colored",
                    progress: undefined,
                  });
                } else {
                  const jsonString = JSON.stringify(dataFromId);
                  const dataArray = JSON.parse(jsonString);
                  const tableString = convertToTableString(dataArray);

                  const dataString = JSON.stringify(tableString);

                  logEvent(
                    user.name,
                    user.email,
                    user.image,
                    "New sale is added",
                    "New Sale",
                    dataString,
                    `User '${user.name}' Add a new sale and its Invoice Number is ${updatedInvoice}.`
                  );
                  setUpdateInvoice("");
                  setShowTable(false);
                  // setTableData([]);
                  setDataFromId([]);
                  setTotalAmount(0);
                  setDiscount("");
                  setDiscounted(0);
                  setdiscountTotal(0);
                  setPaid("");
                  setReturn(0);
                  toast.success(" Sales Record Is added", {
                    autoClose: 1000,
                    hideProgressBar: true,
                    theme: "colored",
                    progress: undefined,
                  });
                  // window.location.reload();
                  handlePrint();
                  saveRecord();
                  updateInvoiceNumber();
                  getDataFromDatabase();
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
            toast.error(
              "paid amount should be greater than or equal to total Amount ",
              {
                autoClose: 5000,
                hideProgressBar: true,
                theme: "colored",
                progress: undefined,
              }
            );
          }
        } else {
          toast.error("All fields Should be filled", {
            autoClose: 5000,
            hideProgressBar: true,
            theme: "colored",
            progress: undefined,
          });
        }
      } else {
        toast.error("Your Stock Is Low", {
          autoClose: 5000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
      }
    } catch {
      toast.error("Error", {
        autoClose: 5000,
        hideProgressBar: true,
        theme: "colored",
        progress: undefined,
      });
    }
  };
  const inputRef = useRef(null);
  const handleKeySearch = (e) => {
    // Check if "Control" key is pressed along with "S" key
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault(); // Prevent the default browser behavior
      inputRef.current.focus(); // Focus the input field
    }
  };

  const handleKeyProceed = (e) => {
    // Check if "Control" key is pressed along with "S" key
    if ((e.ctrlKey || e.metaKey) && e.key === "f") {
      e.preventDefault(); // Prevent the default form submission
      handleCalculateTotal();
    }
  };
  const handleKeyPress = (e) => {
    // Check if "Control" key (or "Command" key on macOS) is pressed along with "A" key
    if ((e.ctrlKey || e.metaKey) && e.key === "o") {
      e.preventDefault(); // Prevent the default selection behavior
      handleOpen("full"); // Call the handleShowTable function
    }
  };
  const handleSubmitKey = (e) => {
    // Check if "Control" key (or "Command" key on macOS) is pressed along with "A" key
    if ((e.ctrlKey || e.metaKey) && e.key === "p") {
      e.preventDefault(); // Prevent the default selection behavior
      handleSubmit(); // Call the handleShowTable function
    }
  };

  const handleCartKey = (e) => {
    // Check if "Control" key (or "Command" key on macOS) is pressed along with "A" key
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      e.preventDefault(); // Prevent the default selection behavior
      handleButtonClick(); // Call the handleShowTable function
    }
  };

  const handleCancelKey = (e) => {
    // Check if "Control" key (or "Command" key on macOS) is pressed along with "A" key
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      e.preventDefault(); // Prevent the default selection behavior
      handleClose(); // Call the handleShowTable function
    }
  };

  const discountRef = useRef(null);
  const handleDiscountKey = (e) => {
    if (e.ctrlKey && e.key === "d") {
      e.preventDefault(); // Prevent the default browser behavior
      discountRef.current.focus(); // Focus the input field
    }
  };

  const paidRef = useRef(null);
  const handleKeyPaid = (e) => {
    // Check if "Control" key is pressed along with "S" key
    if ((e.ctrlKey || e.metaKey) && e.key === "e") {
      e.preventDefault(); // Prevent the default browser behavior
      paidRef.current.focus();
    }
  };

  const returnRef = useRef(null);
  const returnKeyPaid = (e) => {
    // Check if "Control" key is pressed along with "S" key
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
      e.preventDefault(); // Prevent the default browser behavior
      returnRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", handleCancelKey);
    document.addEventListener("keydown", handleCartKey);
    document.addEventListener("keydown", handleKeySearch);
    document.addEventListener("keydown", handleKeyProceed);
    document.addEventListener("keydown", handleSubmitKey);
    document.addEventListener("keydown", handleDiscountKey);
    document.addEventListener("keydown", handleKeyPaid);
    document.addEventListener("keydown", returnKeyPaid);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keydown", handleCancelKey);
      document.removeEventListener("keydown", handleCartKey);
      document.removeEventListener("keydown", handleKeySearch);
      document.removeEventListener("keydown", handleKeyProceed);
      document.removeEventListener("keydown", handleSubmitKey);
      document.removeEventListener("keydown", handleDiscountKey);
      document.removeEventListener("keydown", handleKeyPaid);
      document.removeEventListener("keydown", returnKeyPaid);
    };
  });

  // ... (rest of the component)

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1); // Initialize with -1 for no selection

  const tableRef = useRef(null); // Ref for the table element

  // Handle arrow key presses to navigate through rows
  // const handleWSKeyPress = (event) => {
  //   if (!showTable) return; // Only handle key presses when the table is visible

  //   if (event.key === "w" && selectedRowIndex > 0) {
  //     // Move selection up
  //     setSelectedRowIndex(selectedRowIndex - 1);
  //   } else if (event.key === "s" && selectedRowIndex < dataFromId.length - 1) {
  //     // Move selection down
  //     setSelectedRowIndex(selectedRowIndex + 1);
  //   }
  // };
  // Handle Delete key press to delete the selected row
  const handleDeleteKeyPress = (event) => {
    if (!showTable) return; // Only handle key press when the table is visible

    if (event.key === "Delete" && selectedRowIndex >= 0) {
      // Delete the selected row
      handleDeleteRow(selectedRowIndex);
    }
  };

  // Handle "Q" key press to focus on the quantity input field of the selected row
  const handleQKeyPress = (event) => {
    if (!showTable || event.key !== "q" || selectedRowIndex === -1) return;

    const rows = tableRef.current.querySelectorAll("tbody tr");
    if (rows.length > selectedRowIndex) {
      const quantityInput = rows[selectedRowIndex].querySelector("input");
      if (quantityInput) {
        quantityInput.focus();
      }
    }
  };

  // Add event listeners for arrow keys, delete key, and "Q" key
  useEffect(() => {
    // const tableElement = tableRef.current;

    // if (tableElement) {
    //   tableElement.setAttribute("tabIndex", "0");
    //   tableElement.focus();
    //   tableElement.addEventListener("keydown", handleWSKeyPress);

    //   // Clean up event listener when the component unmounts
    //   return () => {
    //     tableElement.removeEventListener("keydown", handleWSKeyPress);
    //   };
    // }
    document.addEventListener("keydown", handleDeleteKeyPress);
    document.addEventListener("keydown", handleQKeyPress);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleDeleteKeyPress);
      document.removeEventListener("keydown", handleQKeyPress);
    };
  }, [selectedRowIndex, showTable]);

  // Focus on the table element when the selectedRowIndex changes
  useEffect(() => {
    if (tableRef.current && selectedRowIndex >= 0) {
      // Focus on the table when there is a selected row
      tableRef.current.focus();
    }
  }, [selectedRowIndex]);

  const tooltip = <Tooltip>Press "Ctrl + d" For Discount .</Tooltip>;
  const tooltip1 = <Tooltip>Press "Ctrl + e" For Paid .</Tooltip>;
  const tooltip2 = <Tooltip>Press "Ctrl + r" For Return .</Tooltip>;

  const printableAreaRef = useRef(null); // Create a ref

  // const handlePrint = () => {
  //   const printableArea = printableAreaRef.current;
  //   if (printableArea) {
  //     const printWindow = window.open("", "", "width=600,height=600");
  //     printWindow.document.open();

  //     printWindow.document.write("<html><head><title>Print Receipt</title>");
  //     // printWindow.document.write(
  //     //   '<link rel="stylesheet" type="text/css" href="../src/components/dashboard/layout.css">'
  //     // );
  //     printWindow.document.write("</head><body>");
  //     printWindow.document.write(printableArea.innerHTML);
  //     printWindow.document.write("</body></html>");

  //     printWindow.document.close();
  //     printWindow.print();
  //     printWindow.close();
  //   }
  // };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  /************ for return module******** */

  const navigate = useNavigate();
  const Navigation = () => {
    navigate("/dashboard/sales/return");
  };

  if (theme === "dark") {
    var divBg = "bg-dark";
    var tableTheme = "table table-dark table-bordered table-hover";
    var cardbdy = "card shadow rounded mt-2 border border-dark";
    var cardbdy2 = "card border border-dark shadow rounded bg-dark text-light";
  } else if (theme === "light") {
    tableTheme = "table table-light table-bordered table-hover";
    divBg = "bg-light";
    cardbdy = "card shadow rounded mt-2 border border-light";
    cardbdy2 = "card border border-light shadow rounded bg-light text-dark";
  }
  return (
    <div className="container-fluid">
      <h3 className="mt-2"> New Sales Entery </h3>

      <div className="row justify-content-end">
        <div className="col-lg-5">
          <div className={cardbdy2}>
            <div class="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <h6>Invoice Number</h6>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Invoice"
                    aria-label="default input example"
                    id="invoiceNumber"
                    value={updatedInvoice}
                    required
                    readOnly
                  />
                </div>
                <div className="col-lg-6">
                  <h6>Entry Date</h6>
                  <input
                    className="form-control"
                    placeholder="Date"
                    aria-label="default input example"
                    type="datetime-local"
                    value={format(selectedDate, "yyyy-MM-dd'T'HH:mm")} // ISO 8601 format for input
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    readOnly
                  />
                  {/* <DatePicker
                    className="form-control"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" // Customize the date format as needed
                    isClearable // Add a clear button to reset the date
                    showYearDropdown // Show year dropdown for easier navigation
                    scrollableYearDropdown // Make the year dropdown scrollable
                    yearDropdownItemNumber={15} // Number of years shown in the dropdown
                    required
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4 p-0 ">
        <div className="">
          <div className="d-flex justify-content-center">
            <div className="mx-2">
              <ButtonToolbar className="align-center">
                <Whisper
                  followCursor
                  speaker={<Tooltip>Press "Ctrl + o" to Open</Tooltip>}
                >
                  <Button
                    size="lg"
                    appearance="primary"
                    onClick={() => handleOpen("full")}
                  >
                    Click Here To Add Products
                  </Button>
                </Whisper>
              </ButtonToolbar>

              <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                  <h2 className="text-center">Add Product</h2>
                </Modal.Header>
                <Modal.Body>
                  <SalesTable
                    checkedItems={setcheckedItems}
                    defaultData={data}
                    headers={tableMeta}
                    columnWidth={columnWidth}
                    tableHeight={tableHeight}
                    inputRef={inputRef}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose} appearance="subtle">
                    Cancel
                  </Button>
                  <Button onClick={handleButtonClick} appearance="primary">
                    Add To Cart
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div class="mx-2">
              <ButtonToolbar className="align-center">
                <Whisper
                  followCursor
                  speaker={<Tooltip>Press "Ctrl + h" to Open</Tooltip>}
                >
                  <Button size="lg" appearance="primary" onClick={Navigation}>
                    Click Here To Return
                  </Button>
                </Whisper>
              </ButtonToolbar>
            </div>
          </div>
        </div>
      </div>
      <div className={cardbdy}>
        <div class="card-body p-0">
          <div
            style={{
              backgroundColor: "#34495e",
              color: "white",
              padding: "10px",
            }}
          >
            Purchase Items List
          </div>

          {/* <div
            id="orderItems"
            style={{
              overflowY: "scroll",
              border: "1px solid #BFAEAE",
            }}
          >
            {showTable && (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Medicine Name</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {dataFromId.map((item, index) => (
                    <tr key={index}>
                      
                      <td>{item.medicine_name}</td>
                      <td>{item.sell_price}</td>
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
                      <td>{item.amount}</td>

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
          </div> */}
          <div
            id="orderItems"
            tabIndex="0"
            ref={tableRef}
            style={{
              overflowY: "scroll",
              border: "1px solid #BFAEAE",
            }}
            className={divBg}
          >
            {showTable && (
              <table className={tableTheme}>
                <thead>
                  <tr>
                    <th scope="col">Medicine Name</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {dataFromId.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index === selectedRowIndex ? "selected-row" : ""
                      }
                      onMouseEnter={() => setSelectedRowIndex(index)}
                      onMouseLeave={() => setSelectedRowIndex(-1)}
                    >
                      {/* Access object properties correctly */}
                      <td>{item.medicine_name}</td>
                      <td>{item.sell_price}</td>
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
                      <td>{item.amount}</td>
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

      <div className="row justify-content-between mt-3">
        <div className="col-lg-2">
          <Whisper
            followCursor
            speaker={<Tooltip>Press "Ctrl + f" to Proceed</Tooltip>}
          >
            <button
              type="button"
              class="btn btn-secondary shadow rounded"
              onClick={handleCalculateTotal}
            >
              Proceed to Checkout
            </button>
          </Whisper>
        </div>
        <div className="col-lg-6">
          <div className={cardbdy2}>
            <div class="card-body p-3 pb-1">
              <div className="row">
                <div className="text-start col-lg-6">
                  <h6>Total Amount</h6>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Default input"
                    aria-label="default input example"
                    value={totalAmount}
                    readOnly
                  />
                </div>
                <div className="text-start col-lg-6">
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltip}
                  >
                    <div>
                      <h6>Discount(%)</h6>
                      <input
                        ref={discountRef}
                        class="form-control"
                        type="text"
                        placeholder="Enter Discount in percentage"
                        aria-label="default input example"
                        value={discount}
                        onChange={handleDiscount}
                      />
                    </div>
                  </Whisper>
                </div>
                <div className="text-start col-lg-6 mt-2">
                  <h6>Discount Amount</h6>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Default input"
                    aria-label="default input example"
                    value={discounted}
                    readOnly
                  />
                </div>
                <div className="text-start col-lg-6 mt-2">
                  <h6>Total Payable</h6>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Default input"
                    aria-label="default input example"
                    value={discountTotal}
                    readOnly
                  />
                </div>
                <div className="text-start col-lg-6 mt-2">
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltip1}
                  >
                    <div>
                      <h6>Paid</h6>
                      <input
                        ref={paidRef}
                        class="form-control"
                        type="text"
                        placeholder="Enter Paid Value"
                        aria-label="default input example"
                        value={paid}
                        onChange={handlePaid}
                        required
                      />
                    </div>
                  </Whisper>
                </div>
                <div className="text-start col-lg-6 mt-2">
                  <h6>Return</h6>
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltip2}
                  >
                    <div>
                      <input
                        ref={returnRef}
                        class="form-control"
                        type="text"
                        placeholder="Default input"
                        aria-label="default input example"
                        readOnly
                        value={returned}
                      />
                    </div>
                  </Whisper>
                </div>
                <div className="col-lg-12 mt-2">
                  <button
                    type="button"
                    class="btn btn-success "
                    onClick={handleSubmit}
                  >
                    Submit New Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="printable-receipt-container">
          {dataFromId.length > 0 && (
            <PrintableReceipt
              updatedInvoice={updatedInvoice}
              selectedDate={selectedDate}
              discount={discount}
              dataFromId={dataFromId}
              discountTotal={discountTotal}
              paid={paid}
              returned={returned}
              quantity={quantity}
              componentRef={componentRef}
              // printableAreaRef={printableAreaRef} // Pass the ref as a prop
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sale;
