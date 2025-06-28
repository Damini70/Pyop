import React, { useEffect, useState } from "react";
import VendorSidebar from "../../../components/VendorSidebar/VendorSidebar";
import { makeRequest } from "../../../services/generalFunctions";
import { useSelector } from "react-redux";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import { SquarePen, Trash2 } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ServiceForm from "../../../components/ServiceForm";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const VendorLisitngs = () => {
  const userId = useSelector((state) => state.global.userId);
  const [listings, setListings] = useState([]);
  const [openEditServiceListing, setOpenEditServiceListing] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [userServiceTypeList, setUserServiceTypeList] = useState([]);
  const [userServiceLocations, setUserServiceLocations] = useState([]);
  const [userSubCategoryList, setUserSubCategoryList] = useState([]);
  const [editListing, setEditListing] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);
  const getListings = async () => {
    try {
      const apiData = await makeRequest(
        "get",
        `vendor/vendor-listings?vendorId=${userId}`
      );
      console.log(apiData.data);

      if (apiData.status) {
        setListings(apiData.data);
      } else {
        console.error("Error fetching listings:", apiData);
      }
    } catch (error) {
      console.error("An error occurred while fetching listings:", error);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const apiData = await makeRequest(
        "get",
        `/vendor/vendor-categories?vendorId=${userId}`
      );
      if (apiData.status) {
        setUserCategories(apiData.data.categories);
        setUserServiceLocations(apiData.data.service_locations);
        setUserServiceTypeList(apiData.data.service_type);
        setUserSubCategoryList(apiData.data.sub_categories);
      }
    };
    fetchServices();
    getListings();
  }, [loading]);

  const handleEdit = (id) => {
    setOpenEditServiceListing(true);
    const edit = listings.filter((item) => item._id == id);
    setEditListing(...edit);
  };
  const handleDelete = async () => {
    try {
      const res = await makeRequest(
        "delete",
        `/vendor/delete-vendor-listing?serviceId=${deleteId}`
      );
      if (res.status) {
        getListings();
        toast.success("Service deleted successfully!");
        setOpenDelete(false);
      }
    } catch (error) {
      setOpenDelete(false);
      console.log(error);
    } finally {
      // setOpenDelete(false)
    }
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogContent>Are you sure you want to delete this?</DialogContent>
            <DialogActions>
              <Button onClick={handleDelete}>OK</Button>
              <Button onClick={() => setOpenDelete(false)} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openEditServiceListing}
            onClose={() => setOpenEditServiceListing(false)}
          >
            <DialogContent>
              <ServiceForm
                userId={userId}
                userCategories={userCategories}
                userSubCategoryList={userSubCategoryList}
                userServiceTypeList={userServiceTypeList}
                openEditServiceListing={openEditServiceListing}
                setOpenEditServiceListing={setOpenEditServiceListing}
                editListing={editListing}
                setLoading={setLoading}
                setEditListing={setEditListing}
              />
            </DialogContent>
            {/* <DialogActions>
          <Button onClick={()=>setOpenEditServiceListing(false)}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions> */}
          </Dialog>
          <div className="d-flex w-[100%] flex items-center justify-center">
            {/* <VendorSidebar /> */}
            <div className="col-10">
              {/* <DashboardHeader title={"Listings"} /> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 g-2 mt-2 ">
                {listings.map((listing) => (
                  <div className="w-[100%]">
                    <div className="h-[260px] flex flex-col justify-between p-4 shadow rounded-lg bg-white overflow-hidden my-3 mx-3">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-lg line-clamp-2">
                          Service Name: {listing.service_name}
                        </h5>
                        <div className="flex gap-2">
                          <SquarePen
                            className="cursor-pointer text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(listing._id)}
                          />
                          <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => {
                              setOpenDelete(true);
                              setDeleteId(listing._id);
                            }}
                          />
                        </div>
                      </div>

                      {/* Scrollable Body */}
                      <div className="text-sm overflow-y-auto flex-1 pr-1">
                        <p className="mb-1">
                          Description: {listing.description}
                        </p>
                        <p className="mb-1">
                          Service type: {listing.service_type}
                        </p>
                        <p className="mb-1">
                          Sub category: {listing.sub_category}
                        </p>
                        <p className="mb-1">Category: {listing.category}</p>

                        {listing?.catering?.is_catering && (
                          <>
                            <p className="mb-1">
                              Price with Food:{" "}
                              {listing?.catering?.price_catering_including}
                            </p>
                            <p>
                              Minimum order qty:{" "}
                              {listing?.catering?.minimum_qty}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  // <div className="col-4">{listing.service_name}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VendorLisitngs;
