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
    <div className="d-flex">
      <Sidebar />

      <div className="  w-100 ms-3">
        <DashboardHeader title={"Dashboard"} isCustomer={true} />
        <div className="row g-2 mt-3">
          {allServices?.map((service) => {
            return (
              <div className="col-3 ">
                <div className="card shadow-sm border border-0 p-2 my-2">
                  <div>
                    <img
                      className="w-100 rounded"
                      src={service.images[0].data}
                    ></img>
                  </div>
                  <div className="mt-2 d-flex flex-column">
                    <span className="card-key">
                      <span className="font-bold">{service.service_name}</span>
                    </span>
                    <span className="card-key">
                      <span className="card-value">{service.sub_category}</span>
                    </span>
                    <span className="card-key">
                      {" "}
                      service type:{" "}
                      <span className="card-value">{service.service_type}</span>
                    </span>
                    {/* <span className="card-key">
                      {" "}
                      sub category:{" "}
                      <span className="card-value">{service.sub_category}</span>
                    </span> */}
                    <span className="card-key">
                      {" "}
                      price: <span className="card-value">{service.price}</span>
                    </span>
                    {/* <span className="card-key">
                      description:{" "}
                      <span className="card-value">{service.description}</span>
                    </span> */}
                    <div className="flex justify-between">
                      <span>Contact </span>
                      {service.vendor_id.contact_number}
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
