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
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Event Type</h2>
      <ul className="space-y-3">
        {updatedEvents.map(({ id, eventType, items }) => (
          <li key={id}>
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={checkedParents[id] || false}
                onChange={() => toggleParent(id)}
              />
              {eventType}
            </label>

            {checkedParents[id] && (
              <ul className="ml-6 mt-2 space-y-1">
                {items.map((child, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`${id}-${index}`}
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
      {/* <div><input type="checkbox" checked={openGuest} onChange={()=>setOpenGuest(!openGuest)}/><lebel>Guest Control</lebel></div>
   {openGuest&&    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select guest categories:
        </label>

        <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto bg-gray-50">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-100 px-2 rounded"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={handleSelectChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>} */}
      <div>
        {" "}
        <input
          type="checkbox"
          checked={openVenue}
          onChange={() => setOpenVenue(!openVenue)}
        />
        <label>Venue</label>
      </div>
      {openVenue && (
        <div>
          {" "}
          <label className="block font-medium mb-1">Venue Details</label>
          <select
            placeholder="Select your Venue"
            onChange={(e) => setSelectVenue(e.target.value)}
          >
            <option vaue="" disabled>
              Select your Venue
            </option>
            {venueTypes.map((venue) => {
              return <option value={venue}>{venue}</option>;
            })}
          </select>
        </div>
      )}
      <div>
        <input
          type="checkbox"
          checked={openMusic}
          onChange={() => setOpenMusic(!openMusic)}
        />
        <lebel>Add Music</lebel>
      </div>
      {openMusic && (
        <div>
          <label className="block font-medium mb-1">Music</label>
          <select onChange={(e) => setMusic(e.target.value)}>
            <option value="" disabled>
              Select your music
            </option>
            <option value="dj">DJ</option>
            <option value="live_band">Live Band</option>
            <option value="solo_instrument">Solo Performance Instrument</option>
            <option value="dance_floor">Dance Floor</option>
            <option value="speakers">Speakers as per the requirement</option>
          </select>
        </div>
      )}
      <div>
        <input
          type="checkbox"
          checked={openDecoration}
          onChange={() => setOpenDecoration(!openDecoration)}
        />
        <lebel>Decoration</lebel>
      </div>
      {openDecoration && (
        <div>
          <label for="decoration">Choose Decoration Option:</label>
          <select
            id="decoration"
            name="decoration"
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
      {/* <div><input type="checkbox" checked={openInvitation} onChange={()=>setOpenInvitation(!openInvitation)}/><label>Invitation Design</label></div>
      {openInvitation&&<div> <label for="invitationType">Choose Invitation Type:</label>
      <select
        id="invitationType"
        name="invitationType"
        onChange={(e) => setInvitation(e.target.value)}
      >
        <option value="">-- Select an option --</option>
        <option value="physical_card">Physical Card</option>
        <option value="digital_card">Digital Card</option>
        <option value="video">Video</option>
        <option value="text_message">Text Message</option>
        <option value="pitch_design">Pitch Design</option>
      </select></div>} */}
      <div>
        {" "}
        <label className="block font-medium mb-1">Location</label>
        <select onChange={(e) => setLocation(e.target.value)} value={location}>
          <option value="" disabled>
            Select your location
          </option>
          {locations.map((location) => {
            return <option value={location.value}>{location.label}</option>;
          })}
        </select>
      </div>
      <div>
        <input
          type="checkbox"
          checked={catering}
          onChange={(e) => setCatering(!catering)}
        />
        <label>Catering</label>
      </div>
      <div>
        {" "}
        <label className="block font-medium mb-1">Scheduled Time</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="Controlled picker"
              value={timeValue}
              onChange={(newValue) => {
                setTimeValue(newValue);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <p>Scheduled for: {timeValue.format("MMMM D, YYYY h:mm A")}</p>
      </div>
      <div className="mt-2">
        <label>Video</label>
        <input type="checkbox" onChange={(e) => setVideo(!video)} />
      </div>
      <div className="mt-2">
        <label>Photography</label>
        <input type="checkbox" onChange={(e) => setPhotography(!photography)} />
      </div>
      <div className="mt-2">
        <label>Gaming</label>
        <input type="checkbox" onChange={(e) => setGaming(!gaming)} />
      </div>
      <div className="mt-2">
        <label>Transportation</label>
        <input type="checkbox" onChange={(e) => setTransport(!transport)} />
      </div>
      
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
