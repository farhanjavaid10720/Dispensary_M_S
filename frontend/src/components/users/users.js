import "../dashboard/layout.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";
import CustomTable from "../shared/table";
import { users } from "../constants/endpoints";
import CustomModelBox from "../shared/model";
import ViewModelBox from "../shared/viewModel";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Users = (props) => {
  const [data, setData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(230);
  const [tableHeight] = useState(300);
  const navigate = useNavigate();
  const [tableMeta] = useState([
    { text: "Image", type: "image", dataKey: "image" },
    { text: "Name", type: "text", dataKey: "name", search: true },
    { text: "Type", type: "text", dataKey: "type", search: true },
    { text: "Age", type: "text", dataKey: "age", search: false },
    { text: "Email", type: "text", dataKey: "email", search: true },
  ]);
  const [selectedRow, setSelectedRow] = useState();
  const [showEditBox, setShowEditBox] = useState(false);
  const [showViewBox, setShowViewBox] = useState(false);
  const location = useLocation();
  const queryParms = new URLSearchParams(location.search);
  useEffect(() => {
    GetMUsersData();
  }, []);

  const GetMUsersData = async () => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const response = await axios.get(users.read, header);

      if (response.status === 200) {
        const responseData = response.data.data; // Assuming data is a property of the response
        const values = Object.values(responseData);
        setData(values);
      } else {
        console.error(
          "Failed to fetch users data. Status code: ",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching users data: ", error);
    }
  };

  const Navigation = () => {
    navigate("/dashboard/users/add");
  };

  const Delete = (id) => {
    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    axios.delete(users.delete(id), header).then((res) => {
      if (res.status === 200) {
        // const new_data = data.filter((item) => item._id !== id);
        // setData(new_data);
        GetMUsersData();
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
  const ViewPage = (id) => {
    setShowViewBox(true);
    setSelectedRow(data.filter((item) => item._id === id)[0]);
  };

  const UpdateRecord = (data) => {
    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    const fd = new FormData();
    if (data.image[0]) {
      // Append the image to FormData only if it's not empty
      fd.append("image", data.image[0]);
    }
    // Object.keys(data).forEach((key) => {
    //   fd.append(key, data[key]);
    // });
    fd.append("data", JSON.stringify(data));

    axios.put(users.update(selectedRow["_id"]), fd, header).then((res) => {
      if (res.status === 200) {
        toast.success("User Record is updated", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
        GetMUsersData();
        setShowEditBox(false);
        // setImage(null);
      }
    });
  };
  return (
    <div className="container-fluid">
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/users">View</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-2"> List of Users Information </h3>
      <hr style={{ border: "1px solid black" }} />
      <button
        type="button"
        class="btn btn-primary d-flex align-items-start"
        onClick={Navigation}
      >
        Add New User
      </button>
      <br />
      <hr style={{ border: "1px solid black" }} />
      <div className="container-fluid">
        <CustomTable
          defaultSearchKeyword={queryParms.get("label")}
          viewCallback={ViewPage}
          editCallBack={EditPage}
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
          title="Edit Manufacturer"
          open={showEditBox}
          onClose={() => setShowEditBox(false)}
        />
        <ViewModelBox
          meta={tableMeta}
          data={selectedRow}
          title="View Manufacturer Data"
          open={showViewBox}
          onClose={() => setShowViewBox(false)}
        />
      </div>
    </div>
  );
};

export default Users;
