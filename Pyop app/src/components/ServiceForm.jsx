import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import toast from "react-hot-toast";
import { makeRequest } from "../services/generalFunctions";
import Button from "@mui/material/Button";
import { X } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// Zod schema for form validation
const serviceFormSchema = z.object({
  service_name: z.string().min(1, "Service name is required"),
  category: z.string().min(1, "Category is required"),
  venue_type: z.string().min(1, "Venue is required"),
  venue_name: z.string().min(1, "Venue Name is required"),
  venue_location: z.string().min(1, "Venue Location is required"),
  venue_map: z
    .object({
      lat: z.number(),
      lng: z.number(),
      place_id: z.string().optional(), // optional additional field
    })
    .optional(),
  no_of_guests: z.coerce
    .number()
    .min(1, "Number of guests is required and must be at least 1"),
  sub_category: z.string().min(1, "Sub-category is required"),
  service_type: z.string().min(1, "Service type is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  images: z.union([
    // For new file uploads (FileList)
    z
      .instanceof(FileList)
      .transform((files) => Array.from(files))
      .refine((files) => files.length > 0, "At least one image is required"),
    // For existing images in edit mode
    z
      .array(z.any())
      .refine((arr) => arr.length > 0, "At least one image is required"),
  ]),
  catering: z.object({
    is_catering: z.boolean().optional(),
    price_catering_including: z.coerce.number().nonnegative().optional(),
    minimum_qty: z.coerce.number().nonnegative().optional(),
  }),
});
const venueTypes = [
  "Event Spaces",
  "Restaurants and Bars",
  "Historic Venues",
  "Outdoor Venues",
  "Theaters and Auditoriums",
  "Sports Venues",
  "Community Centers",
  "Tents",
  "Farms",
  "Castles and Mansions",
  "Theme Parks",
];

