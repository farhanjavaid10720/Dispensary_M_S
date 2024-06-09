import "../dashboard/layout.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "rsuite";
import CustomTable from "../shared/table";
import { category } from "../constants/endpoints";
import CustomModelBox from "../shared/model";
import { toast } from "react-toastify";
import ViewModelBox from "../shared/viewModel";

import { useNavigate } from "react-router-dom";

const Category = (props) => {
  const [data, setData] = useState([]);
  const [checkedItems, setcheckedItems] = useState([]);
  const [columnWidth] = useState(1100);
  const [tableHeight] = useState(300);
  const navigate = useNavigate();
  const [tableMeta] = useState([
    {
      text: "Category_name",
      type: "text",
      dataKey: "category_name",
      search: true,
    },
  ]);

  const [selectedRow, setSelectedRow] = useState();
  const [showEditBox, setShowEditBox] = useState(false);

  const GetCategoryData = async () => {
    // const header = {
    //   headers: {
    //     Authorization: localStorage.getItem("jwt"),
    //   },
    // };
    // axios.get(category.read, header).then((res) => {
    //   setData(Object.values(res["data"]["data"]));
    // });
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const response = await axios.get(category.read, header);

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
    GetCategoryData();
  }, []);

  const Navigation = () => {
    navigate("/dashboard/category/add");
  };

  const Delete = (id) => {
    const header = {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    };
    axios.delete(category.delete(id), header).then((res) => {
      if (res.status === 200) {
        // const new_data = data.filter((item) => item._id !== id);
        // setData(new_data);
        GetCategoryData();
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
    axios.put(category.update(selectedRow["_id"]), data, header).then((res) => {
      if (res.status === 200) {
        toast.success("User Record is updated", {
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
          progress: undefined,
        });
        GetCategoryData();
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
        <Breadcrumb.Item href="/dashboard/category">View</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="mt-2"> List of Category Information </h3>
      <hr style={{ border: "1px solid black" }} />
      <button
        type="button"
        class="btn btn-primary d-flex align-items-start"
        onClick={Navigation}
      >
        Add New Category
      </button>
      <br />
      <hr style={{ border: "1px solid black" }} />
      <div className="container-fluid">
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
          title="Edit Category"
          open={showEditBox}
          onClose={() => setShowEditBox(false)}
        />

        <ViewModelBox
          meta={tableMeta}
          data={selectedRow}
          title="View Category Data"
          open={showViewBox}
          onClose={() => setShowViewBox(false)}
        />
      </div>
    </div>
  );
};

export default Category;
