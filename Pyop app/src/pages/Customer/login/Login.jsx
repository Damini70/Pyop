import React, { useState } from "react";
import axios from "axios";
import { loginUser } from "../../../services/generalFunctions";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../routes/AuthContext";
import { useDispatch } from "react-redux";
import { setProfile, setUserId } from "../../../redux/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const location = useLocation();
  console.log(location);

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

    const apiData = await loginUser(formData.email, formData.password);
    if (apiData.status) {
      localStorage.clear();
      localStorage.setItem("token", apiData.token);
      localStorage.setItem("customer", JSON.stringify(apiData.data));
      dispatch(setUserId(apiData.data.id));
      dispatch(setProfile(apiData.data));
      login("customer");
      // console.log(location.state);
      if (location.state) navigate(location.state);
      else navigate("/customer/dashboard");
    } else {
      setErrorMessage(apiData.message);
    }
  };

  return (
    <div className="px-4">
      {/* <h2>Login</h2> */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="pyop-input-label">Email</label>
          <input
            type="email"
            className="pyop-input"
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

        <button type="submit" className="pyop-button md:p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
