import React, { useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FiSearch, FiEdit, FiBell, FiUser, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { useClickOutside } from '../../hooks/useClickOutside';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, signout } = useAuth();

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAuthenticated = !!user;

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(menuRef, () => setIsMenuOpen(false));
  useClickOutside(profileRef, () => setIsProfileOpen(false));

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const navigateToPage = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  const handleSignOut = () => {
    signout();
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-navbar z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <div className="hidden md:block ml-6">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden px-3 py-1 transition-all duration-300 hover:border-primary-300 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-300">
                <FiSearch size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 py-1 px-2 w-full outline-none text-sm"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/create-blog"
                className={({ isActive }) => `
                  flex items-center gap-2 text-sm font-medium transition-colors duration-200
                  ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-500'}
                `}
              >
                <FiEdit size={18} />
                <span>Create Blog</span>
              </NavLink>

              <NavLink
                to="/notifications"
                className={({ isActive }) => `
                  relative text-sm font-medium transition-colors duration-200
                  ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-500'}
                `}
              >
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </NavLink>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center  space-x-2 border border-gray-200 rounded-md px-2 py-1 hover:border-primary-300 transition-colors duration-200 "
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                    <FiUser size={16} />
                  </div>
                  <span className="text-sm font-medium">{user?.username || 'User'}</span>
                  <FiChevronDown size={16} className="text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100 transition-all duration-200 ease-in-out">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-sm">{user?.email}</p>
                    </div>
                    <ul>
                      <li>
                        <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsProfileOpen(false)}>
                          Your Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsProfileOpen(false)}>
                          Settings
                        </NavLink>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={handleSignOut}>
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Sign In
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className={`md:hidden px-4 py-3 bg-white border-t border-gray-100 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
      >
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden px-3 py-2">
            <FiSearch size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 w-full outline-none text-sm"
            />
          </div>
        </form>

        {isAuthenticated ? (
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigateToPage('/create-blog')}
                className="w-full flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-50"
              >
                <FiEdit size={18} className="text-primary-500" />
                <span>Create Blog</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToPage('/notifications')}
                className="w-full flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-50"
              >
                <div className="relative">
                  <FiBell size={18} className="text-primary-500" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </div>
                <span>Notifications</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToPage('/profile')}
                className="w-full flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-gray-50"
              >
                <FiUser size={18} className="text-primary-500" />
                <span>Profile</span>
              </button>
            </li>
            <li className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-2 py-2 text-red-500 rounded-md hover:bg-gray-50"
              >
                Sign out
              </button>
            </li>
          </ul>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="w-full py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};


