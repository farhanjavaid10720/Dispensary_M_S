import "../layout.css";
import { Outlet } from "react-router-dom";
const Main = (props) => {
  if (props.theme === "dark") {
    var theme = "container-fluid main-container bg-dark text-white  col-lg-11 ";
    var link = "link2 flex";
  } else {
    theme = "container-fluid main-container bg-light text-dark col-lg-11 ";
    link = "link flex";
  }

  return (
    <div className={theme} id="mainContainer">
      <Outlet />
    </div>
  );
};

export default Main;
