import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBuilding,
  faBoxOpen,
  faUsers,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`h-screen bg-primary text-white w-64 ${
        isOpen ? "block" : "hidden"
      } md:block`}
    >
      {/* Logo and App Name */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        <img src={logo} alt="CustE Logo" className="w-10 h-10 mr-3" />
        <span className="text-xl font-bold">CustE</span>
      </div>

      {/* Navigation Links */}
      <nav className="mt-10">
        <ul>
          <li className="mb-6">
            <Link
              to="/dashboard"
              className="flex items-center px-6 py-2 hover:bg-gray-200 hover:text-black"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/organization"
              className="flex items-center px-6 py-2 hover:bg-gray-200 hover:text-black"
            >
              <FontAwesomeIcon icon={faBuilding} className="mr-3" />
              <span>Organization</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/users"
              className="flex items-center px-6 py-2 hover:bg-gray-200 hover:text-black"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              <span>Users</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/product"
              className="flex items-center px-6 py-2 hover:bg-gray-200 hover:text-black"
            >
              <FontAwesomeIcon icon={faBoxOpen} className="mr-3" />
              <span>Product</span>
            </Link>
          </li>
          <li>
            <Link
              to="/customers"
              className="flex items-center px-6 py-2 hover:bg-gray-200 hover:text-black"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              <span>Customers</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
