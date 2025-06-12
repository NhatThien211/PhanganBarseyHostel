import React, { useState } from "react";

interface HeaderProps {
  hotelName: string;
  onBooking: () => void
}

const Header: React.FC<HeaderProps> = ({ hotelName, onBooking}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-sm z-40 absolute w-full bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white border border-white p-2">
          {hotelName}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex">
          <ul className="flex space-x-6 items-center">
            {/* <li>
              <a href="#" className="!text-white hover:text-blue-300 font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="!text-white hover:text-blue-300 font-medium">
                About Me
              </a>
            </li> */}
            <li>
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={onBooking}>
                Book a room
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="space-y-4 text-center">
            {/* <li>
              <a href="#" className="block !text-white font-medium hover:text-blue-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block !text-white font-medium hover:text-blue-300">
                About Me
              </a>
            </li> */}
            <li>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Book a room
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
