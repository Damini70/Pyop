// import React, { useState } from "react";
// import "./Sidebar.css"; // Include this CSS for styling
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         {isCollapsed ? ">" : "<"}
//       </button>
//       <div className="content">
//         {!isCollapsed && (
//           <>
//             <h3>Sidebar</h3>
//             <ul>
//               <li>
//                 <Link to={"/customer/dashboard"}>Home</Link>
//               </li>
//               <li>
//                 <Link to={"/customer/kart"}>Cart</Link>
//               </li>
//               <li>Logout</li>
//             </ul>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import "./Sidebar.css"; // Include this CSS for styling
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { setProfile } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // To get the current URL for highlighting
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { return: true });
    dispatch(setProfile({}));
  };

  const links = [
    { path: "/customer/dashboard", icon: <FaHome />, label: "Home" },
  ];

  return (
    <div className={`customer-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? ">" : "<"}
      </button>
      <div className="content">
        {!isCollapsed && <h3>Customer Sidebar</h3>}
        <ul>
          {links.map((link) => (
            <li
              key={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              <Link to={link.path}>
                {link.icon}
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            </li>
          ))}
          <li
            className={location.pathname === "/customer/login" ? "active" : ""}
          >
            <Link
              to="/customer/login"
              onClick={handleLogout}
              className="logout-btn"
            >
              <FaSignOutAlt />
              {!isCollapsed && <span>Logout</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
