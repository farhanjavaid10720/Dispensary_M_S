// import "../dashboard/layout.css";
// import "rsuite/dist/rsuite.min.css";
// import {
//   Table,
//   Popover,
//   Whisper,
//   Checkbox,
//   Dropdown,
//   IconButton,
//   Progress,
//   Breadcrumb,
//   Pagination,
// } from "rsuite";
// // import { mockUsers } from "../../constants/users-data";
// import { useContext, useEffect, useRef, useState } from "react";
// import MoreIcon from "@rsuite/icons/legacy/More";
// import axios, { all } from "axios";
// import { sales } from "../constants/endpoints";
// import { AppContext } from "../Context/AppContext";
// const { Column, HeaderCell, Cell } = Table;
// // const defaultData = mockUsers(100);

// const SalesHistory = () => {
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [defaultData, setDefaultData] = useState([]);
//   const [data, setData] = useState([]);
//   // const {user} = useContext(AppContext)

//   useEffect(() => {
//     const header = {
//       headers: {
//         Authorization: localStorage.getItem("jwt"),
//       },
//     };
//     axios.get(sales.read, header).then((res) => {
//       setDefaultData(Object.values(res["data"]));
//     });
//   }, []);

//   useEffect(() => {
//     if (defaultData.length > 0) {
//       const data = defaultData.filter((v, i) => {
//         const start = limit * (page - 1);
//         const end = start + limit;
//         return i >= start && i < end;
//       });
//       setData(data);
//     }
//   }, [defaultData, page]);

//   const handleChangeLimit = (dataKey) => {
//     setPage(1);
//     setLimit(dataKey);
//   };

//   const NameCell = ({ rowData, dataKey, ...props }) => {
//     const speaker = (
//       <Popover title="Description">
//         <p>
//           <b>invoice_number:</b> {rowData.invoice_number}
//         </p>
//         <p>
//           <b>entry_date:</b> {rowData.entry_date}
//         </p>
//         <p>
//           <b>total_amount:</b> {rowData.total_amount}
//         </p>
//         <p>
//           <b>discount:</b> {rowData.discount}
//         </p>
//         <p>
//           <b>discount_amount:</b> {rowData.discount_amount}
//         </p>
//         <p>
//           <b>total_payable:</b> {rowData.total_payable}
//         </p>
//         <p>
//           <b>paid:</b> {rowData.paid}
//         </p>
//         <p>
//           <b>return_amount:</b> {rowData.return_amount}
//         </p>
//       </Popover>
//     );
//     return (
//       <Cell {...props}>
//         <Whisper placement="top" speaker={speaker}>
//           <a>{rowData[dataKey]}</a>
//         </Whisper>
//       </Cell>
//     );
//   };

//   const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
//     <Cell {...props} style={{ padding: 0 }}>
//       <div style={{ lineHeight: "46px" }}>
//         <Checkbox
//           value={rowData[dataKey]}
//           inline
//           onChange={onChange}
//           checked={checkedKeys.some((item) => item === rowData[dataKey])}
//         />
//       </div>
//     </Cell>
//   );

//   const renderMenu = ({ onClose, left, top, className }, ref) => {
//     const handleSelect = (eventKey) => {
//       onClose();
//       console.log(eventKey);
//     };
//     return (
//       <Popover ref={ref} className={className} style={{ left, top }} full>
//         <Dropdown.Menu onSelect={handleSelect}>
//           <Dropdown.Item eventKey={1}>Remove</Dropdown.Item>
//           <Dropdown.Item eventKey={2}>Edit</Dropdown.Item>
//           <Dropdown.Item eventKey={4}>View Profile</Dropdown.Item>
//           <Dropdown.Item eventKey={5}>Block</Dropdown.Item>
//         </Dropdown.Menu>
//       </Popover>
//     );
//   };

//   const ActionCell = ({ rowData, dataKey, ...props }) => {
//     return (
//       <Cell {...props} className="link-group">
//         <Whisper
//           placement="autoVerticalStart"
//           trigger="click"
//           speaker={renderMenu}
//         >
//           <IconButton appearance="subtle" icon={<MoreIcon />} />
//         </Whisper>
//       </Cell>
//     );
//   };

//   const [checkedKeys, setCheckedKeys] = useState([]);
//   let checked = false;
//   let indeterminate = false;

//   if (checkedKeys.length === data.length) {
//     checked = true;
//   } else if (checkedKeys.length === 0) {
//     checked = false;
//   } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
//     indeterminate = true;
//   }

//   const handleCheckAll = (value, checked) => {
//     const keys = checked ? data.map((item) => item.id) : [];
//     setCheckedKeys(keys);
//   };
//   const handleCheck = (value, checked) => {
//     const keys = checked
//       ? [...checkedKeys, value]
//       : checkedKeys.filter((item) => item !== value);
//     setCheckedKeys(keys);
//   };

//   return (
//     <div className="container-fluid">
//       <Breadcrumb className="mt-3">
//         <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
//         <Breadcrumb.Item href="/dashboard/sales-history">View</Breadcrumb.Item>
//       </Breadcrumb>
//       <h3 className="d-flex justify-content-center">Sales History</h3>
//       <Table className="container-fluid" height={450} data={data} id="table">
//         <Column width={150} align="center">
//           <HeaderCell style={{ padding: 0 }}>
//             <div style={{ lineHeight: "40px" }}>
//               <Checkbox
//                 inline
//                 checked={checked}
//                 indeterminate={indeterminate}
//                 onChange={handleCheckAll}
//               />
//             </div>
//           </HeaderCell>
//           <CheckCell
//             dataKey="_id"
//             checkedKeys={checkedKeys}
//             onChange={handleCheck}
//           />
//         </Column>

