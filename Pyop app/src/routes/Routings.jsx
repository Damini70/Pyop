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
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import CookiePolicy from "../pages/CookiePolicy/CookiePolicy";

const CustomerProtectedRoute = (element) => {
  return <ProtectedRoute requiredRole="customer">{element}</ProtectedRoute>;
};
const BusinessProtectedRoute = (element) => {
  return <ProtectedRoute requiredRole="business">{element}</ProtectedRoute>;
};

const Routings = () => {
  return (
    <div>
      {/* <Header /> */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/customer/login" element={<EntryLogin />} />
          <Route path="/business/signup" element={<EntryVendor />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* <Route path="/customer/dashboard" element={<EntryLogin />} />
          <Route path="/business/dashboard" element={<EntryVendor />} /> */}
          {/* Protected Routes */}-------------------------
          <Route
            path="/customer/dashboard"
            element={CustomerProtectedRoute(<CustomerDashboard />)}
          />
          {/* <Route path="/customer/dashboard/info" element={CustomerProtectedRoute(<CustomerServiceInfo/>)}/> */}
          <Route
            path="/business/dashboard"
            element={BusinessProtectedRoute(<Dashboard />)}
          />
          {/* <Route path="/business/profile" element={BusinessProtectedRoute(<VendorProfile />)} /> */}
          {/* <Route path="/business/listings" element={BusinessProtectedRoute(<VendorLisitngs/>)} /> */}
          {/* <Route path="/customer/kart" element={CustomerProtectedRoute(<Kart/>)} /> */}
          <Route
            path="/customer/custom-party"
            element={CustomerProtectedRoute(<CustomParty />)}
          />
          <Route
            path="/customer/pyop-party"
            element={CustomerProtectedRoute(<PyopParty />)}
          />
          <Route
            path="/customer/create-party"
            element={CustomerProtectedRoute(<CreateParty />)}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Routings;
