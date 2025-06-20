import React, { useEffect, useState } from "react";
import "./DashboardHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImg } from "../../redux/actions";
import toast from "react-hot-toast";
import { makeRequest } from "../../services/generalFunctions";
import { useLocation, useNavigate } from "react-router";
import { SquarePen } from "lucide-react";
import { Button } from "@mui/material";

const DashboardHeader = ({ title, isBusiness }) => {
  const vendorId = useSelector((state) => state.global.userId);
  const proImg = useSelector((state) => state.global.profileImg);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    }
  };

  useEffect(() => {
    if (isBusiness) {
      getImage();
    }
  }, [vendorId && isBusiness]);

  return (
    <div className="d-flex flex-column p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="dashboard-header-title">{title}</span>
        </div>
        <div className="flex justify-content-end cursor-pointer m-1">
          <img
            src={proImg}
            alt="profile"
            onClick={() => navigate("/business/profile")}
            style={{ width: "3rem", borderRadius: "3rem", cursor: "pointer" }}
          />
        </div>
      </div>
      <hr className="mx-3 m-0" />
    </div>
  );
};

export default DashboardHeader;
