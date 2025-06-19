import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaList, FaUser } from "react-icons/fa"; // Import icons
import logo from "../../Images/holidays-party.png";
import "./VendorSidebar.css"; // Import CSS for styling
import pyopLogo from "../../Images/pyoplogo.jpg";
import { setProfile, setUserId } from "../../redux/actions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const VendorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Track collapsed state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev); // Toggle sidebar state
  };

  const handleLogout = () => {
    toast.success("Logout Successfully!");
    localStorage.clear();
    dispatch(setProfile({}));
    navigate("/", { replace: true });
    setUserId("");
  };
  return (
    <div
      className={`vendorSidebar ${
        isCollapsed ? "collapsed" : ""
      } bg-pyopSidebar`}
    >
      {/* Header / Logo Section */}
      <div className="sidebar-header d-flex align-items-center p-3">
        {!isCollapsed && (
          <img
            src={pyopLogo}
            alt="logo"
            className="sidebar-logo rounded rounded-5"
          />
        )}
        <button className="btn ms-auto" onClick={toggleSidebar}>
          {isCollapsed ? "→" : "←"}
        </button>
      </div>
      <hr></hr>
      {/* Menu Items */}
      <ul className="menu-list list-unstyled p-3">
        <li>
          <Link
            to="/business/dashboard"
            className="menu-item d-flex align-items-center"
          >
            <FaTachometerAlt className="menu-icon" />
            {!isCollapsed && <span className="ms-2">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/business/listings"
            className="menu-item d-flex align-items-center"
          >
            <FaList className="menu-icon" />
            {!isCollapsed && <span className="ms-2">My Listings</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/business/profile"
            className="menu-item d-flex align-items-center"
          >
            <FaUser className="menu-icon" />
            {!isCollapsed && <span className="ms-2">Profile</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/business/signup"
            className="menu-item d-flex align-items-center"
            onClick={() => handleLogout()}
          >
            <FaUser className="menu-icon" />
            {!isCollapsed && <span className="ms-2">Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default VendorSidebar;
