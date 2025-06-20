import React, { useState, useRef, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import pyopimg1 from "../../../Images/pyop1.jpg";
import pyopimg2 from "../../../Images/pyop2.jpg";
import pyopimg3 from "../../../Images/pyop3.jpg";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
// import "./styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Login from "./Login";
import VendorSignup from "./VendorSignup";

const imgArr = [pyopimg1, pyopimg2, pyopimg3];
const EntryVendor = () => {
  const [activeTab, setActiveTab] = useState("login"); // Default to 'login' tab
  const [key, setKey] = useState("first");

//    useEffect(()=>{
//   localStorage.clear()

//  },[])


  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid vendor-entry">
      <div className="card vendor-entry-card">
        <div className="row g-0 h-100">
          <div className="col-12 col-md-5 h-100 d-flex justify-content-center align-items-center">
            <div className="p-5 h-100">
              <div className="vendor-singup-wrapper flex ">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey={key}
                  activeKey={key}
                  className=""
                  onSelect={(k) => setKey(k)}
                >
                  <Row className="h-100">
                    <Nav
                      variant="pills"
                      className="flex-row justify-content-center"
                    >
                      <Nav.Item>
                        <div
                          className={`py-2 ${
                            key === "first" ? "selected" : ""
                          } `}
                        >
                          <Nav.Link eventKey="first">Login</Nav.Link>
                        </div>{" "}
                      </Nav.Item>
                      <Nav.Item>
                        <div
                          className={`py-2 ${
                            key === "second" ? "selected" : ""
                          } `}
                        >
                          <Nav.Link eventKey="second">Signup</Nav.Link>
                        </div>
                      </Nav.Item>
                    </Nav>
                    <Col>
                      <Tab.Content className="bg-primary h-100">
                        {key === "first" ? (
                          <Tab.Pane
                            eventKey="first"
                            className=" d-flex justify-content-center align-items-center mt-5 pt-5"
                          >
                            <Login />
                          </Tab.Pane>
                        ) : (
                          <Tab.Pane
                            eventKey="second"
                            className="d-flex justify-content-center"
                          >
                          
                            <VendorSignup setKey={setKey}/>{" "}
                          </Tab.Pane>
                        )}
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </div>
          </div>
          <div className="col-2 shapedividers_com-5238 h-100 hidden md:block lg:block"></div>
          <div className="col-5 vendor-entry-card-right rounded-end hidden md:block lg:block">
            <div className="d-flex align-items-center h-100">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop
                className="mySwiper"
              >
                {imgArr.map((item, index) => {
                  return (
                    <SwiperSlide className="d-flex justify-content-center align-items-center">
                      <img className="w-75  rounded" src={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryVendor;
