import React, { useState } from "react";
import { signupUser } from "../../../services/generalFunctions";
import toast from "react-hot-toast";

const Signup = () => {
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

    // Basic form validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    const apiData = await signupUser(formData);

    if (apiData.status) {
      console.log(apiData);
      toast.success(apiData.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        contact_number: "",
        address: "",
      });
      toast.success("Please login to continue");
    } else {
      if (apiData.errors) {
        apiData.errors.map((item) => toast.error(item));
      } else {
        toast.error(apiData.message);
      }
    }
  };

  return (
    <div className="customer-signup-area-wrapper px-3">
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
  );
};

export default Signup;
