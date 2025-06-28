import React, { useState } from "react";
import axios from "axios";
import { loginVendor } from "../../../services/generalFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { setPassword, setProfile, setUserId } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../routes/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) {
      setErrorMessage("All fields are required!");
      return;
    }

    const apiData = await loginVendor(formData.email, formData.password);
    if (apiData.status) {
      localStorage.clear();
      toast.success("Login Successfully");
      dispatch(setPassword(formData.password));
      localStorage.setItem("token", apiData.token);
      dispatch(setUserId(apiData.data.id));
      dispatch(setProfile(apiData.data));
      localStorage.setItem("business", JSON.stringify(apiData.data));
      login("business");
      navigate("/business/dashboard", { state: apiData?.data?.id });
    } else {
      toast.error(apiData.message);
    }
  };

  return (
    <div className="!w-[100%] px-3 pt-5">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="pyop-button p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
