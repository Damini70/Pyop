const { required } = require("joi");
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
      unique: true,
    },
    contact_number: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    service_locations: {
      type: Array,
      required: true,
    },
    gst_number: {
      type: String,
      required: true,
      unique: true,
    },
    service_type: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    company_reg_year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const serviceSchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    service_type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    catering: {
      type: {
        is_catering: {
          type: Boolean,
          required: true,
        },
        price_catering_including: {
          type: Number,
          // required: true,
        },
        minimum_qty: {
          type: Number,
          // required: true,
        },
      },
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("vendor", vendorSchema);
const VendorService = mongoose.model("vendorService", serviceSchema);

module.exports = { Vendor, VendorService };
