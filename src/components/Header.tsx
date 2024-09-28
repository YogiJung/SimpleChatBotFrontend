import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-8 bg-white shadow-md w-full">
            {/* Logo and Title */}
            <div className="flex items-center mb-4 md:mb-0">
                {/* Circular Logo Placeholder */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                    <div className="w-full h-0 pt-[100%] rounded-full bg-blue-500 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[40%] h-[40%] rounded-full bg-green-500"></div>
                        </div>
                    </div>
                </div>
                {/* Title */}
                <h1 className="ml-4 text-base md:text-lg font-semibold text-green-600">
                    Vehicle Diagnostic ChatBot
                </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap space-x-4 md:space-x-8 text-sm md:text-base">
                <a href="https://corporate.smartmaintenancesolutions.com/home"
                   className="text-gray-600 hover:text-green-600 whitespace-nowrap">
                    Corporate Solutions
                </a>
                <a href="https://launch.smartmaintenancesolutions.com/individual-services763817"
                   className="text-gray-600 hover:text-green-600 whitespace-nowrap">
                    Individual Services
                </a>
                <a href="/" className="text-gray-600 hover:text-green-600 whitespace-nowrap">
                    AI Powered Diagnostic
                </a>
            </div>
        </div>
    );
};

export default Header;
