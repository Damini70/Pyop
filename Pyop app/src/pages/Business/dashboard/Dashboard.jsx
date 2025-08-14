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
  Menu,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AlignJustify, User, LogOut } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setProfile } from "../../../redux/actions";
import { useAuth } from "../../../routes/AuthContext";

const Dashboard = () => {
  const userId = useSelector((state) => state.global.userId);
  const location = useLocation();
  const vendor_id = location.state;
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userCategories, setUserCategories] = useState([]);
  const [userServiceTypeList, setUserServiceTypeList] = useState([]);
  const [userServiceLocations, setUserServiceLocations] = useState([]);
  const [userSubCategoryList, setUserSubCategoryList] = useState([]);
  const [openService, setOpenService] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(false);

  // Menu handlers
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    toast.success("Logout Successfully!");
    dispatch(setProfile({}));
    logout();
    handleCloseMenu();
  };

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
      setOpenService(false);
    } else {
      toast.error(apiData.message);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      // setLoading(true); // NEW
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
      // setLoading(false); // NEW
    };
    fetchServices();
  }, [userId || vendor_id]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen bg-gray-50">
          <div className="text-center">
            <CircularProgress color="primary" size={60} />
            <p className="mt-4 text-gray-600 font-medium">Loading Dashboard...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
          {/* Mobile Header with Menu */}
          <div className="md:hidden bg-white shadow-sm border-b">
            <div className="flex items-center justify-between p-2">
              <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex items-center">
                <button
                  onClick={handleOpenMenu}
                  className="p-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition-colors flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <User size={20} />
                </button>
                
                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    className: 'mt-2 shadow-lg border'
                  }}
                >
                  <MenuItem onClick={handleLogout} className="flex items-center gap-2 px-4 py-2">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Desktop Header */}
            <div className="hidden md:block bg-white shadow-sm border-b">
              <div className="px-6 ">
                <DashboardHeader
                  title="Dashboard"
                  isBusiness={true}
                  loading={loading}
                  setloading={setLoading}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-6 space-y-6">
                {/* Vendor Listings */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <VendorLisitngs
                    listings={listings}
                    setListings={setListings}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>

                {/* Add Service Button */}
                <div className="flex justify-center">
                  <button
                    className="bg-blue-900 text-white hover:bg-blue-800 transition-colors px-8 py-3 rounded-lg shadow-md duration-200 transform hover:scale-105 font-medium flex items-center gap-2"
                    onClick={() => setOpenService(!openService)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {openService ? "Close Service Form" : "Add New Service"}
                  </button>
                </div>
              </div>
            </div>

            {/* Service Form Dialog */}
            <Dialog
              open={openService}
              onClose={() => setOpenService(false)}
              maxWidth="md"
              fullWidth
              PaperProps={{
                className: "rounded-lg"
              }}
            >
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6">
                <h2 className="text-2xl font-bold">Add New Service</h2>
                <p className="text-blue-100 mt-1">Fill in the details to create a new service listing</p>
              </div>
              
              <DialogContent dividers className="p-6">
                <ServiceForm
                  userId={userId}
                  vendor_id={vendor_id}
                  userCategories={userCategories}
                  userSubCategoryList={userSubCategoryList}
                  userServiceTypeList={userServiceTypeList}
                  setOpenService={setOpenService}
                  setListings={setListings}
                  loading={loading}
                  setLoading={setLoading}
                />
              </DialogContent>

              <DialogActions className="p-4 bg-gray-50">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                  onClick={() => setOpenService(false)}
                >
                  Cancel
                </button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
