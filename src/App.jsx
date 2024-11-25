import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidbar from "./components/Sidbar";
import Dashboard from "./page/Dashboard";
import "./App.css";

const App = () => {
  return (
    <div className="content">
      <BrowserRouter>
      
        <Sidbar />
        <div className="content--page">
        <Dashboard />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
