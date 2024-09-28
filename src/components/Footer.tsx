import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white py-10">
            <div className="container mx-auto px-6 md:flex md:justify-between">
                {/* About Us Section */}
                <div className="mb-8 md:mb-0">
                    <h2 className="font-bold text-lg mb-4">About Us</h2>
                    <ul>
                        <li className="mb-2"><a href="https://corporate.smartmaintenancesolutions.com/about-us" className="hover:underline">About Us</a></li>
                        <li className="mb-2"><a href="" className="hover:underline">Careers (Soon)</a></li>
                        <li className="mb-2"><a href="https://launch.smartmaintenancesolutions.com/blogs" className="hover:underline">Blogs</a></li>
                        <li className="mb-2"><a href="" className="hover:underline">FAQ</a></li>
                        <li className="mb-2"><a href="https://corporate.smartmaintenancesolutions.com/privacy-policy" className="hover:underline">Privacy Notice</a></li>
                        <li className="mb-2"><a href="https://corporate.smartmaintenancesolutions.com/terms-of-use" className="hover:underline">Terms and Conditions</a></li>
                    </ul>
                </div>

                {/* Our Programs Section */}
                <div className="mb-8 md:mb-0">
                    <h2 className="font-bold text-lg mb-4">Our Programs</h2>
                    <ul>
                        <li className="mb-2"><a href="#" className="hover:underline">Support</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Planning</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Coordination</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Monitoring</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Reporting</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Dispatching</a></li>
                    </ul>
                </div>

                {/* Follow Us Section */}
                <div className="mb-8 md:mb-0">
                    <h2 className="font-bold text-lg mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/people/Smart-Maintenance-Solutions/61555175816417/" className="text-white hover:text-gray-300">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://www.instagram.com/smartmaintenancesolutions/" className="text-white hover:text-gray-300">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://www.youtube.com/@SmartMaintenanceSolutions" className="text-white hover:text-gray-300">
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </div>

                {/* Contact Us Section */}
                <div className="mb-8 md:mb-0">
                    <h2 className="font-bold text-lg mb-4">Contact Us</h2>
                    <ul>
                        <li className="mb-2"><a href="mailto:customerservice@smartmaintenancesolutions.com" className="hover:underline">Tap to Email</a></li>
                        <li className="mb-2"><a href="tel:+18769906056" className="hover:underline">Tap to Call</a></li>
                    </ul>
                </div>
            </div>

            {/* Read More Button */}
            <div className="text-center my-6">
                <a href="https://corporate.smartmaintenancesolutions.com/home" target="_blank" rel="noopener noreferrer">
                    <button className="bg-white text-blue-500 px-6 py-2 rounded-full hover:bg-gray-200">
                        Read More
                    </button>
                </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm">
                Copyright 2023 - Proficiencia Holdings Limited (JA) - All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
