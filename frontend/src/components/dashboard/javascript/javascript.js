// import { useEffect, useCallback } from "react";

// const Functions = () => {
//   // const sidebar = document.querySelector(".sidebar");
//   // const sidebarLockBtn = document.querySelector("#lock-icon");
//   // const mainContainer = document.getElementById("mainContainer");
//   // const sidebarOpenBtn = document.querySelector("#sidebar-open");
//   // const sidebarCloseBtn = document.querySelector("#sidebar-close");

//   // const animationDuration = 500;
//   // const targetMargin = 0;

//   // const animateClass = useCallback((className, duration) => {
//   //   const startTime = performance.now();
//   //   const initialClass = mainContainer.className;

//   //   const step = (timestamp) => {
//   //     const progress = timestamp - startTime;
//   //     if (progress < duration) {
//   //       mainContainer.className = className;
//   //       requestAnimationFrame(step);
//   //     } else {
//   //       mainContainer.className = initialClass;
//   //     }
//   //   };

//   //   requestAnimationFrame(step);
//   // }, []);

//   // var toggleLock = useCallback(() => {
//   //   sidebar.classList.toggle("locked");

//   //   if (!sidebar.classList.contains("locked")) {
//   //     sidebar.classList.add("hoverable");
//   //     if (sidebarLockBtn.classList.contains("bx-lock-alt")) {
//   //       sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
//   //     }
//   //   } else {
//   //     sidebar.classList.remove("hoverable");
//   //     if (sidebarLockBtn.classList.contains("bx-lock-open-alt")) {
//   //       sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
//   //     }
//   //   }
//   // }, []);

//   // const hideSidebar = useCallback(() => {
//   //   if (sidebar.classList.contains("hoverable")) {
//   //     sidebar.classList.add("close");
//   //     sidebar.classList.remove("hoverable");

//   //     if (window.innerWidth > 800) {
//   //       mainContainer.classList.remove(
//   //         "main-ml1",
//   //         "main-ml2",
//   //         "w-75",
//   //         "main-ml0"
//   //       );

//   //       const initialMargin = mainContainer.getBoundingClientRect().left;

//   //       let start = null;
//   //       function step(timestamp) {
//   //         if (!start) start = timestamp;
//   //         const progress = timestamp - start;
//   //         const easing = (progress / animationDuration) ** 2;
//   //         const currentMargin =
//   //           initialMargin + (targetMargin - initialMargin) * easing;

//   //         mainContainer.style.marginLeft = currentMargin + "px";

//   //         if (progress < animationDuration) {
//   //           requestAnimationFrame(step);
//   //         } else {
//   //           mainContainer.style.marginLeft = "";
//   //           mainContainer.classList.add("main-ml0");
//   //         }
//   //       }

//   //       requestAnimationFrame(step);
//   //     } else {
//   //       mainContainer.classList.remove(
//   //         "main-ml1",
//   //         "main-ml2",
//   //         "main-ml0",
//   //         "w-75"
//   //       );
//   //     }
//   //   }
//   // }, []);

//   // const showSidebar = useCallback(() => {
//   //   if (sidebar.classList.contains("close")) {
//   //     sidebar.classList.add("hoverable");
//   //     sidebar.classList.remove("close");

//   //     if (window.innerWidth >= 800 && window.innerWidth <= 1200) {
//   //       mainContainer.classList.add("main-ml1", "w-75");
//   //     }
//   //     if (window.innerWidth >= 1200) {
//   //       mainContainer.classList.add("main-ml2", "w-75");
//   //     }
//   //   }
//   // }, []);

//   // const toggleSidebar = useCallback(() => {
//   //   sidebar.classList.toggle("close");
//   //   if (sidebar.classList.contains("locked")) {
//   //     sidebar.classList.remove("locked");
//   //     // sidebar.classList.add("hoverable");
//   //   } else {
//   //     sidebar.classList.remove("hoverable");
//   //   }
//   // }, []);

