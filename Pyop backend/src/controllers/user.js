const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { VendorService } = require("../models/vendor");
const {Vendor}=require("../models/vendor")

const handleUserSignup = async (req, res) => {
  const { name, email, password, contact_number, address } = req.body;

  // Validate input
  if (!name || !email || !password || !contact_number || !address) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: false });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { contact_number }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", status: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the user with the hashed password
    const result = await User.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      contact_number,
      address,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: result,
      status: true,
    });
  } catch (err) {
    console.error(err); // Use console.error for error logging
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", status: false });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: false });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: false });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // Token expiration time
      }
    );

    // Successful login
    return res.status(200).json({
      message: "Login successful",
      status: true,
      token, // Send the token back to the client
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact_number: user.contact_number,
        address: user.address,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};


const getAllVendorServices = async (req, res) => {
  const serviceArr = [
    "Decor",
    "Catering",
    "Photography",
    "Music",
    "Video",
    "Gaming",
    "Transportation",
    "Crowd Management",
    "Invitations",
  ];

  try {
    const {
      location,
      event,
      venue,
      no_of_guests,
      ...rest
    } = req.query;

    const filters = {};

    // Keep location filter as you requested
    if (location) {
      filters.service_locations = {
        $elemMatch: {
          label: { $regex: location, $options: "i" },
        },
      };
    }

    // Keep event filter as you requested
    if (event) {
      filters.sub_categories = {
        $elemMatch: {
          subCategoryName: { $regex: event, $options: "i" },
        },
      };
    }

    // Step 1: Find matching vendors
    const vendors = await Vendor.find(filters).select(
      "name company_name contact_number"
    );

    if (vendors.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No vendors found with the given criteria",
      });
    }

    const vendorIds = vendors.map((v) => v._id);

    // Step 2: Build service query
    const serviceQuery = {
      vendor_id: { $in: vendorIds },
    };

    // Add venue filter if present
    if (venue) {
      serviceQuery.venue_type = { $regex: venue, $options: "i" };
    }

    // Add guest count filter
    if (no_of_guests) {
      serviceQuery.no_of_guests = { $gte: parseInt(no_of_guests) };
    }

    // Dynamic filtering for service types based on query (e.g., Music, Catering)
    const dynamicServiceTypes = [];

    serviceArr.forEach((service) => {
      if (rest[service]) {
        dynamicServiceTypes.push(service);
        // Optionally, if you want to filter by sub-category or detail like rest[service] value
        // e.g., service_type = "Music", and description includes "dance_floor"
        // you can add that too here
      }
    });

    if (dynamicServiceTypes.length > 0) {
      serviceQuery.service_type = { $in: dynamicServiceTypes };
    }

    // Step 3: Find services
    const services = await VendorService.find(serviceQuery).populate(
      "vendor_id",
      "name company_name contact_number email profile_pic"
    );
;

    return res.status(200).json({
      status: true,
      services,
      // vendorDetails: vendors,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//Not tested ====================================================================
const getUserProfileById = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    return res.status(200).json({
      data: user,
      status: true, // Set the status to true
    });
  } catch (error) {
    return res.status(500).json({
      status: false, // Set the status to false
      message: error.message,
    });
  }
};
//Not tested ====================================================================

module.exports = {
  handleUserSignup,
  handleUserLogin,
  getAllVendorServices,
  getUserProfileById,
};
