import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../services/generalFunctions";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const events = [
  {
    id: 1,
    eventType: "Personal Events",
    "Personal Events": [
      "Birthdays",
      "Weddings",
      "Anniversaries",
      "Baby showers",
      "Graduation parties",
    ],
  },
  {
    id: 2,
    eventType: "Corporate Events",
    "Corporate Events": [
      "Conferences",
      "Seminar",
      "Product launches",
      "Networking events",
      "Team-building activities",
    ],
  },
  {
    id: 3,
    eventType: "Social Events",
    "Social Events": [
      "Galas",
      "Charity events",
      "Fundraisers",
      "Social gatherings (e.g., meetups, mixers)",
    ],
  },
  {
    id: 4,
    eventType: "Performing Arts Events",
    "Performing Arts Events": [
      "Concerts",
      "Theater productions",
      "Dance recitals",
      "Comedy shows",
      "Music festivals",
    ],
  },
  {
    id: 5,
    eventType: "Sports Events",
    "Sports Events": [
      "Professional sports games (e.g., football, basketball, baseball)",
      "Marathons",
      "Cycling events",
      "Golf tournaments",
      "Sports tournaments (e.g., soccer, volleyball)",
    ],
  },
  {
    id: 6,
    eventType: "Trade Shows and Exhibitions",
    "Trade Shows and Exhibitions": [
      "Industry conferences",
      "Product showcases",
      "Trade fairs",
      "Expos",
      "Business-to-business (B2B) events",
    ],
  },
  {
    id: 7,
    eventType: "Educational Events",
    "Educational Events": [
      "Workshops",
      "Training sessions",
      "Lectures",
      "Seminars",
      "Conferences (academic or professional)",
    ],
  },
  {
    id: 8,
    eventType: "Community Events",
    "Community Events": [
      "Parades",
      "Festivals (e.g., cultural, food, music)",
      "Fairs (e.g., county, state)",
      "Community meetings",
      "Neighborhood events",
    ],
  },
  {
    id: 9,
    eventType: "Virtual Events",
    "Virtual Events": [
      "Webinars",
      "Online conferences",
      "Virtual meetups",
      "Social media events",
      "Live streaming events",
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

const PyopParty = () => {
  const [errors, setErrors] = useState({
    eventName: "",
    guestControl: "",
  });
  const email = JSON.parse(localStorage.getItem("customer")).email;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [guest, setGuest] = useState([]);
  const [catering, setCatering] = useState(false);
  const [music, setMusic] = useState(false);

  const updatedEvents = events.map((event) => {
    const eventTypeKey = event.eventType;

    return {
      ...event,
      [eventTypeKey]: event[eventTypeKey].map((name) => ({
        label: name,
        value: name
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^\w_]/g, ""),
      })),
    };
  });

  const validate = () => {
    let isValid = true;
    let newErrors = {
      eventName: "",
      guestControl: "",
    };

    if (!eventName) {
      newErrors.eventName = "Specific event name is required";
      isValid = false;
    }

    if (selectedValues.length === 0) {
      newErrors.guest = "Please select at least one guest category";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    if (text) {
      setLoading(false);
    }
  }, [text]);

  useEffect(() => {
    async function getContact() {
      try {
        const res = await makeRequest("get", "/pyop-party");
        if (res.status) {
          const item = res.data.find((item) => item.email == email);
          // console.log(item)
          if (item)
            setText(
              "Thank you for the details. Our member will contact you soon!"
            );
          else {
            setLoading(false);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getContact();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        event:eventName,
        guestControl:guest,
        email: email,
        music: music,
        catering: catering,
      };
      console.log({ payload });
      try {
        const res = await makeRequest("post", "/pyop-party", payload);
        if (res.status) {
          toast("Details Submitted!");
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const options = guestControl.map((item, index) => ({
    value: item.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    label: item,
  }));
  const selectedEvent = updatedEvents.find(
    (item) => item.eventType === eventType
  );

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

  return (
    <>
      {loading && <CircularProgress />}
      {text ? (
        <h2>{text}</h2>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto p-4 shadow-md rounded-md space-y-4"
        >
          <h2 className="text-xl font-semibold">Fill your requirements</h2>

          <div>
            <select
              placeholder="Select Your Event"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option vaue="">Select your Event</option>
              {updatedEvents.map((event) => {
                return (
                  <option value={event.eventType}>{event.eventType}</option>
                );
              })}
            </select>
          </div>
          {eventType && (
            <div>
              <select
                placeholder="Select Your Specific Event"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              >
                <option value="" disabled>
                  Select your Event Name
                </option>
                {selectedEvent[eventType].map((item) => {
                  return <option value={item.value}>{item.label}</option>;
                })}
              </select>
            </div>
          )}

          <div className="mb-4">
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
          </div>

          <div>
            <label className="block font-medium mb-1">Music</label>
            <select onChange={(e) => setMusic(e.target.value)} value={music}>
              <option value="" disabled>
                Select your music
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label>Catering</label>
            <select
              id="catering"
              name="deliveryMethod"
              onChange={(e) => setCatering(e.target.value)}
              value={catering}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default PyopParty;
