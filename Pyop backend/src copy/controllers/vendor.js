const { Vendor, VendorService } = require("../models/vendor");
const bcrypt = require("bcrypt"); // Make sure to install bcrypt for hashing
const jwt = require("jsonwebtoken");

const handleSingupVendor = async (req, res) => {
  const {
    name,
    company_name,
    contact_number,
    email,
    password,
    service_locations,
    gst_number,
    service_type,
    categories,
    company_reg_year,
  } = req.body;

  if (
    !name ||
    !company_name ||
    !contact_number ||
    !email ||
    !password ||
    !service_locations ||
    !gst_number ||
    !service_type ||
    !categories ||
    !company_reg_year
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: false });
  }

  try {
    const existingUser = await Vendor.findOne({
      $or: [{ email }, { contact_number }, { gst_number }, { company_name }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Vendor already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const result = await Vendor.create({
      name,
      company_name,
      contact_number,
      email,
      password: hashedPassword, // Store the hashed password
      service_locations,
      gst_number,
      service_type,
      categories,
      company_reg_year,
    });

    return res.status(201).json({
      message: "Vendor created successfully",
      data: result,
      status: true,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const handleLoginVendor = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", status: false });
  }

  try {
    // Find the vendor by email
    const vendor = await Vendor.findOne({ email });

    // Check if vendor exists
    if (!vendor) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: false });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: vendor._id, email: vendor.email }, // Payload
      process.env.JWT_SECRET, // Replace with your secret
      { expiresIn: "1h" } // Token expiration time
    );

    // Successful login
    return res.status(200).json({
      message: "Login successful",
      status: true,
      token, // Include the token in the response
      data: {
        id: vendor._id,
        name: vendor.name,
        company_name: vendor.company_name,
        email: vendor.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const handlePostService = async (req, res) => {
  try {
    // Extract service data from request body
    const {
      service_name,
      service_type,
      category, // Add category
      sub_category, // Add sub_category
      description,
      price,
      images,
      catering, // Expect catering as an object
      vendor_id,
    } = req.body;

    // Validate input
    if (
      !service_name ||
      !service_type ||
      !category || // Validate category
      !sub_category || // Validate sub_category
      !description ||
      !price ||
      !images ||
      !catering || // Validate catering
      !vendor_id
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: false });
    }

    // Validate the catering object (is_catering is required)
    if (typeof catering.is_catering !== "boolean") {
      return res.status(400).json({
        message: "Catering information must include is_catering (boolean)",
        status: false,
      });
    }

    // Create a new service
    const newService = new VendorService({
      service_name,
      service_type,
      category, // Store category
      sub_category, // Store sub_category
      description,
      price,
      catering: {
        is_catering: catering.is_catering,
        price_catering_including:
          catering.price_catering_including || undefined, // Optional
        minimum_qty: catering.minimum_qty || undefined, // Optional
      },
      images,
      vendor_id, // Ensure vendor_id is a valid ObjectId
    });

    // Save the service to the database
    const savedService = await newService.save();

    // Send response with the saved service
    res.status(201).json({
      message: "Service created successfully",
      data: savedService,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error creating service",
      error: error.message,
    });
  }
};

module.exports = { handleSingupVendor, handleLoginVendor, handlePostService };
