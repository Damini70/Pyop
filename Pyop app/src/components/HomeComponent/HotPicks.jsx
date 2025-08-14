import React from "react";
import "./HotPicks.css";
import Container from "react-bootstrap/esm/Container";
import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";
import { useServices } from "../../hooks/useServices";
import Birthday from "../../Images/birthday.jpg";
import Wedding from "../../Images/wedding.png";
import Party from "../../Images/party.png";

const array = [
  {
    image:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    title: "Birthday Party",
  },
  {
    image:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    title: "Birthday Party",
  },
  {
    image:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    title: "Birthday Party",
  },
  {
    image:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    title: "Birthday Party",
  },
  {
    image:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    title: "Birthday Party",
  },
  {
    image:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg",
    title: "Birthday Party",
  },
];

const HotPicks = ({ banner }) => {
  // Use custom hook with React Query to fetch services
  const { data: allServices = [], isLoading, isError, error, refetch } = useServices(banner);

  return (
    <div className="">
      <div className="container">
        <div className="d-flex justify-content-center py-5">
          <Banner
            pic={
              banner === "birthday"
                ? Birthday
                : banner === "wedding"
                ? Wedding
                : Party
            }
          />
        </div>
        <div>
          {/* <Carousel data={array} /> */}
          {/* <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Featured Services</h3>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
           */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-lg">Loading services...</div>
            </div>
          )}
          
          {isError && (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">Error loading services: {error?.message}</div>
            </div>
          )}
          
          {!isLoading && !isError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
              {allServices?.slice(0, 3).map((service, index) => {
                return (
                  <div key={service._id || index} className="mb-5 ">
                    <div className="card shadow-2xl border-0 p-2 my-2">
                    <div>
                      <img className="w-100 rounded" src={array[0].image}></img>
                    </div>
                    <div className="mt-2 d-flex flex-column">
                      <span className="card-key">
                        <span className="font-bold">
                          {service.service_name}
                        </span>
                      </span>
                      <span className="card-key">
                        <span className="card-value">
                          {service.sub_category}
                        </span>
                      </span>
                      <span className="card-key">
                        {" "}
                        service type:{" "}
                        <span className="card-value">
                          {service.service_type}
                        </span>
                      </span>
                      {/* <span className="card-key">
                      {" "}
                      sub category:{" "}
                      <span className="card-value">{service.sub_category}</span>
                    </span> */}
                      <span className="card-key">
                        {" "}
                        price:{" "}
                        <span className="card-value">{service.price}</span>
                      </span>
                      {/* <span className="card-key">
                      description:{" "}
                      <span className="card-value">{service.description}</span>
                    </span> */}
                      <div className="flex justify-between">
                        <span>Contact </span>
                        {service.vendor_id.contact_number}
                      </div>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotPicks;
