import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa"; // Install via: npm install react-icons
import hotelData from "../data/data.json"; // adjust path as needed

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 flex flex-col">
            <div className="container mx-auto px-4 text-start flex flex-col md:flex-row">
                {/* Address & Phone */}
                <div className="mt-3 text-sm text-gray-300 space-y-1 flex flex-col">
                    <p>📍 {hotelData.hotel.address}</p>
                    <p>📞 Reservation: {hotelData.hotel.phone}</p>
                </div>

                {/* Social Icons */}
                <div className="flex md:justify-end gap-4 mt-4 w-full items-center !text-white">
                    <a
                        href={hotelData.hotel.social?.facebook || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="!text-white hover:text-blue-400 transition-colors text-xl flex"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href={hotelData.hotel.social?.instagram || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="!text-white hover:text-pink-400 transition-colors text-xl flex"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
                <span className="flex">© {new Date().getFullYear()} {hotelData.hotel.name}. All rights reserved.</span>
                {/* Signature */}
                <span className="mt-2 text-gray-400 flex">Designed with ❤️ for travelers</span>
            </div>
        </footer>
    );
};

export default Footer;
