import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";
import { useState, useEffect, useRef, Fragment, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { AppContext } from "../Context/AppContext";
// import Functions from "./javascript/javascript";

let showSidebar;
let toggleLock;
let hideSidebar;
let toggleSidebar;
let openSidebar;
const Layout = (props) => {
  const { theme, setTheme } = useContext(AppContext);
  // const theme = useRef("light");
  const brand_name = "CyberSilo";
  const changeTheme = () => {
    const temp = theme === "light" ? "dark" : "light";
    setTheme(temp);

    props.changeTheme(temp);
  };

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarLockBtn = document.querySelector("#lock-icon");
    const mainContainer = document.getElementById("mainContainer");
    const sidebarOpenBtn = document.querySelector("#sidebar-open");
    const sidebarCloseBtn = document.querySelector("#sidebar-close");
    const animationDuration = 500;
    const targetMargin = 0;
    const animateClass = (className, duration) => {
      const startTime = performance.now();
      const initialClass = mainContainer.className;
      const step = (timestamp) => {
        const progress = timestamp - startTime;
        if (progress < duration) {
          mainContainer.className = className;
          requestAnimationFrame(step);
        } else {
          mainContainer.className = initialClass;
        }
      };
      requestAnimationFrame(step);
    };
    toggleLock = () => {
      sidebar.classList.toggle("locked");
      if (!sidebar.classList.contains("locked")) {
        sidebar.classList.add("hoverable");
        if (sidebarLockBtn.classList.contains("bx-lock-alt")) {
          sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
        }
      } else {
        sidebar.classList.remove("hoverable");
        if (sidebarLockBtn.classList.contains("bx-lock-open-alt")) {
          sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
        }
      }
    };
    hideSidebar = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
        sidebar.classList.remove("hoverable");
        if (window.innerWidth > 800) {
          mainContainer.classList.remove(
            "main-ml1",
            "main-ml2",
            "w-75",
            "main-ml0"
          );
          const initialMargin = mainContainer.getBoundingClientRect().left;
          let start = null;
          function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const easing = (progress / animationDuration) ** 2;
            const currentMargin =
              initialMargin + (targetMargin - initialMargin) * easing;
            mainContainer.style.marginLeft = currentMargin + "px";
            if (progress < animationDuration) {
              requestAnimationFrame(step);
            } else {
              mainContainer.style.marginLeft = "";
              mainContainer.classList.add("main-ml0");
            }
          }
          requestAnimationFrame(step);
        } else {
          mainContainer.classList.remove(
            "main-ml1",
            "main-ml2",
            "main-ml0",
            "w-75"
          );
        }
      }
    };
    showSidebar = () => {
      if (sidebar.classList.contains("close")) {
        sidebar.classList.add("hoverable");
        sidebar.classList.remove("close");
        if (window.innerWidth >= 800 && window.innerWidth <= 1200) {
          mainContainer.classList.add("main-ml1", "w-75");
        }
        if (window.innerWidth >= 1200) {
          mainContainer.classList.add("main-ml2", "w-75");
        }
      }
    };
    toggleSidebar = () => {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("locked")) {
        sidebar.classList.remove("locked");
        // sidebar.classList.add("hoverable");
      } else {
        sidebar.classList.remove("hoverable");
      }
    };
    openSidebar = () => {
      sidebar.classList.toggle("locked");
      sidebar.classList.remove("close");
    };
    const evaluateHoverState = () => {
      if (!sidebar.classList.contains("locked") && window.innerWidth >= 800) {
        sidebar.addEventListener("mouseleave", hideSidebar);
        sidebar.addEventListener("mouseenter", showSidebar);
        sidebar.classList.add("hoverable");
      } else {
        sidebar.removeEventListener("mouseleave", hideSidebar);
        sidebar.removeEventListener("mouseenter", showSidebar);
        sidebar.classList.remove("hoverable");
      }
    };
    const initializeState = () => {
      // toggleLock();
      evaluateHoverState();
      sidebar.classList.add("close");
      evaluateHoverState();
    };
    initializeState();
    // window.toggleLock = toggleLock;
    // window.showSidebar = showSidebar;
    // window.hideSidebar = hideSidebar;
    // window.toggleSidebar = toggleSidebar;
    // window.openSidebar = openSidebar;
    window.addEventListener("resize", () => {
      evaluateHoverState();
    });
    sidebarLockBtn.addEventListener("click", toggleLock);
    sidebarOpenBtn.addEventListener("click", toggleSidebar);
    sidebarCloseBtn.addEventListener("click", toggleSidebar);
  }, []);
  const handleClick = () => {
    // Call the toggleLock function
    try {
      toggleLock();
    } catch (error) {
      console.error(
        "An error occurred in handleClick function in layout.js: ",
        error
      );
    }
  };

  const mouseEnterSidebar = () => {
    try {
      showSidebar();
    } catch (error) {
      console.error(
        "An error occurred in mouseEnterSidebar function in layout.js: ",
        error
      );
    }
  };
  const mouseLeaveSidebar = () => {
    try {
      hideSidebar();
    } catch (error) {
      console.error(
        "An error occurred in mouseLeaveSidebar function in layout.js: ",
        error
      );
    }
  };
  const toggleSidebarFunction = () => {
    try {
      toggleSidebar();
    } catch (error) {
      console.error(
        "An error occurred in toggleSidebarFunction function in layout.js: ",
        error
      );
    }
  };

  const toggleSidebarOpen = () => {
    try {
      openSidebar();
    } catch (error) {
      console.error(
        "An error occurred in toggleSidebarOpen function in layout.js: ",
        error
      );
    }
  };

  if (theme === "dark") {
    var body = document.getElementsByTagName("body")[0];

    // Remove the light class if it exists
    body.classList.remove("bg-light");

    // Add the dark class
    body.classList.add("bg-dark");
  } else {
    var body = document.getElementsByTagName("body")[0];

    // Remove the dark class if it exists
    body.classList.remove("bg-dark");

    // Add the light class
    body.classList.add("bg-light");
  }

  return (
    <Fragment>
      <div>
        <div className="row">
          <Sidebar
            theme={theme}
            brand_name={brand_name}
            mouseEnterSidebar={mouseEnterSidebar}
            mouseLeaveSidebar={mouseLeaveSidebar}
            toggleSidebarFunction={toggleSidebarFunction}
            handleClick={handleClick}
          />
          <Header
            theme={theme}
            changeTheme={changeTheme}
            toggleSidebarOpen={toggleSidebarOpen}
          />
          <div className="row">
            <Main theme={theme} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Layout };
