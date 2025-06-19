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
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    sub_categories: {
      type: Array,
      required: true,
    },
    company_reg_year: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: false,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWJR309C296hRO0kyhmBvOdn3IUNoQ0bJuls-bhARbnOgc8OKFcg&s=10&ec=72940544"
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
    no_of_guests: {
      type: Number,
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
        },
        minimum_qty: {
          type: Number,
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
    serviceQuantity: {
      type: Number,
      default: 0,
    }, 
    venue_type: {
      type: String,
     required: true,
    },
    venue_name: {
      type: String,
      required: true,
    },
    venue_location: {
      type: String,
      required: true,
    },

    venue_map: {
      type: {
        lat: {
          type: Number,
          required: false,
        },
        lng: {
          type: Number,
          required: false,
        },
        place_id: {
          type: String,
          required: false,
        },
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


const Vendor = mongoose.model("vendor", vendorSchema);
const VendorService = mongoose.model("vendorService", serviceSchema);

module.exports = { Vendor, VendorService };