//   // const openSidebar = useCallback(() => {
//   //   sidebar.classList.toggle("locked");
//   //   sidebar.classList.remove("close");
//   // }, []);

//   // const evaluateHoverState = useCallback(() => {
//   //   if (!sidebar.classList.contains("locked") && window.innerWidth >= 800) {
//   //     sidebar.addEventListener("mouseleave", hideSidebar);
//   //     sidebar.addEventListener("mouseenter", showSidebar);
//   //     sidebar.classList.add("hoverable");
//   //   } else {
//   //     sidebar.removeEventListener("mouseleave", hideSidebar);
//   //     sidebar.removeEventListener("mouseenter", showSidebar);
//   //     sidebar.classList.remove("hoverable");
//   //   }
//   // }, []);

//   // const initializeState = useCallback(() => {
//   //   // toggleLock();
//   //   evaluateHoverState();
//   //   sidebar.classList.add("close");

//   //   evaluateHoverState();
//   // }, []);

//   // return {
//   //   animateClass,
//   //   toggleLock,
//   //   hideSidebar,
//   //   showSidebar,
//   //   toggleSidebar,
//   //   openSidebar,
//   //   evaluateHoverState,
//   //   initializeState,
//   // };
//   // initializeState();

//   // window.addEventListener("resize", () => {
//   //   evaluateHoverState();
//   // });

//   // const animationDuration = 500;
//   // const targetMargin = 0;

//   // const animateClass = useCallback((className, duration) => {
//   //   const mainContainer = document.getElementById("mainContainer");
//   //   if (!mainContainer) return;

//   //   const startTime = performance.now();
//   //   const initialClass = mainContainer.className;

//   //   const step = (timestamp) => {
//   //     const progress = timestamp - startTime;
//   //     if (progress < duration) {
//   //       mainContainer.className = className;
//   //       requestAnimationFrame(step);
//   //     } else {
//   //       mainContainer.className = initialClass;
//   //     }
//   //   };

//   //   requestAnimationFrame(step);
//   // }, []);

//   const animationDuration = 500;
//   const targetMargin = 0;

//   const animateClass = useCallback((className, duration) => {
//     const mainContainer = document.getElementById("mainContainer");
//     if (!mainContainer) return;
//     const startTime = performance.now();
//     const initialClass = mainContainer.className;

//     const step = (timestamp) => {
//       const progress = timestamp - startTime;
//       if (progress < duration) {
//         mainContainer.className = className;
//         requestAnimationFrame(step);
//       } else {
//         mainContainer.className = initialClass;
//       }
//     };
//   }, []);

//   var toggleLock = useCallback(() => {
//     const sidebar = document.querySelector(".sidebar");
//     const sidebarLockBtn = document.querySelector("#lock-icon");

//     if (!sidebar || !sidebarLockBtn) return;

//     sidebar.classList.toggle("locked");

//     if (!sidebar.classList.contains("locked")) {
//       sidebar.classList.add("hoverable");
//       if (sidebarLockBtn.classList.contains("bx-lock-alt")) {
//         sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
//       }
//     } else {
//       sidebar.classList.remove("hoverable");
//       if (sidebarLockBtn.classList.contains("bx-lock-open-alt")) {
//         sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
//       }
//     }
//   }, []);

//   const hideSidebar = useCallback(() => {
//     const sidebar = document.querySelector(".sidebar");
//     const mainContainer = document.getElementById("mainContainer");

//     if (!sidebar || !mainContainer) return;

//     if (sidebar.classList.contains("hoverable")) {
//       sidebar.classList.add("close");
//       sidebar.classList.remove("hoverable");

//       if (window.innerWidth > 800) {
//         mainContainer.classList.remove(
//           "main-ml1",
//           "main-ml2",
//           "w-75",
//           "main-ml0"
//         );

//         const initialMargin = mainContainer.getBoundingClientRect().left;

