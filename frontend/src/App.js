import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import AppRoutes from "./routes";
import UserProvider from "./components/Context/AppContext";
/********** Application Components */

function App(props) {
  return (
    <div className="App">
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  );
}

export default App;
