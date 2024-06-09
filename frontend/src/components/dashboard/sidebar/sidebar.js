import "../layout.css";
import { useContext, useState, useEffect } from "react";
import logo1 from "../4.png";
import logo2 from "../p4.png";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

import { Logout, me } from "../../Auth/Auth";
const Sidebar = (props) => {
  const {
    handleClick,
    mouseEnterSidebar,
    mouseLeaveSidebar,
    toggleSidebarFunction,
    theme,
  } = props;

  if (theme === "dark") {
    var themeClass;
    var linkClass;
    var lockbtn;
    if (window.innerWidth < 800) {
      themeClass = "sidebar bg-dark text-white close shadow   rounded ";
      linkClass = "link2 flex";
      lockbtn = "bx bx-lock-open-alt text-primary";
    } else {
      themeClass =
        "sidebar bg-dark text-white hoverable close shadow   rounded";
      linkClass = "link2 flex";
      lockbtn = "bx bx-lock-open-alt text-primary";
    }
  } else {
    if (window.innerWidth < 800) {
      themeClass = "sidebar bg-white text-dark close shadow   rounded ";
      linkClass = "link flex";
      lockbtn = "bx bx-lock-open-alt text-dark";
    } else {
      themeClass =
        "sidebar bg-white text-dark hoverable close shadow   rounded ";
      linkClass = "link flex";
      lockbtn = "bx bx-lock-open-alt text-dark";
    }
  }

  const { user } = useContext(AppContext);
  const [convertedUrl, setConvertedUrl] = useState("");
  const convertImageUrl = () => {
    const originalURL = user.image;
    if (originalURL) {
      const converted = "\\" + originalURL.split("\\127.0.0.1:8080\\")[1];
      setConvertedUrl(converted);
    }
  };
  useEffect(() => {
    convertImageUrl();
  });

  return (
    <div onMouseEnter={mouseEnterSidebar} onMouseLeave={mouseLeaveSidebar}>
      <nav className={themeClass}>
        <div className="logo_items flex">
          <span className="nav_image">
            <img src={logo1} alt="logo_img" />
          </span>
          <span className="logo_name ">{props.brand_name}</span>
          <i
            className={lockbtn}
            id="lock-icon"
            title="Unlock Sidebar"
            onClick={handleClick}
          ></i>
          <i
            className="bx bx-x text-dark"
            id="sidebar-close"
            onClick={toggleSidebarFunction}
          ></i>
        </div>

        <div className="menu_container">
          <div className="menu_items">
            <ul className="menu_item p-0">
              <div className="menu_title flex">
                <span className="title ">Dashboard</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <Link className={linkClass} to={"/dashboard"}>
                  <i class="bx bxs-home"></i>
                  <span>Home</span>
                </Link>
              </li>
            </ul>
            <ul className="menu_item p-0">
              <div className="menu_title flex">
                <span className="title ">Sales</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <Link className={linkClass} to={"/dashboard/sales"}>
                  <i class="bx bxs-cart-add"></i>
                  <span>New Sale</span>
                </Link>
              </li>
              <li className="item">
                <Link className={linkClass} to={"/dashboard/sales-history"}>
                  <i class="bx bxs-notepad"></i>
                  <span>Sales History</span>
                </Link>
              </li>
            </ul>

            <ul className="menu_item p-0">
              <div className="menu_title flex">
                <span className="title ">Inventory</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <Link className={linkClass} to={"/dashboard/batch"}>
                  <i class="bx bxs-first-aid"></i>
                  <span>Batch</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/dashboard/medicine"} className={linkClass}>
                  <i class="bx bx-plus-medical"></i>
                  <span>Products</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/dashboard/supplier"} className={linkClass}>
                  <i class="bx bxs-truck"></i>
                  <span>Supplier</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/dashboard/category"} className={linkClass}>
                  <i class="bx bxs-category"></i>
                  <span>Category</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/dashboard/generic-name"} className={linkClass}>
                  <i class="bx bxs-capsule"></i>
                  <span>Drug Generic Name</span>
                </Link>
              </li>
              <li className="item">
                <Link className={linkClass} to={"/dashboard/manufacturer"}>
                  <i class="bx bxs-factory"></i>
                  <span>Manufacturer</span>
                </Link>
              </li>
            </ul>

            <ul className="menu_item p-0">
              <div className="menu_title flex">
                <span className="title ">Settings</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <Link className={linkClass} to={"/dashboard/users"}>
                  <i class="bx bxs-user"></i>
                  <span>User Management</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/dashboard/log-history"} className={linkClass}>
                  <i class="bx bx-history"></i>
                  <span>Audit Logs</span>
                </Link>
              </li>
              <li className="item">
                <a href="#" className={linkClass}>
                  <i className="bx bx-cog"></i>
                  <span>Setting</span>
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="sidebar_profile flex">
            <span className="nav_image">
              <img src={user.image} alt="logo_img" />
            </span>
            <div className="data_text">
              <span className="name ">{user.name}</span>
              <br></br>
              <span className="email ">{user.email}</span>
            </div>
          </div> */}
          <div className="sidebar_profile flex">
            <span className="nav_image">
              {user.image ? (
                <img src={user.image} alt="User Profile" />
              ) : (
                <div className="loading_indicator">Loading...</div>
              )}
            </span>
            <div className="data_text">
              <span className="name">{user.name}</span>
              <br />
              <span className="email">{user.email}</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
