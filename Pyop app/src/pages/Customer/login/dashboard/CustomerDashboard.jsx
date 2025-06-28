import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../../services/generalFunctions";
import toast from "react-hot-toast";
import Sidebar from "../Sidebar/Sidebar";
import { setKartItem } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { ShoppingCart } from "lucide-react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const kartItem = useSelector((state) => state.global.kartItem);
  const [allServices, setAllServices] = useState([]);
  const [vendorDetails, setVendorDetails] = useState([]);
  const state = useSelector((state) => state.stableData.filterData);
  const [localFilterData, setLocalFilterData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchFilterData = async () => {
      const res = await makeRequest("get", "/save-preferences");
      if (res.status) {
        setLocalFilterData(res.data);
      }
    };
    if (Object.keys(state).length === 0) {
      fetchFilterData();
    }
  }, []);
  console.log(state);

  const navigate = useNavigate();
  useEffect(() => {
    const getAllServices = async () => {
      try {
        const queryParams = Object.entries(state)
          .filter(
            ([key, value]) => (value && value !== "false") || value === true
          )
          .map(([key, value]) => {
            const queryKey = key === "eventType" ? "event" : key;
            return `${encodeURIComponent(queryKey)}=${encodeURIComponent(
              value
            )}`;
          })
          .join("&");

        const apiData = await makeRequest(
          "get",
          `user/all-services?${queryParams}`
        );

        console.log({ apiData });
        if (apiData.status) {
          console.log(apiData.data);
          setAllServices(apiData.services);
        } else {
          console.log(apiData);

          toast.error(apiData.message);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    getAllServices();
  }, []);

  const handleAddToCart = async (id) => {
    try {
      const res = await makeRequest(
        "put",
        `/vendor/update-services?serviceId=${id}`
      );
      if (res.status) {
        dispatch(setKartItem([res.data]));
        toast.success("Item added to the cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row w-100 min-vh-100">
      {/* Mobile Sidebar Toggle Button */}
      <div className="d-md-none p-3 bg-white shadow-sm w-[100%]">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="button">
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "d-block" : "d-none"} d-md-block vh-100 ${
          isCollapsed ? "md:w-[5%]" : "md:w-[20%]"
        }`}
      >
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content */}
      <div
        className={`w-[100%] px-6 lg:pl-0  ${
          isCollapsed ? "md:w-[95%] pr-6 lg:pl-10" : "md:w-[80%] pr-6"
        }`}
      >
        <DashboardHeader title={"Dashboard"} isCustomer={true} />
        <div className="row g-3">
          {allServices?.map((service) => {
            return (
              <div
                key={service._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mt-3"
              >
                <div className="card shadow-sm border p-2 my-2 w-100 d-flex flex-column justify-content-between">
                  <div>
                    <img
                      className="w-100 rounded object-fit-cover"
                      src={service.images[0]?.data}
                      alt={service.service_name}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="mt-2 d-flex flex-column">
                    <span className="card-key">
                      <span className="fw-bold">{service.service_name}</span>
                    </span>
                    <span className="card-key">
                      <span className="card-value">{service.sub_category}</span>
                    </span>
                    <span className="card-key">
                      {" "}
                      service type:{" "}
                      <span className="card-value">{service.service_type}</span>
                    </span>
                    <span className="card-key">
                      {" "}
                      price: <span className="card-value">{service.price}</span>
                    </span>
                    <div className="d-flex justify-content-between">
                      <span>Contact</span>
                      <span>{service.vendor_id.contact_number}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
