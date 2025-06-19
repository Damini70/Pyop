import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import sampleImg from "../../../../Images/pyop1.jpg";

const Kart = () => {
  const kartItem = useSelector((state) => state.global.kartItem);
  console.log({kartItem})
  
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <DashboardHeader title={"Kart"} />
        <div className="mt-2 row g-2 ms-3">
          {kartItem.map((service, index) => {
            return (
              <div className="col-3 ">
                <div className="d-flex shadow-sm p-2 my-2">
                  <div>
                    <img className="w-100 rounded" src={service.images[0]?.data}></img>
                  </div>
                  <div className="mt-2">
                    <span className="card-key">
                      <span className="font-bold">{service.service_name}</span>
                    </span>
                    <span className="card-key">
                      <span className="">{service.category}</span>
                    </span>
                    <span className="card-key">
                      <span className="card-value">{service.service_type}</span>
                    </span>
                    {/* <span className="card-key">
                      {" "}
                      sub category:{" "}
                      <span className="card-value">{service.sub_category}</span>
                    </span> */}
                    <span className="card-key">
                      {" "}
                      Quantity: <span className="card-value">{service.serviceQuantity}</span>
                    </span>
                     <span className="card-key">
                      {" "}
                      price: <span className="card-value">{service.price*service.serviceQuantity}</span>
                    </span>
                    {/* <span className="card-key">
                      description:{" "}
                      <span className="card-value">{service.description}</span>
                    </span> */}
                    <button
                      className="btn btn-primary"
                      //   onClick={(e) => handleAddToCart(service)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Kart;
