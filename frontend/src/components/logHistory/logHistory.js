import "../dashboard/layout.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { Breadcrumb } from "rsuite";
import CustomLogTable from "../shared/logTable";
import { logs } from "../constants/endpoints";

import CustomModelBox from "../shared/model";
import ViewModelBox from "../shared/viewModel";
import { toast } from "react-toastify";
import { CustomProvider } from "rsuite";
// const defaultData = mockUsers(100);

const LogHistory = () => {
  const [data, setData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(196);
  const [tableHeight] = useState(440);
  const [tableMeta] = useState([
    {
      text: "Image",
      type: "image",
      dataKey: "image",
      // search: true,
    },
    { text: "User Name", type: "text", dataKey: "user_name", search: true },
    {
      text: "User Email",
      type: "text",
      dataKey: "user_email",
      search: true,
    },
    {
      text: "Action",
      type: "text",
      dataKey: "event",
      search: true,
    },
    {
      text: "Resource",
      type: "text",
      dataKey: "resource",
      search: true,
    },
    {
      text: "Date",
      type: "text",
      dataKey: "date",
      search: true,
    },
  ]);
  const [tableMeta2] = useState([
    {
      text: "Image",
      type: "image",
      dataKey: "image",
      // search: true,
    },
    { text: "User Name", type: "text", dataKey: "user_name", search: true },
    {
      text: "User Email",
      type: "text",
      dataKey: "user_email",
      search: true,
    },
    {
      text: "Action",
      type: "text",
      dataKey: "event",
      search: true,
    },
    {
      text: "Resource",
      type: "text",
      dataKey: "resource",
      search: true,
    },
    {
      text: "Details",
      type: "text",
      dataKey: "details",
      search: true,
    },
    {
      text: "Date",
      type: "text",
      dataKey: "date",
      search: true,
    },
  ]);

  const [selectedRow, setSelectedRow] = useState();
  const [showEditBox, setShowEditBox] = useState(false);

  useEffect(() => {
    GetLogData();
  }, []);

  const GetLogData = async () => {
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
      const response = await axios.get(logs.read, header);

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
    axios.delete(logs.delete(id), header).then((res) => {
      if (res.status === 200) {
        // const new_data = data.filter((item) => item._id !== id);
        // setData(new_data);
        GetLogData();
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
    axios.put(logs.update(selectedRow["_id"]), data, header).then((res) => {
      if (res.status === 200) {
        toast.success("User Record is updated", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
        GetLogData();
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
        <Breadcrumb.Item href="/dashboard/log-history">View</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="d-flex justify-content-center">Logs</h3>

      <CustomLogTable
        editCallBack={EditPage}
        viewCallback={ViewPage}
        deleteAllCallBack={DeleteSelectedItems}
        deleteDataCallback={Delete}
        checkedItems={setcheckedItems}
        defaultData={data}
        headers={tableMeta}
        columnWidth={columnWidth}
        tableHeight={tableHeight}
      ></CustomLogTable>
      <CustomModelBox
        meta={tableMeta}
        data={selectedRow}
        updateCallBack={UpdateRecord}
        title="Edit Sales History"
        open={showEditBox}
        onClose={() => setShowEditBox(false)}
      />
      <ViewModelBox
        meta={tableMeta2}
        data={selectedRow}
        title="View Sales Data"
        open={showViewBox}
        onClose={() => setShowViewBox(false)}
      />
    </div>
  );
};

export default LogHistory;