//         <Column width={260}>
//           <HeaderCell>Invoice</HeaderCell>
//           <NameCell dataKey="invoice_number" />
//         </Column>

//         <Column width={230}>
//           <HeaderCell>Date</HeaderCell>
//           <NameCell dataKey="entry_date" />
//         </Column>
//         <Column width={230}>
//           <HeaderCell>Total Amount</HeaderCell>
//           <NameCell dataKey="total_amount" />
//         </Column>
//         <Column width={230}>
//           <HeaderCell>Discount</HeaderCell>
//           <NameCell dataKey="discount" />
//         </Column>
//         <Column width={230}>
//           <HeaderCell>Discounted Amount</HeaderCell>
//           <NameCell dataKey="discount_amount" />
//         </Column>
//         <Column width={230}>
//           <HeaderCell>total Payable</HeaderCell>
//           <NameCell dataKey="total_payable" />
//         </Column>
//         <Column width={230}>
//           <HeaderCell>Paid</HeaderCell>
//           <NameCell dataKey="paid" />
//         </Column>
//         <Column width={230}>
//           <HeaderCell>Return Amount</HeaderCell>
//           <NameCell dataKey="return_amount" />
//         </Column>
//         <Column width={120}>
//           <HeaderCell>
//             <MoreIcon />
//           </HeaderCell>
//           <ActionCell dataKey="_id" />
//         </Column>
//       </Table>

//       <div style={{ padding: 20 }}>
//         <Pagination
//           prev
//           next
//           first
//           last
//           ellipsis
//           boundaryLinks
//           maxButtons={5}
//           size="xs"
//           layout={["total", "-", "limit", "|", "pager", "skip"]}
//           total={defaultData.length}
//           limitOptions={[10, 30, 50]}
//           limit={limit}
//           activePage={page}
//           onChangePage={setPage}
//           onChangeLimit={handleChangeLimit}
//         />
//       </div>
//     </div>
//   );
// };

// export default SalesHistory;

import "../dashboard/layout.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { Breadcrumb } from "rsuite";
import CustomTable from "../shared/table";
import { sales } from "../constants/endpoints";

import CustomModelBox from "../shared/model";
import ViewModelBox from "../shared/viewModel";
import { toast } from "react-toastify";
import { CustomProvider } from "rsuite";
// const defaultData = mockUsers(100);

const SalesHistory = () => {
  const [data, setData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(170);
  const [tableHeight] = useState(440);
  const [tableMeta] = useState([
    {
      text: "Invoice_number",
      type: "text",
      dataKey: "invoice_number",
      search: true,
    },
    { text: "Entry_date", type: "text", dataKey: "entry_date", search: true },
    {
      text: "Total_amount",
      type: "text",
      dataKey: "total_amount",
      search: true,
    },
    {
      text: "Discount",
      type: "text",
      dataKey: "discount",
      search: true,
    },
    {
      text: "Discount_amount",
      type: "text",
      dataKey: "discount_amount",
      search: true,
    },
    {
      text: "Total_payable",
      type: "text",
      dataKey: "total_payable",
      search: true,
    },
    { text: "Paid", type: "text", dataKey: "paid", search: true },
    {
      text: "Return_amount",
      type: "text",
      dataKey: "return_amount",
      search: true,
    },
  ]);

  const [selectedRow, setSelectedRow] = useState();
  const [showEditBox, setShowEditBox] = useState(false);

  useEffect(() => {
    GetSalesData();
  }, []);

  const GetSalesData = async () => {
    // const header = {
    //   headers: {
    //     Authorization: localStorage.getItem("jwt"),
    //   },
    // };
    // axios.get(sales.read, header).then((res) => {
    //   setData(Object.values(res["data"]["data"]));
    // });
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const response = await axios.get(sales.read, header);

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

  const Delete = (id) => {
    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    axios.delete(sales.delete(id), header).then((res) => {
      if (res.status === 200) {
        // const new_data = data.filter((item) => item._id !== id);
        // setData(new_data);
        GetSalesData();
        toast.success("User Data is removed", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
      }
    });
  };
  const DeleteSelectedItems = () => {
    for (let i of checkedItems) {
      Delete(i);
    }
  };
  const EditPage = (id) => {
    setShowEditBox(true);
    setSelectedRow(data.filter((item) => item._id === id)[0]);
  };
  const UpdateRecord = (data) => {
    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    axios.put(sales.update(selectedRow["_id"]), data, header).then((res) => {
      if (res.status === 200) {
        toast.success("User Record is updated", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
        GetSalesData();
        setShowEditBox(false);
      }
    });
  };
  const [showViewBox, setShowViewBox] = useState(false);
  const ViewPage = (id) => {
    setShowViewBox(true);
    setSelectedRow(data.filter((item) => item._id === id)[0]);
  };
  return (
    <div className="container-fluid">
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/sales-history">View</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="d-flex justify-content-center">Sales History</h3>

      <CustomTable
        editCallBack={EditPage}
        viewCallback={ViewPage}
        deleteAllCallBack={DeleteSelectedItems}
        deleteDataCallback={Delete}
        checkedItems={setcheckedItems}
        defaultData={data}
        headers={tableMeta}
        columnWidth={columnWidth}
        tableHeight={tableHeight}
      ></CustomTable>
      <CustomModelBox
        meta={tableMeta}
        data={selectedRow}
        updateCallBack={UpdateRecord}
        title="Edit Sales History"
        open={showEditBox}
        onClose={() => setShowEditBox(false)}
      />
      <ViewModelBox
        meta={tableMeta}
        data={selectedRow}
        title="View Sales Data"
        open={showViewBox}
        onClose={() => setShowViewBox(false)}
      />
    </div>
  );
};

export default SalesHistory;
