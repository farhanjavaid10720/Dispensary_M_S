import "../dashboard/layout.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";
import CustomTable from "../shared/table";
import { manufacturer } from "../constants/endpoints";
import CustomModelBox from "../shared/model";
import ViewModelBox from "../shared/viewModel";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Manufacturer = (props) => {
  const [data, setData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(1100);
  const [tableHeight] = useState(300);
  const navigate = useNavigate();
  const [tableMeta] = useState([
    {
      text: "Manufacturer_name",
      type: "text",
      dataKey: "manufacturer_name",
      search: true,
    },
  ]);
  const [selectedRow, setSelectedRow] = useState();
  const [showEditBox, setShowEditBox] = useState(false);
  const [showViewBox, setShowViewBox] = useState(false);

  useEffect(() => {
    GetManufacturerData();
  }, []);

  const GetManufacturerData = async () => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const response = await axios.get(manufacturer.read, header);

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

  const Navigation = () => {
    navigate("/dashboard/manufacturer/add");
  };

  const Delete = (id) => {
    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    axios.delete(manufacturer.delete(id), header).then((res) => {
      if (res.status === 200) {
        // const new_data = data.filter((item) => item._id !== id);
        // setData(new_data);
        GetManufacturerData();
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
    axios
      .put(manufacturer.update(selectedRow["_id"]), data, header)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User Record is updated", {
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored",
            progress: undefined,
          });
          GetManufacturerData();
          setShowEditBox(false);
        }
      });
  };
  return (
    <div className="container-fluid">
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/manufacturer">View</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-2"> List of Manufacturer Information </h3>
      <hr style={{ border: "1px solid black" }} />
      <button
        type="button"
        class="btn btn-primary d-flex align-items-start"
        onClick={Navigation}
      >
        Add New Manufacturer
      </button>
      <br />
      <hr style={{ border: "1px solid black" }} />
      <div className="container-fluid">
        <CustomTable
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
          // updateCallBack={UpdateRecord}
          title="View Manufacturer Data"
          open={showViewBox}
          onClose={() => setShowViewBox(false)}
        />
      </div>
    </div>
  );
};

export default Manufacturer;
