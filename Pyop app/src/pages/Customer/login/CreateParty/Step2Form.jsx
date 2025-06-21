import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../../services/generalFunctions";

export default function Step2Form({
  userData = {},
  updateUserData = () => {},
}) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function getLocations() {
      const res = await makeRequest("get", "vendor/vendor-locations");
      if (res.status) {
        const data = res.data.map((item) => item.service_locations);
        setLocations(data.flat());
      }
    }
    getLocations();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white">
      <div className="">
        <h4 className="text-xl font-bold text-gray-800 mb-1">
          Event Customization
        </h4>
        <p className="text-gray-600">
          Please provide these details for Customization:
        </p>
      </div>

      <div className="space-y-6">
        {/* Location Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => updateUserData("location", e.target.value)}
            value={userData.location}
          >
            <option value="" disabled>
              Select your location
            </option>
            {locations.map((location, index) => {
              return (
                <option key={index} value={location.value}>
                  {location.label}
                </option>
              );
            })}
          </select>
        </div>

        {/* Music Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Music
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => updateUserData("music", e.target.value)}
            value={userData.music}
          >
            <option value="" disabled>
              Select your music
            </option>
            <option value="dj">DJ</option>
            <option value="live_band">Live Band</option>
            <option value="solo_instrument">Solo Performance Instrument</option>
            <option value="dance_floor">Dance Floor</option>
            <option value="speakers">Speakers as per the requirement</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Decoration Selection */}
        <div>
          <label
            htmlFor="decoration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Choose Decoration Option:
          </label>
          <select
            id="decoration"
            name="decoration"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => updateUserData("decoration", e.target.value)}
            value={userData.decoration}
          >
            <option value="">Select an option</option>
            <option value="themed">Themed</option>
            <option value="lighting">Lighting</option>
            <option value="wall">Wall</option>
            <option value="ceiling">Ceiling</option>
            <option value="outdoor">Outdoor</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Invitation Type Selection */}
        <div>
          <label
            htmlFor="invitationType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Choose Invitation Type:
          </label>
          <select
            id="invitationType"
            name="invitationType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => updateUserData("invitationDesign", e.target.value)}
            value={userData.invitationDesign}
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            <option value="physical_card">Physical Card</option>
            <option value="digital_card">Digital Card</option>
            <option value="video">Video</option>
            <option value="text_message">Text Message</option>
            <option value="pitch_design">Pitch Design</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Catering Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Catering Method:
          </label>
          <select
            id="catering"
            name="deliveryMethod"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => updateUserData("catering", e.target.value)}
            value={userData.catering}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Checkboxes Section */}
        <div className="space-y-3">
          <h5 className=" font-medium text-gray-800">
            Additional Services
          </h5>

          {/* Video Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="video"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={(e) =>
                updateUserData("video", e.target.value == "on" ? true : false)
              }
            />
            <label
              htmlFor="video"
              className="text-sm font-medium text-gray-700"
            >
              Video
            </label>
          </div>

          {/* Photography Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="photography"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={(e) =>
                updateUserData(
                  "photography",
                  e.target.value == "on" ? true : false
                )
              }
            />
            <label
              htmlFor="photography"
              className="text-sm font-medium text-gray-700"
            >
              Photography
            </label>
          </div>

          {/* Gaming Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="gaming"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={(e) =>
                updateUserData("gaming", e.target.value == "on" ? true : false)
              }
            />
            <label
              htmlFor="gaming"
              className="text-sm font-medium text-gray-700"
            >
              Gaming
            </label>
          </div>

          {/* Transportation Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="transportation"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={(e) =>
                updateUserData(
                  "transportation",
                  e.target.value == "on" ? true : false
                )
              }
            />
            <label
              htmlFor="transportation"
              className="text-sm font-medium text-gray-700"
            >
              Transportation
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