export default function ServiceForm({
  userId,
  userCategories,
  userSubCategoryList,
  userServiceTypeList,
  openEditServiceListing,
  setOpenEditServiceListing,
  editListing,
  setEditListing,
  setLoading,
}) {
  const [previewImages, setPreviewImages] = useState([]);
  const [openImageDelete, setOpenImageDelete] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [imageId, setImageId] = useState("");

  const formatToLabelValue = (arr) =>
    arr.map((item) => ({
      label: item,
      value: item
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w_]/g, ""),
    }));
  const venueTypesFormatted = formatToLabelValue(venueTypes);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      service_name: "",
      category: "",
      sub_category: "",
      service_type: "",
      description: "",
      price: "",
      images: [],
      catering: {
        is_catering: false,
        price_catering_including: "",
        minimum_qty: "",
      },
    },
  });
  useEffect(() => {
    if (editListing) {
      console.log({ editListing }, "  ", editListing.images);
      reset({
        ...editListing,
        images: editListing.images.map((item) => item.data),
        catering: {
          is_catering: editListing.catering?.is_catering || false,
          price_catering_including:
            editListing.catering?.price_catering_including || "",
          minimum_qty: editListing.catering?.minimum_qty || "",
        },
      });
      setPreviewImages([...editListing.images]);
    }
  }, [editListing, reset]);

  const isCatering = watch("catering.is_catering");

  const mapOptions = (list, key) =>
    list.map((item) => ({ label: item[key], value: item[key] }));

  // Handle image selection and preview
  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Create preview URLs
      const newPreviewImages = [];
      Array.from(files).forEach((file, index) => {
        const previewUrl = URL.createObjectURL(file);
        newPreviewImages.push({
          id: Date.now(), // or use a unique identifier if available
          data: previewUrl,
        });
      });

      setPreviewImages((prev) => [...prev, ...newPreviewImages]);
    }
  };
  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const onSubmit = async (data) => {
    console.log({ data });

    const formData = new FormData();

    // Add all form fields except images
    Object.entries(data).forEach(([key, value]) => {
      if (key === "images") {
        // Skip images here, we'll add them separately
      } else if (key === "catering") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    // Add multiple images with the same field name
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });
    }

    formData.append("vendor_id", userId);
    console.log({ formData });
    if (openEditServiceListing) {
      setLoading(true);
      try {
        const editData = await makeRequest(
          "patch",
          `/vendor/update-vendor-listings/?serviceId=${editListing?._id}`,
          formData
        );
        if (editData.status) {
          toast.success("Service updated successfully");
          setOpenEditServiceListing(false);
          setEditListing(editData.data);
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const apiData = await makeRequest(
          "post",
          "/vendor/add-service",
          formData
        );

        if (apiData.status) {
          toast.success(apiData.message);
          reset();
          setPreviewImages([]);
        } else {
          toast.error(apiData.message);
        }
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
        console.error(error);
      }
    }
  };
  const handleOpenDelete = (id) => {
    if (previewImages.length > 1) {
      setImageId(id);
      setOpenImageDelete(true);
    } else {
      toast.error("At least one Image is required!");
    }
  };
  const handleImageDelete = async () => {
    setLoading(true);
    const isServerImage =
      editListing &&
      editListing.images &&
      editListing.images.some((item) => item.id === imageId);
    if (isServerImage) {
      try {
        const delRes = await makeRequest(
          "delete",
          `/vendor/delete-service-image/?serviceId=${editListing?._id}&imageId=${imageId}`
        );
        if (delRes.success) {
          toast.success("Images deleted successfully");
          console.log("del", delRes.data);
          setPreviewImages(delRes?.data?.images);
          setEditListing(delRes.data);
          setOpenImageDelete(false);
          setValue(
            "images",
            delRes.data.images.map((img) => img.data),
            { shouldValidate: true }
          );
        }
      } catch (error) {
      } finally {
        setOpenImageDelete(false);
        setLoading(false);
      }
    } else {
      const updatePrevImages = previewImages.filter(
        (item) => item.id !== imageId
      );
      setPreviewImages(updatePrevImages);
      setLoading(false);
      setOpenImageDelete(false);
    }
  };

  return (
    <>
      <Dialog open={openImageDelete} onClose={() => setOpenImageDelete(false)}>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button onClick={handleImageDelete}>OK</Button>
          <Button onClick={() => setOpenImageDelete(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div className="card shadow-sm border border-0 p-4">
        {openEditServiceListing ? (
          <h3>Edit Services</h3>
        ) : (
          <h3>Add Services</h3>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Service Name</label>
            <input
              {...register("service_name")}
              className="border p-1 w-full pyop-input"
            />
            {errors.service_name && (
              <p className="text-danger">{errors.service_name.message}</p>
            )}
          </div>
          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Venue Types</label>
            <Controller
              name="venue_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={venueTypesFormatted}
                  onChange={(selected) => field.onChange(selected.value)}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                />
              )}
            />

            {errors.venue_type && (
              <p className="text-danger">{errors.venue_type.message}</p>
            )}
          </div>
          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Venue Name</label>
            <input
              {...register("venue_name")}
              className="border p-1 w-full pyop-input"
            />
            {errors.venue_name && (
              <p className="text-danger">{errors.venue_name.message}</p>
            )}
          </div>
          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Venue Location</label>
            <input
              {...register("venue_location")}
              className="border p-1 w-full pyop-input"
            />
            {errors.venue_location && (
              <p className="text-danger">{errors.venue_location.message}</p>
            )}
          </div>
          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">No. Of Guests</label>
            <input
              type="number"
              {...register("no_of_guests")}
              className="border p-2 w-full"
            />
            {errors.no_of_guests && (
              <p className="text-danger">{errors.no_of_guests.message}</p>
            )}
          </div>

          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Category</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={mapOptions(userCategories, "categoryName")}
                  onChange={(selected) => field.onChange(selected.value)}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                />
              )}
            />
            {errors.category && (
              <p className="text-danger">{errors.category.message}</p>
            )}
          </div>

          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Sub-category</label>
            <Controller
              name="sub_category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={mapOptions(userSubCategoryList, "subCategoryName")}
                  onChange={(selected) => field.onChange(selected.value)}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                />
              )}
            />
            {errors.sub_category && (
              <p className="text-danger">{errors.sub_category.message}</p>
            )}
          </div>

          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Service Type</label>
            <Controller
              name="service_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={mapOptions(userServiceTypeList, "name")}
                  onChange={(selected) => field.onChange(selected.value)}
                  value={
                    field.value
                      ? { label: field.value, value: field.value }
                      : null
                  }
                />
              )}
            />
            {errors.service_type && (
              <p className="text-danger">{errors.service_type.message}</p>
            )}
          </div>

          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Description</label>
            <textarea
              {...register("description")}
              className="border p-2 w-full"
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>

          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Price</label>
            <input
              type="number"
              {...register("price")}
              className="border p-2 w-full"
            />
            {errors.price && (
              <p className="text-danger">{errors.price.message}</p>
            )}
          </div>

          <div className="mb-2 flex-column d-flex">
            <label className="pyop-input-label">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              onChange={handleImageChange}
              className="border p-2 w-full"
            />
            {errors.images && (
              <p className="text-danger">{errors.images.message}</p>
            )}

            {/* Image preview */}
            {previewImages.length > 0 && openEditServiceListing && (
              <div className="mt-2 d-flex flex-wrap">
                {previewImages.slice(0, 3).map((item, index) => (
                  <div key={index} className="me-2 mb-2 position-relative">
                    <img
                      src={item.data}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      className="border rounded"
                    />
                    <X
                      onClick={() => handleOpenDelete(item.id)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}

                {previewImages.length > 3 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAll(!showAll);
                    }}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    {showAll
                      ? "Show Less"
                      : `+${previewImages.length - 3} More`}
                  </button>
                )}

                {showAll &&
                  previewImages.slice(3).map((item, index) => (
                    <div
                      key={index + 3}
                      className="me-2 mb-2 position-relative"
                    >
                      <img
                        src={item.data}
                        alt={`Preview ${index + 4}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        className="border rounded"
                      />
                      <X onClick={() => handleOpenDelete(item.id)} />
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="mb-4 d-flex">
            <label className="pyop-input-label">Catering</label>
            <input
              type="checkbox"
              {...register("catering.is_catering")}
              className="ms-2"
            />
          </div>

          {isCatering && (
            <>
              <div className="mb-2 d-flex flex-column">
                <label className="pyop-input-label">
                  Price Including Catering
                </label>
                <input
                  type="number"
                  {...register("catering.price_catering_including")}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-2 d-flex flex-column">
                <label className="pyop-input-label">Minimum Qty</label>
                <input
                  type="number"
                  {...register("catering.minimum_qty")}
                  className="border p-2 w-full"
                />
              </div>
            </>
          )}

          {openEditServiceListing ? (
            <div className="flex justify-between">
              <button
                onClick={() => setOpenEditServiceListing(false)}
                className="pyop-button"
              >
                Cancel
              </button>
              <button type="submit" className="pyop-button">
                Submit
              </button>
            </div>
          ) : (
            <button type="submit" className="pyop-button">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
