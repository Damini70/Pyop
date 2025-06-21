import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../services/generalFunctions";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setFilterData } from "../../../redux/actions";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const events = [
  {
    id: 1,
    eventType: "Personal Events",
    items: [
      "Birthday",
      "Wedding",
      "Anniversary",
      "Baby shower",
      "Graduation party",
    ],
  },
  {
    id: 2,
    eventType: "Corporate Events",
    items: [
      "Conference",
      "Seminar",
      "Product launch",
      "Networking event",
      "Team-building activity",
    ],
  },
  {
    id: 3,
    eventType: "Social Events",
    items: [
      "Gala",
      "Charity event",
      "Fundraiser",
      "Social gathering (e.g., meetup, mixer)",
    ],
  },
  {
    id: 4,
    eventType: "Performing Arts Events",
    items: [
      "Concert",
      "Theater production",
      "Dance recital",
      "Comedy show",
      "Music festival",
    ],
  },
  {
    id: 5,
    eventType: "Sports Events",
    items: [
      "Professional sports game (e.g., football, basketball, baseball)",
      "Marathon",
      "Cycling event",
      "Golf tournament",
      "Sports tournament (e.g., soccer, volleyball)",
    ],
  },
  {
    id: 6,
    eventType: "Trade Shows and Exhibitions",
    items: [
      "Industry conference",
      "Product showcase",
      "Trade fair",
      "Expo",
      "Business-to-business (B2B) event",
    ],
  },
  {
    id: 7,
    eventType: "Educational Events",
    items: [
      "Workshop",
      "Training session",
      "Lecture",
      "Seminar",
      "Conference (academic or professional)",
    ],
  },
  {
    id: 8,
    eventType: "Community Events",
    items: [
      "Parade",
      "Festival (e.g., cultural, food, music)",
      "Fair (e.g., county, state)",
      "Community meeting",
      "Neighborhood event",
    ],
  },
  {
    id: 9,
    eventType: "Virtual Events",
    items: [
      "Webinar",
      "Online conference",
      "Virtual meetup",
      "Social media event",
      "Live streaming event",
    ],
  },
];

const guestControl = [
  "VIPs (Very Important Persons)",
  "Family and Friends",
  "Colleagues and Coworkers",
  "Clients and Customers",
  "Neighbors and Community Member",
  "Classmates and Alumni",
  "Social Media Connections",
  "Plus Ones (accompanied by a partner, spouse, or friend)",
  "Special Guests (mentor, coach, or role model)",
  "Out-of-Town Guests",
  "International Guests",
  "Media and Press",
  "Staff and Volunteers",
];
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

