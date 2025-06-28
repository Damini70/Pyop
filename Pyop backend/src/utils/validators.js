const Joi = require("joi");
const multer = require("multer");
const express = require("express");
const upload = multer(); // Use in-memory storage for simplicity

const signupVendorValidatorSChema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name must be a type of string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be less than 30 characters",
  }),
  company_name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Company name must be a type of string",
    "string.empty": "Company name is required",
    "string.min": "Company name must be at least 2 characters",
    "string.max": "Company name must be less than 50 characters",
  }),
  contact_number: Joi.string()
    .length(10)
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      "string.base": "Contact number must be a type of string",
      "string.empty": "Contact number is required",
      "string.length": "Contact number must be 10 digits",
      "string.pattern.base": "Contact number must contain only digits",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a type of string",
    "string.empty": "Email is required",
    "string.email": "Email is not valid",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.base": "Password must be a type of string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be less than 20 characters",
  }),
  service_locations: Joi.array().min(1).required().messages({
    "array.base": "Service locations must be a type of array",
    "array.min": "Service locations is required and cannot be empty",
  }),
  gst_number: Joi.string().min(15).max(15).required().messages({
    "string.base": "GST number must be a type of string",
    "string.empty": "GST number is required",
    "string.min": "GST number must be 15 digits",
    "string.max": "GST number must be 15 digits",
  }),
  service_type: Joi.array().min(1).required().messages({
    "string.base": "Service type must be a type of array",
    "string.empty": "Service type is required",
  }),
  categories: Joi.array().min(1).required().messages({
    "array.base": "Categories must be a type of array",
    "array.min": "Categories is required and cannot be empty",
  }),
  sub_categories: Joi.array().min(1).required().messages({
    "array.base": "Sub categories must be a type of array",
    "array.min": "Sub categories is required and cannot be empty",
  }),
  company_reg_year: Joi.string()
    .length(4)
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      "string.base": "Company registration year must be a type of string",
      "string.empty": "Company registration year is required",
      "string.length": "Company registration year must be 4 digits",
      "string.pattern.base":
        "Company registration year must contain only digits",
    }),
});

const addServicesValidatorSChema = Joi.object({
  service_name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Service name must be a type of string",
    "string.empty": "Service name is required",
    "string.min": "Service name must be at least 3 characters",
    "string.max": "Service name must be less than 30 characters",
  }),
  service_type: Joi.string().required().messages({
    "string.base": "Service type must be a type of string",
    "string.empty": "Service type is required",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a type of string",
    "string.empty": "Description is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a type of number",
    "number.empty": "Price is required",
  }),
  price_per_head: Joi.number().messages({
    "number.base": "Price per head must be a type of number",
    "number.positive": "Price per head must be a positive number",
  }),
  images: Joi.array().min(1).required().messages({
    "array.base": "Images must be a type of array",
    "array.min": "Images is required and cannot be empty",
  }),
  cater_including: Joi.boolean().required().messages({
    "boolean.base": "Catering including must be a type of boolean",
    "boolean.empty": "Catering including is required",
  }),
});

const signupUserValidatorSChema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name must be a type of string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be less than 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a type of string",
    "string.empty": "Email is required",
    "string.email": "Email is not valid",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.base": "Password must be a type of string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be less than 20 characters",
  }),
  contact_number: Joi.string().length(10).required().messages({
    "string.base": "Contact number must be a type of string",
    "string.empty": "Contact number is required",
    "string.length": "Contact number must be 10 digits",
  }),
  address: Joi.string().min(2).max(50).messages({
    "string.base": "Address must be a type of string",
    "string.empty": "Address is required",
    "string.min": "Address must be at least 2 characters",
    "string.max": "Address must be less than 50 characters",
  }),
});

const loginValidatorSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a type of string",
    "string.empty": "Email is required",
    "string.email": "Email is not valid",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.base": "Password must be a type of string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be less than 20 characters",
  }),
});

const validateLogin = (req, res, next) => {
  const { error } = loginValidatorSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  next();
};
const validateVendorSignup = (req, res, next) => {
  const { error } = signupVendorValidatorSChema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  next();
};

const validateAddServices = (req, res, next) => {
  console.log("Parsed FormData:", req.body); // `req.body` now contains form fields
  const { error } = addServicesValidatorSChema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  next();
};

const validateUserSignup = (req, res, next) => {
  const { error } = signupUserValidatorSChema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = {
  validateVendorSignup,
  validateAddServices,
  validateUserSignup,
  validateLogin,
};
