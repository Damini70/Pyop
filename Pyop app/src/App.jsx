import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Routings from "./routes/Routings";
import "./App.css";
import "./pages/Customer/login/Customer.css";
import "./pages/Business/login/Business.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";


const AppContent = () => {
  const location = useLocation();         

  const showHeader = location.pathname == "/";

  return (
    <>
      {showHeader && <Header />}
      <main className="">        
        <Routings />                      
      </main>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <Toaster />                            {/* toaster can live anywhere */}
    <AppContent />                         {/* everything gets router context */}
  </BrowserRouter>
);

export default App;
