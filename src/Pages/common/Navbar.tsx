import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faCog,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-200 text-white px-6 py-4 flex justify-between items-center">
      {/* Hamburger Menu */}
      <button onClick={onToggleSidebar} className="md:hidden">
        <FontAwesomeIcon icon={faBars} className="text-black" />
      </button>

      {/* Search Bar */}
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg text-black focus:outline-none"
        />
      </div>

      {/* User Profile & Notification */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faBell}
            className="text-xl cursor-pointer text-black"
          />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-xl mr-4 text-black"
            />
            <span className="text-black">Welcome Admin</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-98 bg-white rounded-lg shadow-lg py-2 text-black">
              <button className="block px-4 py-2 text-sm hover:bg-gray-200">
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