export default function CustomParty() {
  const [checkedParents, setCheckedParents] = useState({});
  const [checkedEvent, setcheckedEvent] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [openGuest, setOpenGuest] = useState(false);
  const [openVenue, setOpenVenue] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [music, setMusic] = useState("");
  const [selectVenue, setSelectVenue] = useState("");
  const [guest, setGuest] = [];
  const [openDecoration, setOpenDecoration] = useState(false);
  const [decoration, setDecoration] = useState("");
  const [location, setLocation] = useState("");
  const [openInvitation, setOpenInvitation] = useState(false);
  const [invitation, setInvitation] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeValue, setTimeValue] = useState(dayjs(new Date()));
  const [catering, setCatering] = useState(false);
  const [locations, setLocations] = useState([]);
  const [gaming, setGaming] = useState(false);
  const [video, setVideo] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [transport, setTransport] = useState(false);

  const updatedEvents = events.map((event) => ({
    ...event,
    items: event.items.map((item) => ({
      label: item,
      value: item.replace(/\s+/g, "_"),
    })),
  }));

  console.log(updatedEvents);
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

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const data = [...selectedValues, value];
      setSelectedValues((prev) => [...prev, value]);
      console.log({ data });
      setGuest(data);
    } else {
      // Remove value from array if unchecked
      setSelectedValues((prev) => prev.filter((item) => item !== value));
    }
  };

  const options = guestControl.map((item, index) => ({
    value: item.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    label: item,
  }));

  const toggleParent = (id) => {
    setCheckedParents((prev) => ({ [id]: !prev[id] }));
  };
  async function handleSubmit() {
    const payload = {
      event: checkedEvent,
      location: location,
      scheduledTime: dayjs(timeValue).format("MMMM D, YYYY h:mm A"),
      catering: catering,
      video: video,
      transportation: transport,
      venue: selectVenue,
      photography: photo,
      gaming: gaming,
    };
    if (openVenue) payload["venue"] = selectVenue;
    if (openMusic) payload["music"] = music;
    if (openDecoration) payload["decoration"] = decoration;
    try {
      const res = await makeRequest("post", "/custom-party", payload);
      if (res.status) {
        toast.success("Submitted");
        dispatch(
          setFilterData({
            location: location,
            eventType: checkedEvent,
            music: music,
            video: video,
            transportation: transport,
            venue: selectVenue,
            photography: photo,
            gaming: gaming,
            decoration: decoration,
          })
        );
        navigate("/customer/dashboard");
      } else {
        toast(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  // console.log({ updatedEvents });
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Event Type</h2>

      <ul className="space-y-4">
        {updatedEvents.map(({ id, eventType, items }) => (
          <li key={id}>
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={checkedParents[id] || false}
                onChange={() => toggleParent(id)}
              />
              {eventType}
            </label>
            {checkedParents[id] && (
              <ul className="ml-6 mt-2 space-y-2">
                {items.map((child, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      id={`${id}-${index}`}
                      className="h-4 w-4 text-blue-600"
                      checked={checkedEvent === child.value}
                      onChange={() =>
                        setcheckedEvent((prev) =>
                          prev === child.value ? null : child.value
                        )
                      }
                    />
                    <label htmlFor={`${id}-${index}`}>{child.label}</label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={openVenue}
            onChange={() => setOpenVenue(!openVenue)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Venue</span>
        </label>
        {openVenue && (
          <div className="space-y-1">
            <label className="block font-medium text-sm text-gray-700">
              Venue Details
            </label>
            <select
              className="w-full p-2 border rounded bg-gray-50"
              onChange={(e) => setSelectVenue(e.target.value)}
            >
              <option value="" disabled>
                Select your Venue
              </option>
              {venueTypes.map((venue) => (
                <option key={venue} value={venue}>
                  {venue}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={openMusic}
            onChange={() => setOpenMusic(!openMusic)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Add Music</span>
        </label>
        {openMusic && (
          <div className="space-y-1">
            <label className="block font-medium text-sm text-gray-700">
              Music
            </label>
            <select
              className="w-full p-2 border rounded bg-gray-50"
              onChange={(e) => setMusic(e.target.value)}
            >
              <option value="" disabled>
                Select your music
              </option>
              <option value="dj">DJ</option>
              <option value="live_band">Live Band</option>
              <option value="solo_instrument">
                Solo Performance Instrument
              </option>
              <option value="dance_floor">Dance Floor</option>
              <option value="speakers">Speakers as per the requirement</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={openDecoration}
            onChange={() => setOpenDecoration(!openDecoration)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Decoration</span>
        </label>
        {openDecoration && (
          <div className="space-y-1">
            <label className="block font-medium text-sm text-gray-700">
              Choose Decoration Option
            </label>
            <select
              className="w-full p-2 border rounded bg-gray-50"
              onChange={(e) => setDecoration(e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="themed">Themed</option>
              <option value="lighting">Lighting</option>
              <option value="wall">Wall</option>
              <option value="ceiling">Ceiling</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm text-gray-700">
          Location
        </label>
        <select
          className="w-full p-2 border rounded bg-gray-50"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        >
          <option value="" disabled>
            Select your location
          </option>
          {locations.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={catering}
          onChange={(e) => setCatering(!catering)}
          className="h-4 w-4 text-blue-600"
        />
        <label className="text-gray-700">Catering</label>
      </div>

      <div className="space-y-2">
        <label className="block font-medium text-sm text-gray-700">
          Scheduled Time
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Select Date & Time"
              value={timeValue}
              onChange={(newValue) => setTimeValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <p className="text-gray-500 text-sm">
          Scheduled for: {timeValue.format("MMMM D, YYYY h:mm A")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => setVideo(!video)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Video</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => setPhotography(!photo)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Photography</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => setGaming(!gaming)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Gaming</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => setTransport(!transport)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Transportation</span>
        </label>
      </div>

      <div className="pt-4">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
