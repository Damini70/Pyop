import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import toast from "react-hot-toast";
import { makeRequest } from "../services/generalFunctions";
import Button from "@mui/material/Button";
import { X, Loader2 } from "lucide-react";
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
  loading,
  setLoading,
  setListings,
  setOpenService,
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
      setLoading(true);
      try {
        const apiData = await makeRequest(
          "post",
          "/vendor/add-service",
          formData
        );

        if (apiData.status) {
          toast.success(apiData.message);
          const serviceData = await makeRequest(
                 "get",
                 `vendor/vendor-listings?vendorId=${userId}`
               );
          if(serviceData.message){
          setListings(serviceData.data);
          }     
          if (setOpenService) setOpenService(false);
          reset();
          setPreviewImages([]);
        } else {
          toast.error(apiData.message);
        }
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
        console.error(error);
      } finally {
        setLoading(false);
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
              <div className="flex items-center gap-3 text-blue-900">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg font-medium">
                  {openEditServiceListing ? 'Updating service...' : 'Creating service...'}
                </span>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Service Name</label>
            <input
              {...register("service_name")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter service name"
            />
            {errors.service_name && (
              <p className="text-red-500 text-sm mt-1">{errors.service_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Venue Types</label>
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
                  placeholder="Select venue type"
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: '8px',
                      borderRadius: '8px',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#3b82f6' },
                      '&:focus-within': { borderColor: '#3b82f6', boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)' }
                    })
                  }}
                />
              )}
            />
            {errors.venue_type && (
              <p className="text-red-500 text-sm mt-1">{errors.venue_type.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Venue Name</label>
            <input
              {...register("venue_name")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter venue name"
            />
            {errors.venue_name && (
              <p className="text-red-500 text-sm mt-1">{errors.venue_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Venue Location</label>
            <input
              {...register("venue_location")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter venue location"
            />
            {errors.venue_location && (
              <p className="text-red-500 text-sm mt-1">{errors.venue_location.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Number of Guests</label>
            <input
              type="number"
              {...register("no_of_guests")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter number of guests"
              min="1"
            />
            {errors.no_of_guests && (
              <p className="text-red-500 text-sm mt-1">{errors.no_of_guests.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Category</label>
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
                  placeholder="Select category"
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: '8px',
                      borderRadius: '8px',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#3b82f6' },
                      '&:focus-within': { borderColor: '#3b82f6', boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)' }
                    })
                  }}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Sub-category</label>
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
                  placeholder="Select sub-category"
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: '8px',
                      borderRadius: '8px',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#3b82f6' },
                      '&:focus-within': { borderColor: '#3b82f6', boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)' }
                    })
                  }}
                />
              )}
            />
            {errors.sub_category && (
              <p className="text-red-500 text-sm mt-1">{errors.sub_category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Service Type</label>
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
                  placeholder="Select service type"
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: '8px',
                      borderRadius: '8px',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#3b82f6' },
                      '&:focus-within': { borderColor: '#3b82f6', boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)' }
                    })
                  }}
                />
              )}
            />
            {errors.service_type && (
              <p className="text-red-500 text-sm mt-1">{errors.service_type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              placeholder="Enter service description"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Price</label>
            <input
              type="number"
              {...register("price")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
            )}

            {/* Image preview */}
            {previewImages.length > 0 && openEditServiceListing && (
              <div className="mt-4">
                <div className="grid grid-cols-3 gap-4">
                  {previewImages.slice(0, showAll ? previewImages.length : 3).map((item, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={item.data}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-300 shadow-sm"
                      />
                      <button
                        onClick={() => handleOpenDelete(item.id)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {previewImages.length > 3 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAll(!showAll);
                    }}
                    className="mt-3 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    type="button"
                  >
                    {showAll
                      ? "Show Less"
                      : `+${previewImages.length - 3} More`}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("catering.is_catering")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                id="catering-checkbox"
              />
              <label htmlFor="catering-checkbox" className="text-sm font-semibold text-gray-700">
                Include Catering Services
              </label>
            </div>
          </div>

          {isCatering && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Price Including Catering
                </label>
                <input
                  type="number"
                  {...register("catering.price_catering_including")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter catering price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Minimum Quantity</label>
                <input
                  type="number"
                  {...register("catering.minimum_qty")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter minimum quantity"
                  min="1"
                />
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            {openEditServiceListing ? (
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setOpenEditServiceListing(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors transform hover:scale-105 duration-200 flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Updating...' : 'Update Service'}
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors transform hover:scale-105 duration-200 flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Creating...' : 'Create Service'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
