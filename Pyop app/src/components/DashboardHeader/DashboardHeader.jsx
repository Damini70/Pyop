import React, { useEffect, useState } from "react";
import "./DashboardHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, setProfileImg } from "../../redux/actions";
import toast from "react-hot-toast";
import { makeRequest } from "../../services/generalFunctions";
import { useLocation, useNavigate } from "react-router";
import { SquarePen } from "lucide-react";
import { Button, Menu, MenuItem } from "@mui/material"; // NEW  (added Menu & MenuItem)
import { useAuth } from "../../routes/AuthContext";

const DashboardHeader = ({ title, isBusiness }) => {
  const vendorId = useSelector((state) => state.global.userId);
  const proImg = useSelector((state) => state.global.profileImg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {logout}=useAuth()

  const [anchorEl, setAnchorEl] = useState(null); // NEW (menu anchor)

  const getImage = async () => {
    try {
      const res = await makeRequest(
        "get",
        `/vendor/vendor-profilepic?vendorId=${vendorId}`
      );

      if (res?.status) {
        dispatch(setProfileImg(res.profile_pic));
      } else {
        console.error("Failed to fetch profile picture:", res);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (isBusiness) {
      getImage();
    }
  }, [vendorId && isBusiness]);

  // NEW – open/close helpers and logout handler
  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget); // NEW
  const handleCloseMenu = () => setAnchorEl(null); // NEW
  const handleLogout = () => {
    toast.success("Logout Successfully!");
    dispatch(setProfile({}));
    logout();
  }; 

  return (
    <div className="d-flex flex-column p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="dashboard-header-title !text-primary">{title}</span>
        </div>

        <div className="flex justify-content-end cursor-pointer m-1">
          {/* profile image now opens the dropdown */}
          <img
            src={proImg}
            alt="profile"
            style={{ width: "3rem", borderRadius: "3rem", cursor: "pointer" }}
            onClick={handleOpenMenu} // NEW
          />

          {/* MUI dropdown */}
          <Menu // NEW
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <hr className="mx-3 m-0" />
    </div>
  );
};

export default DashboardHeader;
