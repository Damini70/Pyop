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

const Dashboard = () => {
  const userId = useSelector((state) => state.global.userId);
  const location = useLocation();
  const vendor_id = location.state;

  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const [userCategories, setUserCategories] = useState([]);
  const [userServiceTypeList, setUserServiceTypeList] = useState([]);
  const [userServiceLocations, setUserServiceLocations] = useState([]);
  const [userSubCategoryList, setUserSubCategoryList] = useState([]);

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
    <div className="flex flex-col md:flex-row w-full h-screen bg-vendor-pyop overflow-y-auto">
      {/* Toggle Sidebar Button */}
      <div className="md:hidden p-4 bg-white shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-[15rem] bg-white shadow md:shadow-none z-50 h-screen`}
      >
        <VendorSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <DashboardHeader title="Dashboard" isBusiness={true} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column Placeholder */}
          <div className="hidden lg:block">{/* Optional content */}</div>

          {/* Right Column - Service Form */}
          <div className="">
            <ServiceForm
              userId={userId}
              vendor_id={vendor_id}
              userCategories={userCategories}
              userSubCategoryList={userSubCategoryList}
              userServiceTypeList={userServiceTypeList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
