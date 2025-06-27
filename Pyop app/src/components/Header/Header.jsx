import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const profile = useSelector((state) => state?.stableData?.profile);

  return (
    <Navbar
      fixed="top"
      className="navbar-glass h-15"
      expand="lg"
      data-bs-theme="dark"
    >
      <Container>
        {/* App logo or text */}
        <Navbar.Brand as={Link} to="/">
          <span className="text-red-200 font-bold text-xl">PYOP</span>
        </Navbar.Brand>

        {/* Links */}
        <Nav className="me-auto flex-row gap-3">
          <Nav.Link
            as={Link}
            to="/customer/dashboard"
            className="text-white px-1
               transition-transform duration-200 ease-in-out
               hover:scale-110"
          >
            Customer
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/business/dashboard"
            className="text-white px-1
               transition-transform duration-200 ease-in-out
               hover:scale-110"
          >
            Vendor
          </Nav.Link>
        </Nav>

        {/* Profile snippet */}
        {profile?.name && (
          <div className=" profile-sectionNavbar rounded-5 shadow-md ">
            <div className="flex items-center gap-2">
              <div className="w-16 flex-shrink-0 rounded-md">
                <img
                  className="w-50% h-50% rounded-full object-cover border-2 border-pink-400 shadow-sm"
                  src="https://www.shutterstock.com/image-photo/happy-handsome-caucasian-man-casual-260nw-2378378987.jpg"
                  alt="Profile"
                  loading="lazy"
                />
              </div>
              <div className="hidden flex-col overflow-hidden">
                <span className="text-purple-700 text-base font-semibold truncate">
                  {profile.name}
                </span>
                <span className="text-pink-600 text-sm font-light truncate">
                  {profile.address}
                </span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
