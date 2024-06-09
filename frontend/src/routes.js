import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

/*
      Application Components
*/
import { Layout } from "./components/dashboard/layout";
import Login from "./components/login_page/login";
import Sales from "./components/sales/sales";
import SalesHistory from "./components/saleHistory/saleHistory";
import Dashmain from "./components/dashboard/main/dashboard-main";
import NoPageFound from "./components/NoPageFound/NoPageFound";
import ThemeContext from "./components/dashboard/main/ThemeContext";
import Manufacturer from "./components/manufacturer/manufacturer";
import AddManufacturer from "./components/addManufacturer/addManufacturer";
import GenericName from "./components/generic_name/genericName";
import AddGenericName from "./components/add_generic_name/addGenericName";
import Category from "./components/category/category";
import AddCategory from "./components/addCategory/addCategory";
import Supplier from "./components/supplier/supplier";
import AddSupplier from "./components/add_supplier/addSupplier";
import Medicine from "./components/medicine/medicine";
import AddMedicine from "./components/add_medicine/addMedicine";
import Batch from "./components/batch/batch";
import AddBatch from "./components/add_batch/addBatch";
import Register from "./components/register_page/register";
import ReturnProduct from "./components/return_product/returnProduct";
import Users from "./components/users/users";
import AddUser from "./components/addUsers/addUsers";
import EditUserProfile from "./components/editUserProfile/editUserProfile";
import LogHistory from "./components/logHistory/logHistory";

const AppRoutes = (props) => {
  const [theme, setTheme] = useState("light"); // Manage theme state here

  const handleChildData = (theme) => {
    setTheme(theme);
  };
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("jwt") != null ? true : false;
  });
  return (
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setAuth={setIsAuth} />}></Route>
          {/* <Route path="/register" element={<Register />}></Route> */}
          {isAuth ? (
            <Route
              path="/dashboard"
              element={<Layout changeTheme={handleChildData} />}
            >
              <Route index element={<Dashmain />} />
              <Route path="/dashboard/sales" element={<Sales />} />
              <Route
                path="/dashboard/sales/return"
                element={<ReturnProduct />}
              />
              <Route
                path="/dashboard/sales-history"
                element={<SalesHistory />}
              />
              <Route
                path="/dashboard/manufacturer"
                element={<Manufacturer />}
              />
              <Route
                path="/dashboard/manufacturer/add"
                element={<AddManufacturer />}
              />
              <Route path="/dashboard/generic-name" element={<GenericName />} />
              <Route
                path="/dashboard/generic-name/add"
                element={<AddGenericName />}
              />
              <Route path="/dashboard/category" element={<Category />} />
              <Route path="/dashboard/category/add" element={<AddCategory />} />
              <Route path="/dashboard/supplier" element={<Supplier />} />
              <Route path="/dashboard/supplier/add" element={<AddSupplier />} />
              <Route path="/dashboard/medicine" element={<Medicine />} />
              <Route path="/dashboard/medicine/add" element={<AddMedicine />} />
              <Route path="/dashboard/batch" element={<Batch />} />
              <Route path="/dashboard/batch/add" element={<AddBatch />} />
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/dashboard/Users/add" element={<AddUser />} />
              <Route
                path="/dashboard/edit-profile"
                element={<EditUserProfile />}
              />
              <Route path="/dashboard/log-history" element={<LogHistory />} />
            </Route>
          ) : null}

          <Route path="*" element={<NoPageFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};
export default AppRoutes;
