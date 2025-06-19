import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Swiper, SwiperSlide } from "swiper/react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import pyopimg1 from "../../../Images/pyop1.jpg";
import pyopimg2 from "../../../Images/pyop2.jpg";
import pyopimg3 from "../../../Images/pyop3.jpg";

// import "./styles.css";

// import required modules
import { Autoplay } from "swiper/modules";

const imgArr = [pyopimg1, pyopimg2, pyopimg3];
const EntryLogin = () => {
  const [activeTab, setActiveTab] = useState("login"); // Default to 'login' tab

  const switchTab = (tab) => {
    setActiveTab(tab);
  };
//  useEffect(()=>{
//   localStorage.clear()

//  },[])
  return (
    <>
      <div className="customer-signup-wrapper d-flex justify-content-center align-items-center">
        <div class="custom-shape-divider-bottom-1730197036">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="customer-signup-main-card card">
          <div className="row g-0 h-100">
            <div className="col-5 d-flex justify-content-center customer-login-wrapper">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="d-flex">
                  {/* <Col sm={3}> */}
                  <Nav
                    variant="pills"
                    className="flex-row justify-content-center pt-5 d-flex gap-2"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="first">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Signup</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  {/* </Col> */}
                  <Col>
                    <Tab.Content className="">
                      <Tab.Pane eventKey="first" className="ps-4">
                        <Login />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Signup />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
            <div className="col-2 shapedividers_com-1784"></div>
            <div className="col-5 customer-signup-card-right d-flex align-items-center">
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
    </>
    // <div className="entry-container">
    //   <div className="tabs d-flex">
    //     <button
    //       className={activeTab === "login" ? "active-tab" : ""}
    //       onClick={() => switchTab("login")}
    //     >
    //       Login
    //     </button>
    //     <button
    //       className={activeTab === "signup" ? "active-tab" : ""}
    //       onClick={() => switchTab("signup")}
    //     >
    //       Signup
    //     </button>
    //   </div>

    //   <div className="tab-content">
    //     {activeTab === "login" && <Login />}
    //     {activeTab === "signup" && <Signup />}
    //   </div>
    // </div>
  );
};

export default EntryLogin;
