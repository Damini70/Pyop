import React, { useEffect, useState } from "react";
import VendorSidebar from "../../../components/VendorSidebar/VendorSidebar";
import { makeRequest } from "../../../services/generalFunctions";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import { SquarePen } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import VendorSignup from "../login/VendorSignup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { setProfile } from "../../../redux/actions";

const VendorProfile = () => {
  const userId = useSelector((state) => state.global.userId);
  const password = useSelector((state) => state.global.password);
  const profileImg = useSelector((state) => state.global.profileImg);
  const dispatch = useDispatch();

  /* -------------- NEW: sidebar toggle -------------- */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* -------------- existing state -------------- */
  const [profile, setProfile] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(true);
  const [openPasswordEdit, setOpenPasswordEdit] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* -------------- react‑hook‑form -------------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* -------------- handlers (UNCHANGED) -------------- */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      const res = await makeRequest(
        "post",
        `/vendor/update-password?vendorId=${userId}`,
        payload
      );
      if (res.status) {
        toast.success("Password Updated Successfully");
        setOpenPasswordEdit(false);
        reset();
      } else {
        toast.error(
          res.error || "Failed to update password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getImage = async () => {
    try {
      setLoading(true);
      const res = await makeRequest(
        "get",
        `/vendor/vendor-profilepic?vendorId=${userId}`
      );
      if (res?.status) toast.success("Profile Pic Successfully Changed");
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_pic", selectedFile);
      const res = await makeRequest(
        "post",
        `/vendor/vendor-profilepic?vendorId=${userId}`,
        formData
      );
      if (res.status) {
        toast.success("Profile Picture updated successfully");
        getImage();
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to change profile picture");
    }
    setShowFiles(false);
  };

  const getProfile = async () => {
    const apiData = await makeRequest(
      "get",
      `vendor/vendor-profile?vendorId=${userId}`
    );
    if (apiData.status) setProfile(apiData.data);
  };

  useEffect(() => {
    getProfile();
  }, [loading]);

  const handleProfileEdit = () => setOpenEdit(true);

  /* ------------------- RENDER ------------------- */
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* ---- Edit profile dialog (unchanged) ---- */}
          <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
            <DialogTitle>Edit Your Profile</DialogTitle>
            <DialogContentText>
              <div className="flex justify-center py-3">
                <VendorSignup
                  showDialog={showDialog}
                  profile={profile}
                  setOpenEdit={setOpenEdit}
                  getProfile={getProfile}
                />
              </div>
            </DialogContentText>
          </Dialog>

          {/* ---- Password dialog (unchanged) ---- */}
          <Dialog
            open={openPasswordEdit}
            onClose={() => setOpenPasswordEdit(false)}
          >
            <DialogContent>
              <div className="flex items-center justify-center">
                <div className="text-white">
                  <h2 className="text-xl font-semibold mb-4">
                    Set New Password
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full text-white rounded-md p-2 focus:outline-none"
                      {...register("currentPassword", { required: true })}
                    />
                    {errors.currentPassword && (
                      <span>This field is required</span>
                    )}
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full text-white rounded-md p-2 focus:outline-none"
                      {...register("newPassword", { required: true })}
                    />
                    {errors.newPassword && <span>This field is required</span>}
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full text-white rounded-md p-2 focus:outline-none"
                      {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && (
                      <span>This field is required</span>
                    )}
                    <div className="flex">
                      <Button onClick={() => setOpenPasswordEdit(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* ---- Page layout ---- */}
          <div className="d-flex flex-column flex-md-row">
            {/* MOBILE TOGGLE BUTTON */}
            <div className="d-md-none p-3 shadow-sm">
              <button className="" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? "Close Menu" : "Open Menu"}
              </button>
            </div>

            {/* SIDEBAR (toggle visibility on mobile) */}
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

            {/* MAIN CONTENT */}
             <div
          className={`flex-1 ${
            isCollapsed ? "md:w-[95%] pr-6 lg:pl-10" : "md:w-[80%] pr-6"
          }`}
        >
              <DashboardHeader title={"Profile"} />

              <div className="card mt-2 mx-3 p-3 !ml-11">
             <div className="flex flex-col md:flex-row md:justify-end lg:flex-row">
                  {/* Left column: avatar + edit picture */}
                  <div>
                    <img
                      src={profileImg}
                      alt="profile"
                      className="rounded-xl w-[100%] h-[80%] object-cover"
                    />
                    <Button
                      className="mt-4 flex"
                      onClick={() => setShowFiles(true)}
                    >
                      <SquarePen />
                      <span className="ml-2">Edit Profile</span>
                    </Button>

                    {/* Bootstrap modal for uploading picture (unchanged) */}
                    {showFiles && (
                      <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">
                                Upload Profile Picture
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setShowFiles(false)}
                              ></button>
                            </div>
                            <div className="modal-body">
                              <p>
                                Select a profile picture to upload. Make sure
                                the image is clear and professional.
                              </p>
                              <input
                                type="file"
                                onChange={handleFileChange}
                                className="form-control"
                                accept="image/*"
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowFiles(false)}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right column: profile details */}
                  <div className="flex justify-between mx-3">
                    <div>
                      {profile && (
                        <>
                          <h4>
                            company name:{" "}
                            <span className="fs-5">{profile.company_name}</span>
                          </h4>
                          <h4>reg yr: {profile.company_reg_year}</h4>
                          <h4>ph: {profile.contact_number}</h4>
                          <h4>email: {profile.email}</h4>
                          <h4>gst: {profile.gst_number}</h4>
                          <h4>Name: {profile.name}</h4>
                          <div>
                            category :{" "}
                            {profile.categories &&
                              profile.categories.map(
                                (item) => item.categoryName
                              )}
                            <br />
                            Sub cat :
                            {profile.sub_categories &&
                              profile.sub_categories.map(
                                (item) => item.subCategoryName
                              )}
                            <br />
                            Service type:{" "}
                            {profile.service_type &&
                              profile.service_type.map((item) => item.name)}
                            <br />
                            Locations:{" "}
                            {profile.service_locations &&
                              profile.service_locations.map(
                                (item) => item.label
                              )}
                            <div>
                              {/* <Button
                                onClick={() => setOpenPasswordEdit(true)}
                                className=""
                                style={{
                                  display: "flex",
                                  justifyContent: "start",
                                }}
                              >
                                Set New Password
                              </Button> */}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <SquarePen
                      onClick={handleProfileEdit}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VendorProfile;
