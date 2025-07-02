import React, { useState } from "react";
import { signupUser } from "../../../services/generalFunctions";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // show loader
    setLoading(true);

    // 1️⃣ Basic form validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const apiData = await signupUser(formData);

      if (apiData.status) {
        toast.success(apiData.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          contact_number: "",
          address: "",
        });
        toast.success("Please login to continue");
      } else if (apiData.errors) {
        apiData.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(apiData.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div className="customer-signup-area-wrapper px-3 mt-20 ml-3">
          {/* <h2>Signup</h2> */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="pyop-input-label">Name</label>
              <input
                className="pyop-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="pyop-input-label">Email</label>
              <input
                className="pyop-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="pyop-input-label">Password</label>
              <input
                className="pyop-input"
                type="password"
                name="password"
                value={formData.password}
                minlength={8}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="pyop-input-label">Contact Number</label>
              <input
                className="pyop-input"
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="form-group">
          <label className="pyop-input-label">Address</label>
          <input
            className="pyop-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div> */}

            <button type="submit" className="pyop-button md:p-2 ">
              Signup
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
