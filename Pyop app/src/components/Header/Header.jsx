import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const trasparentStyle = {
  backgroundColor: "transparent",
  height: "10vh",
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
              <div className="card profile-sectionNavbar md:p-3 lg:p-3 rounded-2 shadow-md bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover border-2 border-pink-400 shadow-sm"
                      src="https://www.shutterstock.com/image-photo/happy-handsome-caucasian-man-casual-260nw-2378378987.jpg"
                      alt="Profile"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-col overflow-hidden hidden md:flex lg:flex">
                    <span className="text-purple-700 text-base font-semibold truncate">
                      {profile?.name}
                    </span>
                    <span className="text-pink-600 text-sm font-light truncate">
                      {profile?.address}
                    </span>
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
