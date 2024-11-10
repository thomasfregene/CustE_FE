import React, { useState } from 'react';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
