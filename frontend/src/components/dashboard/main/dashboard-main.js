import "../layout.css";

import ThemeContext from "./ThemeContext";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../Context/AppContext";
import { Breadcrumb, Col, Row, Panel, Placeholder } from "rsuite";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie, getElementAtEvent } from "react-chartjs-2";
import {
  sales_data,
  generate_chart_obj,
  chart_options,
} from "../../chart-data";
import axios from "axios";
import { stats } from "../../constants/endpoints";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Card = (props) => <Panel {...props} bordered></Panel>;

const Dashmain = () => {
  const theme = useContext(ThemeContext);
  if (theme === "dark") {
    var table = "table table-dark table-hover border border-light";
  } else {
    table = "table  table-hover";
  }
  const [topstats, setTopStats] = useState();
  const [productCategory, setProductCategory] = useState(null);
  const pie_chart = useRef();
  const navigate = useNavigate();

  const getAdminStats = async () => {
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };

      const response = await axios.get(stats.admin_stats, header);

      if (response.status === 200) {
        setTopStats({
          // user: res["data"]["user_count"],
          user: response.data.user_count,
          // product: res["data"]["product_count"],
          product: response.data.product_count,
          // order: res["data"]["order_count"],
          order: response.data.order_count,
        });
      } else {
        console.error(
          "Failed to fetch generic data. Status code: ",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching admin stats: ", error);
    }
  };
  useEffect(() => {
    getAdminStats();
    product_chart();
  }, []);

  const product_chart = async () => {
    var data;
    try {
      const header = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const res = await axios.get(stats.product_by_category, header);
      data = res["data"]["data"];
    } catch (error) {
      console.error("An error occurred while fetching product stats: ", error);
    }
    const labels = [];
    const count = [];
    if (data) {
      data.map((item) => {
        labels.push(item["_id"]);
        count.push(item["count"]);
      });
      setProductCategory(generate_chart_obj(labels, count, "Total Products"));
    }
  };
  // const NavigateToLabel = (event) => {
  //   const index = getElementAtEvent(pie_chart.current, event)[0].index;
  //   if (!index) {
  //     const label = productCategory["labels"][index];
  //     navigate(`/dashboard/medicine?label=${label}`);
  //   }
  // };
  const NavigateToLabel = (event) => {
    const elements = getElementAtEvent(pie_chart.current, event);
    if (elements && elements.length > 0) {
      const index = elements[0].index;
      if (typeof index !== "undefined") {
        const label = productCategory["labels"][index];
        navigate(`/dashboard/medicine?label=${label}`);
      }
    }
  };

  return (
    <div>
      <div className="container-fluid" style={{ width: "90%", height: "90%" }}>
        <Breadcrumb className="">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-md-4">
            <Card className="shadow rounded">
              <h6 className="text-center fw-normal">Total Users</h6>
              <div class="card-bodiesForMain mt-3">
                <b>{topstats?.user}</b>
              </div>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow rounded">
              <h6 className="text-center fw-normal">Total Products</h6>
              <div class="card-bodiesForMain mt-3">
                <b>{topstats?.product}</b>
              </div>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow rounded">
              <h6 className="text-center fw-normal">Orders</h6>
              <div class="card-bodiesForMain mt-3">
                <b>{topstats?.order}</b>
              </div>
            </Card>
          </div>
        </div>
        <div className="row  d-flex justify-content-center">
          <div className="col-7 p-1">
            <Card className="mt-4 shadow rounded">
              <h5 className="text-center">Sales history</h5>
              <Line options={chart_options("")} data={sales_data} />
            </Card>
          </div>
          <div className="chart-containerForMain col-6">
            <Card className="mt-4 shadow rounded">
              <h5 className="text-center">Orders Chart</h5>
              {productCategory != null ? (
                <Pie
                  ref={pie_chart}
                  onClick={NavigateToLabel}
                  options={chart_options("")}
                  data={productCategory}
                />
              ) : (
                <Skeleton style={{ padding: "50px" }} />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashmain;