//         let start = null;
//         function step(timestamp) {
//           if (!start) start = timestamp;
//           const progress = timestamp - start;
//           const easing = (progress / animationDuration) ** 2;
//           const currentMargin =
//             initialMargin + (targetMargin - initialMargin) * easing;

//           mainContainer.style.marginLeft = currentMargin + "px";

//           if (progress < animationDuration) {
//             requestAnimationFrame(step);
//           } else {
//             mainContainer.style.marginLeft = "";
//             mainContainer.classList.add("main-ml0");
//           }
//         }

//         requestAnimationFrame(step);
//       } else {
//         mainContainer.classList.remove(
//           "main-ml1",
//           "main-ml2",
//           "main-ml0",
//           "w-75"
//         );
//       }
//     }
//   }, []);

//   const showSidebar = useCallback(() => {
//     const sidebar = document.querySelector(".sidebar");
//     const mainContainer = document.getElementById("mainContainer");

//     if (!sidebar || !mainContainer) return;

//     // Rest of showSidebar implementation...

//     if (sidebar.classList.contains("close")) {
//       sidebar.classList.add("hoverable");
//       sidebar.classList.remove("close");

//       if (window.innerWidth >= 800 && window.innerWidth <= 1200) {
//         mainContainer.classList.add("main-ml1", "w-75");
//       }
//       if (window.innerWidth >= 1200) {
//         mainContainer.classList.add("main-ml2", "w-75");
//       }
//     }
//   }, []);

//   const toggleSidebar = useCallback(() => {
//     const sidebar = document.querySelector(".sidebar");

//     if (!sidebar) return;

//     // Rest of toggleSidebar implementation...
//     sidebar.classList.toggle("close");
//     if (sidebar.classList.contains("locked")) {
//       sidebar.classList.remove("locked");
//       // sidebar.classList.add("hoverable");
//     } else {
//       sidebar.classList.remove("hoverable");
//     }
//   }, []);

//   const openSidebar = useCallback(() => {
//     const sidebar = document.querySelector(".sidebar");

//     if (!sidebar) return;

//     // Rest of openSidebar implementation...

//     sidebar.classList.toggle("locked");
//     sidebar.classList.remove("close");
//   }, []);

//   const evaluateHoverState = useCallback(() => {
//     const sidebar = document.querySelector(".sidebar");

//     if (!sidebar) return;

//     // Rest of evaluateHoverState implementation...

//     if (!sidebar.classList.contains("locked") && window.innerWidth >= 800) {
//       sidebar.addEventListener("mouseleave", hideSidebar);
//       sidebar.addEventListener("mouseenter", showSidebar);
//       sidebar.classList.add("hoverable");
//     } else {
//       sidebar.removeEventListener("mouseleave", hideSidebar);
//       sidebar.removeEventListener("mouseenter", showSidebar);
//       sidebar.classList.remove("hoverable");
//     }
//   }, []);

//   const initializeState = useCallback(() => {
//     const sidebar = document.querySelector(".sidebar");

//     if (!sidebar) return;

//     // Rest of initializeState implementation...

//     evaluateHoverState();
//     sidebar.classList.add("close");

//     evaluateHoverState();
//   }, []);

//   const onPageRefresh = useCallback(() => {
//     const mainContainer = document.getElementById("mainContainer");
//     const sidebar = document.querySelector(".sidebar");
//     const sidebarLockBtn = document.querySelector("#lock-icon");

//     if (!mainContainer || !sidebar || !sidebarLockBtn) return;
//     mainContainer.classList.remove("main-ml2", "w-75");
//     sidebar.classList.remove("locked");
//     sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
//   }, []);

//   return {
//     animateClass,
//     toggleLock,
//     hideSidebar,
//     showSidebar,
//     toggleSidebar,
//     openSidebar,
//     evaluateHoverState,
//     initializeState,
//     onPageRefresh,
//   };
// };

// export default Functions;
