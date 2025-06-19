import React, { useEffect, useState } from "react";
import VendorSidebar from "../../../components/VendorSidebar/VendorSidebar";
import generalFunctions, {
  makeRequest,
} from "../../../services/generalFunctions";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import Select from "react-select";
import { useLocation } from "react-router";
import ServiceForm from "../../../components/ServiceForm";

const Dashboard = () => {
  const userId = useSelector((state) => state.global.userId);
  const location=useLocation();
  const vendor_id=location.state;
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
    vendor_id: userId||vendor_id,
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
      console.log(apiData);
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
      console.log(apiData);
      toast.error(apiData.message);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const apiData = await makeRequest(
        "get",
        `/vendor/vendor-categories?vendorId=${userId||vendor_id}`
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
    <div className=" d-flex w-100 bg-vendor-pyop">
      <VendorSidebar />
      <div className=" w-100">
        <div className="">
          <DashboardHeader title={"Dashboard"} isBusiness={true}/>
          <div className="row g-0">
            <div className="col-6">
            </div>
            <div className="col-6 p-2">
            <ServiceForm  userId={userId} vendor_id={vendor_id} userCategories={userCategories} userSubCategoryList={userSubCategoryList} userServiceTypeList={userServiceTypeList}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
