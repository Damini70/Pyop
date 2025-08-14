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
      <div className="hero-section-wrapper pb-[2rem] mt-[50px] relative overflow-hidden">
        {/* <Header /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-primary-800/30 to-primary-700/40"></div>
        <div className="relative z-10 d-flex justify-content-center flex-column pt-[6rem] md:pt-[9rem] lg:pt-[10rem]">
          <div className="d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column m-[2rem] text-center">
              <span className="pyopText bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent drop-shadow-2xl">
                Plan Your Own Party
              </span>
              <br />
              <span className="pyopTextSmall text-center text-white/90 drop-shadow-lg">
                🎉 Party Planning Made Easy, Just a Tap Away 🎊
              </span>
              <div className="mt-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                  <span className="text-white/80 text-sm font-medium">✨ Create memorable experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-800 mb-4">
              Choose Your Party Planning Style
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the perfect approach to create your dream celebration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {heroCardArr.map((item, index) => {
              const cardIcons = ['🎨', '🎯', '🎪'];
              const gradients = [
                'from-purple-500 to-pink-500',
                'from-blue-500 to-cyan-500', 
                'from-green-500 to-teal-500'
              ];
              
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden"
                  onClick={() => handleClickHeroCard(item.path)}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                        {cardIcons[index]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-700 transition-colors">
                          {item.Title}
                        </h3>
                        <p className="text-sm text-gray-500">{item.Desc}</p>
                      </div>
                    </div>
                    
                    {/* Features list */}
                    <div className="space-y-3">
                      {item.array.map((feature, featureIndex) => {
                        return (
                          <div key={featureIndex} className="flex items-center gap-3 group/item">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${gradients[index]} flex items-center justify-center flex-shrink-0`}>
                              <IoCheckmarkCircleSharp className="text-white text-xs" />
                            </div>
                            <span className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">
                              {feature}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Call to action */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent group-hover:scale-105 transition-transform`}>
                        Get Started
                        <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-700"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Suspense fallback={<CircularProgress />}>
        <HotPicks banner="birthday" />
        <HotPicks banner="wedding" />
        <HotPicks banner="party" />
      </Suspense>
      <Explore />
      <Footer />
    </div>
  );
};

export default Home;
