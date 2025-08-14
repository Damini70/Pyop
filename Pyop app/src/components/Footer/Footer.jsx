import React, { useState } from "react";
import "./Footer.css";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import {Link} from "react-router-dom"
import { toast } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email.trim() === '') {
      toast.error('Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Clear the input form
    setEmail('');
    toast.success('Successfully subscribed to our newsletter!');
  };
  return (
    <footer className="Footer-Wrapper relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-lg"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Plan Your Own Party
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Making party planning effortless and memorable. Create unforgettable experiences with our comprehensive party planning platform.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Get in Touch</h3>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MdOutlineMarkEmailRead className="text-white" />
                </div>
                <span>daminiraj70@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPhone className="text-white" />
                </div>
                <span>7488128085</span>
              </div>
            </div>
          </div>
          
       
          
          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-6">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: BsFacebook, color: 'from-blue-600 to-blue-700', label: 'Facebook' },
                { icon: FaSquareXTwitter, color: 'from-gray-800 to-black', label: 'Twitter' },
                { icon: IoLogoYoutube, color: 'from-red-600 to-red-700', label: 'YouTube' },
                { icon: SiInstagram, color: 'from-pink-500 to-purple-600', label: 'Instagram' },
                { icon: FaLinkedin, color: 'from-blue-700 to-blue-800', label: 'LinkedIn' }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={index}
                    to="#"
                    className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                    title={social.label}
                  >
                    <IconComponent className="text-lg group-hover:scale-110 transition-transform" />
                  </Link>
                );
              })}
            </div>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-3">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                />
                <button 
                  onClick={handleSubscribe}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-400 text-primary-900 font-medium rounded-lg hover:scale-105 transition-transform"
                >
                  ✓
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Plan Your Own Party. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
