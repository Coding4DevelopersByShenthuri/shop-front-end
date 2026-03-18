import React, { useState } from 'react';
import Sidebar from '../components/common/SideBar';
import { Outlet } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <HiMenuAlt2 size={24} />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
        <Sidebar isMobile={true} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 lg:p-8 w-full">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


