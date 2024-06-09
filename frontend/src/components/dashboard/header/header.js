// import { useEffect, useContext, useState } from "react";
// import "../layout.css";
// import logo2 from "../p4.png";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun } from "@fortawesome/free-regular-svg-icons";
// import { faMoon } from "@fortawesome/free-solid-svg-icons";
// import { Logout, me } from "../../Auth/Auth";
// import { AppContext } from "../../Context/AppContext";
// import { logEvent } from "../../audit_log/logService";

// const Header = (props) => {
//   const { user, setUser } = useContext(AppContext);
//   if (props.theme === "dark") {
//     var theme =
//       "navbar bg-dark flex text-white  border-bottom shadow   rounded";
//     var button = "btn btn-white fs-5 dropdown-toggle text-light border-0";
//     var changing = (
//       <span>
//         Light &nbsp;
//         <FontAwesomeIcon icon={faSun} />
//       </span>
//     );
//   } else {
//     theme =
//       "navbar bg-white flex border-bottom border-bottom-2 shadow  rounded";
//     button = "btn btn-white fs-5 dropdown-toggle text-dark border-0";
//     changing = (
//       <span>
//         Dark &nbsp;
//         <FontAwesomeIcon icon={faMoon} />
//       </span>
//     );
//   }

//   const { changeTheme, toggleSidebarOpen } = props;

//   useEffect(() => {
//     me().then(
//       (res) => {
//         if (res["data"]["error"] === 0) {
//           setUser(res["data"]);
//         }
//       },
//       (err) => {}
//     );
//   }, []);

//   // useEffect(() => {
//   //   if (user.name) {
//   //     logEvent("User Login", `User '${user.name}' logged in.`);
//   //   }
//   // }, [user, setUser]);

//   // const [convertedUrl, setConvertedUrl] = useState("");
//   // const convertImageUrl = () => {
//   //   const originalURL = user.image;
//   //   if (originalURL) {
//   //     const converted = "\\" + originalURL.split("\\127.0.0.1:8080\\")[1];
//   //     setConvertedUrl(converted);
//   //   } else {
//   //     console.log("user.image is undefined or null");
//   //   }
//   // };
//   // useEffect(() => {
//   //   convertImageUrl();
//   // });

//   return (
//     <nav className={theme}>
//       <i
//         className="bx bx-menu"
//         id="sidebar-open"
//         onClick={toggleSidebarOpen}
//       ></i>
//       <input type="text" placeholder="Search..." className="search_box" />
//       <span className="nav_image me-3">
//         <div className="dropdown">
//           <button
//             className={button}
//             type="button"
//             id="icon-button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <img src={user.image} alt="profile" />
//           </button>
//           <ul className="dropdown-menu dropMargin">
//             <li>
//               <Link className="dropdown-item" to={"/dashboard"}>
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link className="dropdown-item" to={"/dashboard/edit-profile"}>
//                 Edit Profile
//               </Link>
//             </li>
//             <li>
//               <a className="dropdown-item" type="button" onClick={changeTheme}>
//                 {changing}
//               </a>
//             </li>
//             <li>
//               <a className="dropdown-item" onClick={Logout}>
//                 Log Out
//               </a>
//             </li>
//           </ul>
//         </div>
//       </span>
//     </nav>
//   );
// };

// export default Header;
import { useEffect, useContext, useState, useRef } from "react";
import { Tooltip, Whisper } from "rsuite";
import "../layout.css";
import "./header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Logout, me } from "../../Auth/Auth";
import { AppContext } from "../../Context/AppContext";

const components = [
  { name: "Home", path: "/dashboard" },
  { name: "New Sales", path: "/dashboard/sales" },
  { name: "Return Products", path: "/dashboard/sales/return" },
  { name: "Sales History", path: "/dashboard/sales-history" },
  { name: "Batch", path: "/dashboard/batch" },
  { name: "Add Batch", path: "/dashboard/batch/add" },
  { name: "Products", path: "/dashboard/medicine" },
  { name: "Add Product", path: "/dashboard/medicine/add" },
  { name: "Suppliers", path: "/dashboard/supplier" },
  { name: "Add Supplier", path: "/dashboard/supplier/add" },
  { name: "Category", path: "/dashboard/category" },
  { name: "Add Category", path: "/dashboard/category/add" },
  { name: "Drug Generic Name", path: "/dashboard/generic-name" },
  { name: "Add Generic Name", path: "/dashboard/generic-name/add" },
  { name: "Manufacturer", path: "/dashboard/manufacturer" },
  { name: "Add Manufacturer", path: "/dashboard/manufacturer/add" },
  { name: "Add Manufacturer", path: "/dashboard/manufacturer/add" },
  { name: "Audit Logs", path: "/dashboard/log-history" },
  { name: "Add User", path: "/dashboard/users/add" },
  { name: "Edit User", path: "/dashboard/edit-profile" },
  // Add other components here
];

const Header = (props) => {
  const { user, setUser } = useContext(AppContext);
  if (props.theme === "dark") {
    var theme =
      "navbar bg-dark flex text-white  border-bottom shadow   rounded";
    var button = "btn btn-white fs-5 dropdown-toggle text-light border-0";
    var changing = (
      <span>
        Light &nbsp;
        <FontAwesomeIcon icon={faSun} />
      </span>
    );
  } else {
    theme =
      "navbar bg-white flex border-bottom border-bottom-2 shadow  rounded";
    button = "btn btn-white fs-5 dropdown-toggle text-dark border-0";
    changing = (
      <span>
        Dark &nbsp;
        <FontAwesomeIcon icon={faMoon} />
      </span>
    );
  }

  const { changeTheme, toggleSidebarOpen } = props;

  useEffect(() => {
    me().then(
      (res) => {
        if (res["data"]["error"] === 0) {
          setUser(res["data"]);
        }
      },
      (err) => {}
    );
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    setShowResults(!!input); // Show results when there is a search term
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  useEffect(() => {
    function handleDocumentClick(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <nav className={theme}>
      <i
        className="bx bx-menu"
        id="sidebar-open"
        onClick={toggleSidebarOpen}
      ></i>
      <div className="search-bar" ref={inputRef}>
        <input
          type="text"
          placeholder="Search..."
          className="search_box"
          value={searchTerm}
          onChange={handleSearch}
        />
        {showResults && filteredComponents.length > 0 && (
          <ul className="search-results">
            {filteredComponents.map((component) => (
              <li key={component.path}>
                <Link to={component.path}>{component.name}</Link>
              </li>
            ))}
          </ul>
        )}
        {searchTerm && (
          <Whisper
            placement="bottom"
            controlId="control-id-hover"
            trigger="hover"
            speaker={<Tooltip>Clear</Tooltip>}
          >
            <i
              className="fa fa-times clear-icon closee"
              onClick={clearSearch}
            ></i>
          </Whisper>
        )}
      </div>
      <span className="nav_image me-3">
        <div className="dropdown">
          <button
            className={button}
            type="button"
            id="icon-button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={user.image} alt="profile" />
          </button>
          <ul className="dropdown-menu dropMargin">
            <li>
              <Link className="dropdown-item" to={"/dashboard"}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={"/dashboard/edit-profile"}>
                Edit Profile
              </Link>
            </li>
            <li>
              <a className="dropdown-item" type="button" onClick={changeTheme}>
                {changing}
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={Logout}>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </span>
    </nav>
  );
};

export default Header;
