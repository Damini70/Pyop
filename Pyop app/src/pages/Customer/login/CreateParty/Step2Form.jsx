import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../../services/generalFunctions";

export default function Step2Form({ userData, updateUserData }) {
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
    <div className="prose prose-invert">
      <p>Please provide these details for Customization:</p>

      <div>
        {" "}
        <label className="block font-medium mb-1">Location</label>
        <select
          onChange={(e) => updateUserData("location", e.target.value)}
          value={userData.location}
        >
          <option value="" disabled>
            Select your location
          </option>
          {locations.map((location) => {
            return <option value={location.value}>{location.label}</option>;
          })}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Music</label>
        <select
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
      <div>
        <label for="decoration">Choose Decoration Option:</label>
        <select
          id="decoration"
          name="decoration"
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

      <div>
        {" "}
        <label for="invitationType">Choose Invitation Type:</label>
        <select
          id="invitationType"
          name="invitationType"
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
      <div>
        <label>Choose Catering Method:</label>
        <select
          id="catering"
          name="deliveryMethod"
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
      <div className="mt-2">
        <label>Video</label>
        <input
          type="checkbox"
          onChange={(e) =>
            updateUserData("video", e.target.value == "on" ? true : false)
          }
        />
      </div>
      <div className="mt-2">
        <label>Photography</label>
        <input
          type="checkbox"
          onChange={(e) =>
            updateUserData("photography", e.target.value == "on" ? true : false)
          }
        />
      </div>
      <div className="mt-2">
        <label>Gaming</label>
        <input
          type="checkbox"
          onChange={(e) =>
            updateUserData("gaming", e.target.value == "on" ? true : false)
          }
        />
      </div>
      <div className="mt-2">
        <label>Transportation</label>
        <input
          type="checkbox"
          onChange={(e) =>
            updateUserData(
              "transportation",
              e.target.value == "on" ? true : false
            )
          }
        />
      </div>
    </div>
  );
}
