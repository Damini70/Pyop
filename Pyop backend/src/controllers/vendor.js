const { Vendor, VendorService } = require("../models/vendor");
const bcrypt = require("bcrypt"); // Make sure to install bcrypt for hashing
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images", 10); // Handle up to 10 images
const upload1 = multer({ storage }).single("profile_pic");
const path = require('path');
const fs = require('fs');
const crypto=require("crypto");


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
    sub_categories,
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
    !company_reg_year ||
    !sub_categories
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
      sub_categories,
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
      { expiresIn: "24h" } // Token expiration time
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

// routes/vendor.js

const handleUpdateVendorPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const vendorId=req.query.vendorId;

  // Basic validation
  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "current password, and new password are required",
      status: false,
    });
  }

  try {
    // Fetch the vendor by ID
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found", status: false });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password", status: false });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    vendor.password = hashedPassword;
    await vendor.save();

    return res.status(200).json({
      message: "Password updated successfully",
      status: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", status: false });
  }
};

const handleGetVendorLocations= async(req,res)=>{
  try {
    const locations=await Vendor.find();
    res.status(200).json({
      status:true,
      message: "Locations fetched successfully",
      data:locations
    })
    if(!locations){
      res.status(400).json({
        status:false,
        message:"locations not found"
      })
    }
  } catch (error) {
    console.log(error)
  }
}

// const handlePostService = async (req, res) => {
//   try {
//     // Extract service data from request body
//     const {
//       service_name,
//       service_type,
//       category, // Add category
//       sub_category, // Add sub_category
//       description,
//       price,
//       images,
//       catering, // Expect catering as an object
//       vendor_id,
//     } = req.body;
//     console.log(req.body);
//     // Validate input
//     if (
//       !service_name ||
//       !service_type ||
//       !category || // Validate category
//       !sub_category || // Validate sub_category
//       !description ||
//       !price ||
//       !images ||
//       !catering || // Validate catering
//       !vendor_id
//     ) {
//       return res
//         .status(400)
//         .json({ message: "All fields are required", status: false });
//     }

//     // Validate the catering object (is_catering is required)
//     if (typeof catering.is_catering !== "boolean") {
//       return res.status(400).json({
//         message: "Catering information must include is_catering (boolean)",
//         status: false,
//       });
//     }

//     // Create a new service
//     const newService = new VendorService({
//       service_name,
//       service_type,
//       category, // Store category
//       sub_category, // Store sub_category
//       description,
//       price,
//       catering: {
//         is_catering: catering.is_catering,
//         price_catering_including:
//           catering.price_catering_including || undefined, // Optional
//         minimum_qty: catering.minimum_qty || undefined, // Optional
//       },
//       images,
//       vendor_id, // Ensure vendor_id is a valid ObjectId
//     });

//     // Save the service to the database
//     const savedService = await newService.save();

//     // Send response with the saved service
//     res.status(201).json({
//       message: "Service created successfully",
//       data: savedService,
//       status: true,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Error creating service",
//       error: error.message,
//     });
//   }
// };
const handlePostService = async (req, res) => {
  
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: false, message: "Upload error", error: err.message });
      }

      const {
        service_name,
        service_type,
        category,
        sub_category,
        description,
        no_of_guests,
        price,
        vendor_id,
        venue_type,
        venue_name,
        venue_location,
        venue_map, // Will be parsed if present
        catering,
      } = req.body;

      // Validate required fields
      if (
        !service_name ||
        !service_type ||
        !category ||
        !sub_category ||
        !description ||
        !no_of_guests ||
        !price ||
        !vendor_id ||
        !venue_type ||
        !venue_name ||
        !venue_location ||
        !catering
      ) {
        return res.status(400).json({
          message: "All required fields must be provided",
          status: false,
        });
      }

      // Validate vendor existence
      const vendorExists = await Vendor.findById(vendor_id);
      if (!vendorExists) {
        return res.status(404).json({
          message: "Vendor not found",
          status: false,
        });
      }

      // Parse catering info
      const parsedCatering = JSON.parse(catering);
      if (typeof parsedCatering.is_catering !== "boolean") {
        return res.status(400).json({
          message: "Catering must include is_catering as a boolean",
          status: false,
        });
      }

      // Optional: parse venue_map if sent
      let parsedVenueMap = undefined;
      if (venue_map) {
        try {
          parsedVenueMap = JSON.parse(venue_map); // Expecting JSON string from frontend
        } catch (e) {
          return res.status(400).json({
            message: "Invalid venue_map format",
            status: false,
          });
        }
      }

      // Process image files
      const imageData = req.files && req.files.length > 0 
        ? req.files.map(file => ({
            id: crypto.randomUUID(),
            data: `data:image/png;base64,${file.buffer.toString("base64")}`,
          }))
        : [];

      // Create new service document
      const newService = new VendorService({
        service_name,
        service_type,
        category,
        sub_category,
        description,
        price,
        no_of_guests,
        venue_type,
        venue_name,
        venue_location,
        venue_map: parsedVenueMap,
        catering: {
          is_catering: parsedCatering.is_catering,
          price_catering_including: parsedCatering.price_catering_including || undefined,
          minimum_qty: parsedCatering.minimum_qty || undefined,
        },
        images: imageData,
        vendor_id,
      });

      const savedService = await newService.save();

      res.status(201).json({
        message: "Service created successfully",
        data: savedService,
        status: true,
      });
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


