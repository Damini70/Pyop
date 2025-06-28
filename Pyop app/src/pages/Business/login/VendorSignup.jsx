import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeRequest, signupVendor } from "../../../services/generalFunctions";
import toast from "react-hot-toast";
import Select, { components } from "react-select";
import { categoryArr, serviceArr } from "../../../services/category";
import { Button } from "@mui/material";

const serviceArea = [
  {
    label: "Noida",
    value: "Noida",
  },
  {
    label: "Delhi",
    value: "Delhi",
  },
  {
    label: "Ghaziabad",
    value: "Ghaziabad",
  },
  {
    label: "Faridabad",
    value: "Faridabad",
  },
  {
    label: "Gurgaon",
    value: "Gurgaon",
  },
  {
    label: "Mumbai",
    value: "Mumbai",
  },
  {
    label: "Pune",
    value: "Pune",
  },
  {
    label: "Chennai",
    value: "Chennai",
  },
  {
    label: "Hyderabad",
    value: "Hyderabad",
  },
  {
    label: "Bangalore",
    value: "Bangalore",
  },
  {
    label: "Kolkata",
    value: "Kolkata",
  },
  {
    label: "Ahmedabad",
    value: "Ahmedabad",
  },
];
const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      {/* <span role="img" aria-label={props.data.categoryName}></span>{" "} */}
      {props.data.name}
    </components.Option>
  );
};
const CustomOption2 = (props) => {
  return (
    <components.Option {...props}>
      {/* <span role="img" aria-label={props.data.categoryName}></span>{" "} */}
      {props.data.categoryName}
    </components.Option>
  );
};
const CustomOption3 = (props) => {
  return (
    <components.Option {...props}>
      {/* <span role="img" aria-label={props.data.categoryName}></span>{" "} */}
      {props.data.subCategoryName}
    </components.Option>
  );
};
const VendorSignup = ({
  setKey,
  showDialog = false,
  profile = {},
  setOpenEdit,
  getProfile,
}) => {
  const [subCategoryList, setSubCategoryList] = useState([]);
  console.log({ profile });
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    contact_number: "",
    company_reg_year: "",
    email: "",
    gst_number: "",
    password: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServiceArea, setSelectedServiceArea] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendorData = {
      ...formData,
      service_locations: selectedServiceArea,
      categories: selectedCategories,
      sub_categories: selectedSubCategory,
      service_type: selectedServices,
    };
    if (showDialog) {
      const profileRes = await makeRequest(
        "put",
        `vendor/update-vendor-profile?vendorId=${profile._id}`,
        vendorData
      );
      console.log(profileRes);
      if (profileRes.status) {
        getProfile();
        toast.success("Profile Data Updated Successfully");
        setOpenEdit(false);
      }
    } else {
      const apiData = await signupVendor(vendorData);
      if (apiData.status) {
        toast.success(apiData.message);
        toast.success("Please login to continue");
        setFormData({
          name: "",
          company_name: "",
          contact_number: "",
          email: "",
          password: "",
          gst_number: "",
          company_reg_year: "",
        });
        setSelectedCategories([]);
        setSelectedSubCategory([]);
        setSelectedServices([]);
        setSelectedServiceArea([]);
        setKey("first");
      } else {
        if (apiData.errors) {
          apiData.errors.map((item) => toast.error(item));
        } else {
          toast.error(apiData.message);
        }
      }
    }
  };

  useEffect(() => {
    if (showDialog) {
      setSelectedServiceArea([
        { label: "Noida", value: "Noida" },
        { label: "Delhi", value: "Delhi" },
      ]);
      setSelectedServices([{ name: "Music" }, { name: "Photography" }]);
      setSelectedSubCategory([
        { subCategoryName: "Seminar" },
        { subCategoryName: "Corporate Birthday" },
      ]);
      setSelectedCategories([
        {
          categoryName: "Corporate Events",
          subCategory: [
            { subCategoryName: "Conference" },
            { subCategoryName: "Seminar" },
            { subCategoryName: "Product Launch" },
            { subCategoryName: "Networking Events" },
            { subCategoryName: "Team Building Activity" },
            { subCategoryName: "Corporate Birthday" },
          ],
        },
        {
          categoryName: "Performing Arts Events",
          subCategory: [
            { subCategoryName: "Concerts" },
            { subCategoryName: "Theatre Production" },
            { subCategoryName: "Dance Recitals" },
            { subCategoryName: "Comedy Show" },
            { subCategoryName: "Opera" },
            { subCategoryName: "Music Festival" },
          ],
        },
      ]);
      setFormData({
        name: profile.name,
        company_name: profile.company_name,
        contact_number: profile.contact_number,
        email: profile.email,
        password: profile.password,
        gst_number: profile.gst_number,
        company_reg_year: profile.company_reg_year,
      });
    }
  }, [showDialog]);

  const handleServiceSelect = (e) => {
    setSelectedServices(e);
  };

  const handleCategogySelect = (categoryArray) => {
    setSelectedCategories(categoryArray);
    const subCategoryArray = categoryArray.reduce((acc, curr) => {
      if (curr.subCategory.length > 0) {
        return acc.concat(curr.subCategory);
      }
      return acc;
    }, []);

    setSubCategoryList(subCategoryArray);
  };
  const handleChangeSubCategory = (subCategoryArray) => {
    setSelectedSubCategory(subCategoryArray);
  };

  const handleChangeServiceArea = (serviceArray) => {
    setSelectedServiceArea(serviceArray);
  };
  console.log(selectedSubCategory);
  return (
    <div
      className={`${
        !showDialog ? "vendor-signup-wrapper" : ""
      } w-[100%]`}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
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
          <label className="pyop-input-label">Company Name</label>
          <input
            className="pyop-input"
            type="text"
            name="company_name"
            value={formData.company_name}
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

        {!showDialog && (
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
        )}

        {!showDialog && (
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
        )}
        <div className="form-group">
          <label className="pyop-input-label">Service Type</label>

          <Select
            isMulti
            name="options"
            options={serviceArr}
            onChange={handleServiceSelect}
            value={selectedServices}
            className="basic-multi-select"
            classNamePrefix="select"
            components={{ Option: CustomOption }}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.name}
          />
        </div>

        <div className="form-group">
          <label className="pyop-input-label">Categories</label>
          <Select
            isMulti
            name="options"
            options={categoryArr}
            onChange={handleCategogySelect}
            className="basic-multi-select"
            classNamePrefix="select"
            components={{ Option: CustomOption2 }}
            value={selectedCategories}
            getOptionLabel={(option) => option.categoryName}
            getOptionValue={(option) => option.categoryName}
          />
        </div>
        <div className="form-group">
          <label className="pyop-input-label">Sub Categories</label>
          <Select
            isMulti
            name="options"
            options={subCategoryList}
            value={selectedSubCategory}
            onChange={handleChangeSubCategory}
            className="basic-multi-select"
            classNamePrefix="select"
            components={{ Option: CustomOption3 }}
            getOptionLabel={(option) => option.subCategoryName}
            getOptionValue={(option) => option.subCategoryName}
          />
        </div>
        <div className="form-group">
          <label className="pyop-input-label">Service Locations</label>
          <Select
            isMulti
            name="options"
            options={serviceArea}
            value={selectedServiceArea}
            onChange={handleChangeServiceArea}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {!showDialog && (
          <div className="form-group">
            <label className="pyop-input-label">GST Number</label>
            <input
              type="text"
              className="pyop-input"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleChange}
              required
            />{" "}
          </div>
        )}

        <div className="form-group">
          <label className="pyop-input-label">Company Registration Year</label>
          <input
            type="text"
            className="pyop-input"
            name="company_reg_year"
            value={formData.company_reg_year}
            onChange={handleChange}
            required
          />
        </div>

        {showDialog ? (
          <div className="flex justify-between mt-3">
            <Button className="pyop-button" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        ) : (
          <button type="submit" className="pyop-button">
            Signup
          </button>
        )}
      </form>
    </div>
  );
};

export default VendorSignup;
