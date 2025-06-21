import React, { Suspense, useEffect } from "react";
import "./Home.css";
import Header from "../../../components/Header/Header";
import { CiSearch } from "react-icons/ci";
import Button from "../../../components/Buttons/Buttons";
import HeroCard from "../../../components/HeroCards/HeroCards";
import HeroMainCard from "../../../components/HeroMainCard/HeroMainCard";
import img1 from "../../../Images/Landing/ownParty.jpg";
import img2 from "../../../Images/Landing/partyByPyop.jpg";
import img3 from "../../../Images/Landing/customParty.jpg";
import Footer from "../../../components/Footer/Footer";
import Explore from "../../../components/Explore/Explore";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { setProfile } from "../../../redux/actions";

const heroCardArr = [
  {
    Title: "Create Your Party",
    Desc: "Have your control over your party",
    array: [
      "Venue Control",
      "Vibe Control (Music, Ambience, etc)",
      "Decoration Control",
      "Timeline Control",
      "Creative Control",
    ],
    path: "/customer/create-party",
  },
  {
    Title: "Custom Party",
    Desc: "Have your control over your party",
    array: [
      "Customized Party",
      "Choose as much as need",
      "Select from variety of options",
      "Select from variety of options",
      "Select from variety of options",
    ],
    path: "/customer/custom-party",
  },
  {
    Title: "Party by PYOP",
    Desc: "Plan a party with verified packages",
    array: [
      "Supported Venue Control",
      "Supported Vibe Control",
      "Supported Decoration Control",
      "Supported Timeline Control",
      "Supported Creative Control",
    ],
    path: "/customer/pyop-party",
  },
];

const heroMainCardArr = [
  {
    Image: img1,
    Title: "Create Party",
    Desc: "Manage your own party",
  },
  {
    Image: img2,
    Title: "Organize Party",
    Desc: "PYOP Manage your own party",
  },
  {
    Image: img3,
    Title: "Custom Party",
    Desc: "Manage your own party assets",
  },
];

const Home = () => {
  const HotPicks = React.lazy(() =>
    import("../../../components/HomeComponent/HotPicks")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkJWTExpiry = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.clear();
      dispatch(setProfile({}));
    }
  };

  useEffect(() => {
    checkJWTExpiry();
  }, []);

  useEffect(() => {
    // Replace the history to prevent back button navigation
    navigate("/", { replace: true });
  }, [navigate]);

  const handleClickHeroCard = (path) => {
    if (localStorage.getItem("token")) {
      navigate(path);
    } else {
      toast.error("To plan Party you have to login first!!");
      navigate("/customer/login", { state: path });
    }
  };

  return (
    <div>
      <div className="hero-section-wrapper pb-[2rem]">
        <Header />
        <div className=" d-flex justify-content-center flex-column  pt-[10rem]">
          <div className="d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column m-[2rem] text-center">
              <span className="pyopText">Plan Your Own Party</span>
              <br />
              <span className="pyopTextSmall text-center">
                Party Planning Made Easy, Just a Tap Away.
              </span>
            </div>
          </div>
          {/* <div className="mt-5 px-5">
            <div className="d-flex gap-5 justify-content-around px-5">
              {heroMainCardArr.map((item, index) => {
                return (
                  <div key={index}>
                    <HeroMainCard data={item} />
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
      <div className="">
        <div className="hero-section">
          <div className="h-full justify-around items-center px-5">
            <div className="d-flex flex-column">
              {/* <div className="">
                <div className="form-control rounded-4 d-flex">
                  <div className="d-flex justify-content-between w-100">
                    <CiSearch className="fs-1" />
                    <input
                      type="text"
                      className="outline-none border-none main-search-input text-20px "
                      placeholder="Search..."
                    ></input>
                    <Button text="Search" className="btn-search" />
                  </div>
                </div>
              </div> */}
              <div className="my-5">
                <div className="">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                    {heroCardArr.map((item, index) => {
                      return (
                        <div
                          className=" bg-dark border-0 rounded-4 p-2 hover:cursor-pointer shadow-md"
                          onClick={() => handleClickHeroCard(item.path)}
                        >
                          <div className="card card-hero-main-title-wrapper py-2 text-theme px-2 fs-4 fw-light">
                            {item.Title}
                          </div>
                          {/* <div className="d-flex flex-column height-card-hero">
                            <img
                              className="hero-card-pyop-image"
                              src="https://img.freepik.com/free-photo/people-celebrating-party_53876-14410.jpg"
                            ></img>
                          </div> */}
                          <div className="mt-2">
                            <ul class="hero-card__list ">
                              {item.array.map((item, index) => {
                                return (
                                  <li className="hero-card__list_item flex mt-3">
                                    <IoCheckmarkCircleSharp className="text-theme" />
                                    <span className="list_text ms-1 text-theme text-12px">
                                      {item}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                      // <HeroCard data={item} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<CircularProgress />}>
        <HotPicks banner="birthday"/>
        <HotPicks banner="wedding"/>
        <HotPicks banner="party"/>
      </Suspense>
      <Explore />
      <Footer />
    </div>
  );
};

export default Home;