const handleGetProfile = async (req, res) => {
  try {
    // Get vendorId from query parameters
    const vendorId = req.query.vendorId;
    console.log(vendorId);

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res
        .status(404)
        .json({ message: "Vendor not found", status: false });
    }

    res.status(200).json({
      message: "Vendor profile retrieved",
      data: vendor,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error retrieving vendor profile",
      error: error.message,
    });
  }
};
const handleGetProfilePic = async (req, res) => {
  try {
    // Get vendorId from query parameters
    const vendorId = req.query.vendorId;
    console.log(vendorId);

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res
        .status(404)
        .json({ message: "Vendor not found", status: false });
    }

    res.status(200).json({
      message: "Vendor profile retrieved",
      profile_pic: vendor.profile_pic,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error retrieving vendor profile",
      error: error.message,
    });
  }
};
const handleDeleteProfilePic=async(req,res)=>{


}

const handlePostProfilePic = async (req, res) => {
    upload1(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          message: "Upload error",
          error: err.message,
          status: false,
        });
      }
  
      try {
        const vendorId = req.query.vendorId;
        if (!vendorId) {
          return res.status(400).json({
            message: "Vendor ID is required",
            status: false,
          });
        }
  
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
          return res.status(404).json({
            message: "Vendor not found",
            status: false,
          });
        }
       
        const profile_picURL = req.file?req.file.buffer.toString("base64"):null;
          vendor.profile_pic = profile_picURL 
    ? `data:image/png;base64,${profile_picURL}` 
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWJR309C296hRO0kyhmBvOdn3IUNoQ0bJuls-bhARbnOgc8OKFcg&s=10&ec=72940544";

        await vendor.save();
     
  
        res.status(200).json({
          message: "Profile Pic Uploaded successfully",
          // profile_pic:vendor.profile_pic,
          status: true,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Error uploading profile pic",
          error: error.message,
          status: false,
        });
      }
    });
  };
  
