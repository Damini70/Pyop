import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/CommonBnC/Home/Home";
import VendorSignup from "../pages/Business/login/VendorSignup";
import EntryLogin from "../pages/Customer/login/EntryLogin";
import EntryVendor from "../pages/Business/login/EntryVendor";
import Dashboard from "../pages/Business/dashboard/Dashboard";
import CustomerDashboard from "../pages/Customer/login/dashboard/CustomerDashboard";
import VendorProfile from "../pages/Business/Profile/VendorProfile";
import VendorLisitngs from "../pages/Business/lisitngs/VendorLisitngs";
import Kart from "../pages/Customer/login/Kart/Kart";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import CustomerServiceInfo from "../pages/Customer/login/dashboard/CustomerServiceInfo";
import CreateParty from "../pages/Customer/login/CreateParty/CreateParty";
import CustomParty from "../pages/Customer/CustomParty/CustomParty";
import PyopParty from "../pages/Customer/PyopParty.js/PyopParty";

const CustomerProtectedRoute=(element)=>{
 return <ProtectedRoute  requiredRole="customer" >{element}</ProtectedRoute>
}
const BusinessProtectedRoute=(element)=>{
  return <ProtectedRoute requiredRole="business">{element}</ProtectedRoute>
}


const Routings = () => {
  return (
    <div>
      {/* <Header /> */}
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
            
        <Route path="/customer/login" element={<EntryLogin />} />
        <Route path="/customer/dashboard" element={CustomerProtectedRoute(<CustomerDashboard />)} />
        <Route path="/customer/dashboard/info" element={CustomerProtectedRoute(<CustomerServiceInfo/>)}/>
        <Route path="/business/signup" element={<EntryVendor />} />
        <Route path="/business/dashboard" element={BusinessProtectedRoute(<Dashboard />)} />
        <Route path="/business/profile" element={BusinessProtectedRoute(<VendorProfile />)} />
        <Route path="/business/listings" element={BusinessProtectedRoute(<VendorLisitngs/>)} />
        <Route path="/customer/kart" element={CustomerProtectedRoute(<Kart/>)} />
        <Route path="/customer/custom-party" element={<ProtectedRoute requiredRole="customer"><CustomParty/></ProtectedRoute>}/>
        <Route path="/customer/pyop-party" element={<ProtectedRoute requiredRole="customer"><PyopParty/></ProtectedRoute>}/>
        <Route path="/customer/create-party" element={CustomerProtectedRoute(<CreateParty/>)}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </AuthProvider>
    </div>
  );
};

export default Routings;
