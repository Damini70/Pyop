import React from "react";
import "./ExploreSection.css";

const ExploreSection = ({ alignment = "left" }) => {
  return (
    <div>
      {alignment == "left" ? (
        <div className="container mt-3">
          <div className="d-flex flex-column">
            <span className="fs-3">Bundle Picks</span>
            <div className="my-2">
              <div className="row g-4">
                <div className="col-7">
                  <div className="bg-danger bundle-card-banner rounded-4"></div>
                </div>
                <div className="col-5">
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="row g-1">
                        <div className="col-6">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                      </div>
                      <div className="mt-4 d-flex flex-column">
                        <span className="fs-4">Bundle Heading</span>
                        <span className="text-12px">
                          Bundle Description Lorem ipsum
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row g-1">
                        <div className="col-6">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                      </div>
                      <div className="mt-4 d-flex flex-column">
                        <span className="fs-4">Bundle Heading</span>
                        <span className="text-12px">
                          Bundle Description Lorem ipsum
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="d-flex flex-column">
            <span className="fs-3">Bundle Picks</span>
            <div className="my-2">
              <div className="row g-4">
                <div className="col-5">
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="row g-1">
                        <div className="col-6">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                      </div>
                      <div className="mt-4 d-flex flex-column">
                        <span className="fs-4">Bundle Heading</span>
                        <span className="text-12px">
                          Bundle Description Lorem ipsum
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row g-1">
                        <div className="col-6">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                        <div className="col-6 ">
                          <img
                            className="w-100"
                            src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                          ></img>
                        </div>
                      </div>
                      <div className="mt-4 d-flex flex-column">
                        <span className="fs-4">Bundle Heading</span>
                        <span className="text-12px">
                          Bundle Description Lorem ipsum
                        </span>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="col-7">
                  <div className="bg-danger bundle-card-banner rounded-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreSection;