const handleBirthdayBanner=async(req,res)=>{
   try {
    const birthdayServices = await VendorService.find({ sub_category: 'Birthday' }).populate('vendor_id');
    if(!birthdayServices){
      res.status(400).json({
        status:false,
        message:"Not found"
      })
    }
    res.status(200).json({
      status:true,
      message:"data fetched",
      birthdayServices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
} 
  




const handleGetVendorListingsbyId = async (req, res) => {
  try {
    const vendorId = req.query.vendorId;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res
        .status(404)
        .json({ message: "Vendor not found", status: false });
    }
    const services = await VendorService.find({ vendor_id: vendorId });
    res.status(200).json({
      message: "Vendor listings retrieved",
      data: services,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error retrieving vendor listings",
      error: error.message,
    });
  }
};

const handleEditVendorListingById = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: false, message: "Upload error", error: err.message });
      }

      const serviceId = req.query.serviceId;
      
      // Find the existing service
      const service = await VendorService.findById(serviceId);
      if (!service) {
        return res
          .status(404)
          .json({ message: "Service not found", status: false });
      }

      // Extract fields from request body
      const {
        service_name,
        service_type,
        category,
        sub_category,
        description,
        price,
        vendor_id,
        catering 
      } = req.body;
        // Validate input
    if (
      !service_name ||
      !service_type ||
      !category ||
      !sub_category ||
      !description ||
      !price ||
      !vendor_id ||
      !catering
    ) {
      return res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }
     let parsedCatering = catering;
      if (catering && typeof catering === 'string') {
        try {
          parsedCatering = JSON.parse(catering);
        } catch (parseError) {
          console.error("Error parsing catering JSON:", parseError);
          return res.status(400).json({
            status: false,
            message: "Invalid format for catering data. Expected a JSON object.",
            error: parseError.message,
          });
        }
      }
     const updateData = { ...req.body, catering: parsedCatering, };
      
      // Process uploaded images if present
      if (req.files && req.files.length > 0) {
        // Convert uploaded files to base64 strings
        const newImages =req.files.map(file => ({
        id: crypto.randomUUID(), // Generate a unique ID
        data: `data:image/png;base64,${file.buffer.toString("base64")}`
    }))
        // Get existing images (or empty array if none)
        const existingImages = service.images || [];
        
        // Combine existing and new images
        updateData.images = [...existingImages, ...newImages];
      }
    const updatedService = await VendorService.findByIdAndUpdate(
      serviceId,
      updateData,
      { new: true }
    );
      res.status(200).json({
      message: "Service updated successfully",
      data: updatedService,
      status: true,
    });
    });
  } catch (error) {
   console.error(error);
    res.status(500).json({
      status: false,
      message: "Error updating service",
      error: error.message,
    });
  }
};
const handleUpdateServicesQuantity=async(req,res)=>{
  const service_id=req.query.serviceId;
   try{ const service = await VendorService.findById(service_id);
      if (!service) {
        return res
          .status(404)
          .json({ message: "Service not found", status: false });
      }
         service.serviceQuantity = (service.serviceQuantity) + 1;

    // Save the updated service
    await service.save();

    res.status(200).json({
      message: "Service quantity updated successfully",
      status: true,
     data: service
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message
    });
  }



}

const handleDeleteServiceImage = async (req, res) => {
  try {
    const { serviceId, imageId } = req.query;
    
    if (!serviceId || !imageId) {
      return res.status(400).json({ 
        success: false, 
        message: "ServiceId and imageId are required" 
      });
    }

    // Find the service by ID
    const service = await VendorService.findById(serviceId);
    
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: "Service not found" 
      });
    }

    // Filter out the image with the matching ID
    const updatedImages = service.images.filter(image => image.id !== imageId);
    
    // If no images were removed, the imageId wasn't found
    if (updatedImages.length === service.images.length) {
      return res.status(404).json({ 
        success: false, 
        message: "Image not found in this service" 
      });
    }

    // Update the service with the new images array
    service.images = updatedImages;
    await service.save();

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: service
    });
  } catch (error) {
    console.error("Error deleting service image:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message
    });
  }
};

const handleDeleteVendorListingById= async(req,res)=>{
  try {
    const service_id=req.query.serviceId;
    const service= await VendorService.findById(service_id);
       if (!service) {
      return res
        .status(404)
        .json({ message: "Vendor Service not found", status: false });
    }
     await VendorService.findByIdAndDelete(service_id);

    // Respond with success
    res.status(200).json({
      message: "Vendor Service deleted successfully",
      status: true,
    });

    
  } catch (error) {
     console.error("Error deleting vendor:", error);
  }
}

const handleUpdateVendorProfileById = async (req, res) => {
  try {
    const vendorId = req.query.vendorId;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res
        .status(404)
        .json({ message: "Vendor not found", status: false });
    }
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
    // Validate input
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
      return res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }
    const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Vendor profile updated successfully",
      data: updatedVendor,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error updating vendor profile",
      error: error.message,
    });
  }
};

const handleGetVendorCategories = async (req, res) => {
  try {
    const vendorId = req.query.vendorId;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res
        .status(404)
        .json({ message: "Vendor not found", status: false });
    }

    return res.status(200).json({
      message: "Vendor categories retrieved",
      data: {
        service_locations: vendor.service_locations,
        service_type: vendor.service_type,
        categories: vendor.categories,
        sub_categories: vendor.sub_categories,
      },
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Error retrieving vendor profile",
      error: error.message,
    });
  }
};

module.exports = {
  handleSingupVendor,
  handleLoginVendor,
  handlePostService,
  handleGetProfile,
  handleGetProfilePic,
  handlePostProfilePic,
  handleDeleteProfilePic,
  handleGetVendorListingsbyId,
  handleEditVendorListingById,
  handleGetVendorLocations,
  handleDeleteVendorListingById,
  handleUpdateVendorProfileById,
  handleDeleteServiceImage,
  handleGetVendorCategories,
  handleUpdateVendorPassword,
  handleUpdateServicesQuantity,
  handleBirthdayBanner
};
