import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Routings from "./routes/Routings";
import "./App.css";
import "./pages/Customer/login/Customer.css";
import "./pages/Business/login/Business.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routings />
      </BrowserRouter>
    </div>
  );
};

export default App;
