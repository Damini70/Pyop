import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import toast from "react-hot-toast";

const events = [
  {
    id: 1,
    eventType: "Personal Events",
    "Personal Events": [
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
    "Corporate Events": [
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
    "Social Events": [
      "Gala",
      "Charity event",
      "Fundraiser",
      "Social gathering (e.g., meetup, mixer)",
    ],
  },
  {
    id: 4,
    eventType: "Performing Arts Events",
    "Performing Arts Events": [
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
    "Sports Events": [
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
    "Trade Shows and Exhibitions": [
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
    "Educational Events": [
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
    "Community Events": [
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
    "Virtual Events": [
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

export default function Step1Form({ userData, updateUserData }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [timeValue, setTimeValue] = useState(dayjs(new Date()));
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
  const formatToLabelValue = (arr) =>
    arr.map((item) => ({
      label: item,
      value: item
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w_]/g, ""),
    }));

  const venueTypesFormatted = formatToLabelValue(venueTypes);
  const selectedEvent = updatedEvents.find(
    (item) => item.eventType === userData.eventType
  );

  const options = guestControl.map((item, index) => ({
    value: item.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    label: item,
  }));

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const data = [...selectedValues, value];
      setSelectedValues((prev) => [...prev, value]);
      console.log({ data });
      updateUserData("guests_control", data);
    } else {
      // Remove value from array if unchecked
      setSelectedValues((prev) => prev.filter((item) => item !== value));
    }
  };

  console.log({ timeValue }, { userData });
  return (
    <div className="prose prose-invert">
      {/* <h2>Personal Info</h2> */}
      <p>Please enter the following details:</p>

      <div>
        <select
          placeholder="Select Your Event"
          value={userData.eventType}
          onChange={(e) => updateUserData("eventType", e.target.value)}
        >
          <option vaue="">Select your Event</option>
          {updatedEvents.map((event) => {
            return <option value={event.eventType}>{event.eventType}</option>;
          })}
        </select>
      </div>
      {userData?.eventType && (
        <div>
          <select
            placeholder="Select Your Specific Event"
            value={userData.eventName}
            onChange={(e) => updateUserData("eventName", e.target.value)}
          >
            <option value="" disabled>
              Select your Event Name
            </option>
            {selectedEvent[userData.eventType].map((item) => {
              return <option value={item.value}>{item.label}</option>;
            })}
          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="mr-2">No of Guests</label>
        <input
          type="number"
          min="1"
          onChange={(e) => {
            const value = e.target.value;
            // Allow only digits and ensure number > 0
            if (/^[1-9][0-9]*$/.test(value)) {
              updateUserData("no_of_guests", value);
            }
            if (value < 0) {
              toast.error("Enter valid number");
            }
          }}
          placeholder="Enter number of guests"
        />
      </div>

      {/* <div className="mb-4">
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
      </div> */}
      <div>
        {" "}
        <label className="block font-medium mb-1">Venue Details</label>
        <select
          placeholder="Select your Venue"
          onChange={(e) => updateUserData("venue", e.target.value)}
        >
          <option vaue="">Select your Venue</option>
          {venueTypesFormatted.map((venue) => {
            return <option value={venue.value}>{venue.label}</option>;
          })}
        </select>
      </div>
      <div>
        {" "}
        <label className="block font-medium mb-1">Scheduled Time</label>
        {/* <input
          type="text"
          placeholder="Scheduled Time"
          value={userData.scheduledTime}
          onChange={(e) => updateUserData("scheduledTime", e.target.value)}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="Controlled picker"
              value={timeValue}
              onChange={(newValue) => {
                setTimeValue(newValue);
                updateUserData(
                  "scheduledTime",
                  dayjs(newValue).format("MMMM D, YYYY h:mm A")
                );
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <p>Scheduled for: {timeValue.format("MMMM D, YYYY h:mm A")}</p>
      </div>
    </div>
  );
}
