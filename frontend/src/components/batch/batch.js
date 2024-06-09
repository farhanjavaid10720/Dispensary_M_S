import "../dashboard/layout.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";
import CustomTable from "../shared/table";
import { batch } from "../constants/endpoints";
import CustomModelBox from "../shared/model";
import ViewModelBox from "../shared/viewModel";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Batch = (props) => {
  const [data, setData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(144);
  const [tableHeight] = useState(300);
  const navigate = useNavigate();
  const [tableMeta] = useState([
    {
      text: "Batch_id",
      type: "text",
      dataKey: "batch_id",
      search: true,
    },
    {
      text: "Supplier_name",
      type: "text",
      dataKey: "supplier_name",
      search: true,
    },
    {
      text: "Medicine_name",
      type: "text",
      dataKey: "medicine_name",
      search: true,
    },
    {
      text: "Quantity",
      type: "text",
      dataKey: "quantity",
      search: true,
    },
    {
      text: "Cost_price",
      type: "text",
      dataKey: "cost_price",
      search: true,
    },
    {
      text: "Sell_price",
      type: "text",
      dataKey: "sell_price",
      search: true,
    },
    {
      text: "Production_date",
      type: "text",
      dataKey: "production_date",
      search: true,
    },
    {
      text: "Expire_date",
      type: "text",
      dataKey: "expire_date",
      search: true,
    },
  ]);

  const [selectedRow, setSelectedRow] = useState();
  const [showEditBox, setShowEditBox] = useState(false);

  const GetBatchData = async () => {
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
    GetBatchData();
  }, []);

  const Navigation = () => {
    navigate("/dashboard/batch/add");
  };

  const Delete = (id) => {
    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    axios.delete(batch.delete(id), header).then((res) => {
      if (res.status === 200) {
        // const new_data = data.filter((item) => item._id !== id);
        // setData(new_data);
        GetBatchData();
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
    axios.put(batch.update(selectedRow["_id"]), data, header).then((res) => {
      if (res.status === 200) {
        toast.success("User Record is updated", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
        GetBatchData();
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
        <Breadcrumb.Item href="/dashboard/batch">View</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-2">List of Batch Details</h3>
      <hr style={{ border: "1px solid black" }} />
      <button
        type="button"
        class="btn btn-primary d-flex align-items-start"
        onClick={Navigation}
      >
        Add New Batch
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
          title="Edit Batch"
          open={showEditBox}
          onClose={() => setShowEditBox(false)}
        />
        <ViewModelBox
          meta={tableMeta}
          data={selectedRow}
          // updateCallBack={UpdateRecord}
          title="View Batch Data"
          open={showViewBox}
          onClose={() => setShowViewBox(false)}
        />
      </div>
    </div>
  );
};

export default Batch;
