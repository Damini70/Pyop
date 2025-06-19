import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const trasparentStyle = {
  backgroundColor: "transparent",
  height: "20vh",
};

const Header = () => {
  const profile = useSelector((state) => state?.stableData?.profile);
  const token = localStorage.getItem("token");
  return (
    <div className="">
      <Navbar style={trasparentStyle} className=" " data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/">
            <span className="text-red-200">PYOP</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                className="text-decoration-none text-white"
                to="/customer/dashboard"
              >
                Customer
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className="text-decoration-none text-white"
                to="/business/dashboard"
              >
                Vendor
              </Link>
            </Nav.Link>
          </Nav>
          <div>
            {profile?.name && (
              <div className="card profile-sectionNavbar p-2 px-3 rounded-4">
                <div className="row g-4">
                  <div className="col-3">
                    <div className="profile-image-wrapper">
                      <img
                        className="profile-image-navbar-style"
                        src="https://www.shutterstock.com/image-photo/happy-handsome-caucasian-man-casual-260nw-2378378987.jpg"
                        loading="lazy"
                      ></img>{" "}
                    </div>
                  </div>
                  <div className="col-9 flex-column">
                    <div>
                      <span className="text-theme fs-6 fw-light">
                        {profile?.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-theme text-12px fw-light">
                        {profile?.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
