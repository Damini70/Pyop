import React from "react";
import "./Footer.css";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    // <div className="Footer-Wrapper">
    //   <div className="d-flex p-5 h-100">
    //     <div className="row bg-warning w-100">
    //       <div className="col-6 p-3 h-100">
    //         <span className="text-theme">Contact</span>
    //       </div>
    //       <div className="col-6 p-3 bg-danger h-100">asd</div>
    //     </div>
    //   </div>
    // </div>
    <footer className="Footer-Wrapper text-white py-4">
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4">
            <div>
              <span className="text-theme fs-3">Contact Us</span>
              <p className="row g-0">
                <span className="col-1">
                  <MdOutlineMarkEmailRead />
                  <br />
                  <FiPhone />
                </span>
                <span className="col-11">
                  Email: support@planownparty.com
                  <br />
                  Phone: +1 (123) 456-7890
                </span>
              </p>
            </div>
            <div className="d-flex flex-column mt-4">
              <div>
                <span className="fs-3 text-theme">Social Links</span>
              </div>
              <div className="d-flex justify-content-between w-50 mt-2">
                <BsFacebook className="fs-3" />
                <FaSquareXTwitter className="fs-3" />
                <IoLogoYoutube className="fs-3" />
                <SiInstagram className="fs-3" />
                <FaLinkedin className="fs-3" />
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex align-items-center ps-5">
            <div className="w-100">
              <span className="text-theme fs-3">Business Onboardings</span>
              <form>
                <div className="form-group">
                  {/* <label htmlFor="formName">Name</label> */}
                  <input
                    type="text"
                    className="form-control-dark form-control my-2"
                    id="formName"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="formMobile">Mobile Number</label> */}
                  <input
                    type="text"
                    className="form-control-dark form-control my-2"
                    id="formName"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="formPassword">Password</label> */}
                  <input
                    type="password"
                    className="form-control form-control-dark"
                    id="formPassword"
                    placeholder="Enter your password"
                  />
                </div>
                <button type="button" className="btn btn-submit-dark my-2">
                  Submit{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
