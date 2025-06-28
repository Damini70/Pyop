import React, { useEffect, useState } from "react";
import VendorSidebar from "../../../components/VendorSidebar/VendorSidebar";
import generalFunctions, {
  makeRequest,
} from "../../../services/generalFunctions";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import { useLocation } from "react-router";
import ServiceForm from "../../../components/ServiceForm";
import VendorLisitngs from "../lisitngs/VendorLisitngs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const userId = useSelector((state) => state.global.userId);
  const location = useLocation();
  const vendor_id = location.state;

  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const [userCategories, setUserCategories] = useState([]);
  const [userServiceTypeList, setUserServiceTypeList] = useState([]);
  const [userServiceLocations, setUserServiceLocations] = useState([]);
  const [userSubCategoryList, setUserSubCategoryList] = useState([]);
  const [openService, setOpenService] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [serviceData, setServiceData] = useState({
    service_name: "",
    service_type: "",
    category: "",
    sub_category: "",
    description: "",
    price: "",
    images: [],
    catering: {
      is_catering: false,
      price_catering_including: "",
      minimum_qty: "",
    },
    vendor_id: userId || vendor_id,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("catering")) {
      setServiceData((prevState) => ({
        ...prevState,
        catering: {
          ...prevState.catering,
          [name.split(".")[1]]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setServiceData({ ...serviceData, [name]: value });
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setServiceData((prevState) => ({
      ...prevState,
      [name]: selectedOption?.value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Service Data Submitted:", serviceData);
  };

  const postService = async () => {
    const formData = new FormData();
    formData.append("service_name", serviceData.service_name);
    formData.append("service_type", serviceData.service_type);
    formData.append("category", serviceData.category);
    formData.append("sub_category", serviceData.sub_category);
    formData.append("description", serviceData.description);
    formData.append("price", serviceData.price);
    formData.append("vendor_id", userId);
    formData.append("catering", JSON.stringify(serviceData.catering));
    serviceData.images.forEach((file) => formData.append("images", file));

    const apiData = await makeRequest("post", "/vendor/add-service", formData);

    if (apiData.status) {
      toast.success(apiData.message);
      setServiceData({
        service_name: "",
        service_type: "",
        category: "",
        sub_category: "",
        description: "",
        price: "",
        images: [],
        catering: {
          is_catering: false,
          price_catering_including: "",
          minimum_qty: "",
        },
        vendor_id: userId,
      });
      setOpenService(false)
    } else {
      toast.error(apiData.message);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const apiData = await makeRequest(
        "get",
        `/vendor/vendor-categories?vendorId=${userId || vendor_id}`
      );
      if (apiData.status) {
        setUserCategories(apiData.data.categories);
        setUserServiceLocations(apiData.data.service_locations);
        setUserServiceTypeList(apiData.data.service_type);
        setUserSubCategoryList(apiData.data.sub_categories);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen bg-vendor-pyop overflow-y-auto">
        {/* Toggle Sidebar Button */}
        <div className="md:hidden p-4 shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sm px-4 text-white rounded-md"
          >
            {sidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full bg-white shadow md:shadow-none z-50 h-screen ${
            isCollapsed ? "md:w-[5%]" : "md:w-[10%]"
          }`}
        >
          <VendorSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1  ${
            isCollapsed ? "md:w-[95%] pr-6 lg:pl-10" : "md:w-[80%] pr-6"
          }`}
        >
          <div className="pl-9">
            <DashboardHeader title="Dashboard" isBusiness={true} />{" "}
          </div>
          <VendorLisitngs />
          <div className="w-[100%] flex justify-center  my-8">
            <button
              className=" px-6 py-2 rounded-md shadow transition mb-5 ml-4 md:ml-[5rem]"
              onClick={() => setOpenService(!openService)}
            >
              {openService ? "Close" : "Add"} Service
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column Placeholder */}

            {/* Right Column - Service Form */}
            <Dialog
              open={openService}
              onClose={() => setOpenService(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogContent dividers>
                <ServiceForm
                  userId={userId}
                  vendor_id={vendor_id}
                  userCategories={userCategories}
                  userSubCategoryList={userSubCategoryList}
                  userServiceTypeList={userServiceTypeList}
                />
              </DialogContent>

              <DialogActions>
                <button
                  className="bg-red-800 hover:bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => setOpenService(false)}
                >
                  Cancel
                </button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
