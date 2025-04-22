import React, { useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  FaSearch,
  FaEdit,
  FaBell,
  FaUser,
  FaChevronDown,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useClickOutside } from '../../hooks/useClickOutside';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();

  // State for menu toggle (mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for profile dropdown toggle
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // State for search input
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for detecting outside clicks
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(menuRef, () => setIsMenuOpen(false));
  useClickOutside(profileRef, () => setIsProfileOpen(false));

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle profile dropdown
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left: Logo + Search bar */}
        <div className="flex items-center gap-4">
          <Logo />

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 hover:border-primary-300 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-300">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 outline-none w-full text-sm"
              />
            </div>
          </form>
        </div>

        {/* Desktop Menu Links + Profile */}
        <div className="hidden md:flex items-center gap-6">

          {/* Create Blog Link */}
          <NavLink
            to="/create-blog"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-500'
              }`
            }
          >
            <FaEdit />
            Create Blog
          </NavLink>

          {/* Notifications */}
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `relative text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-500'
              }`
            }
          >
            <FaBell />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </NavLink>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1 hover:border-primary-300 transition"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                <FaUser />
              </div>
              <span className="text-sm font-medium">username</span>
              <FaChevronDown />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-md rounded-md z-20">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">username@example.com</p>
                </div>
                <ul>
                  <li>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Your Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => console.log('Sign Out')}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* You can add mobile dropdown menu here if needed */}
    </header>
  );
};

export default Navbar;
