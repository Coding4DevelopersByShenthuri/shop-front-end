import React from 'react';
import Sidebar from '../components/common/SideBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This renders the nested routes like Overview, Analytics */}
      </div>
    </div>
  );
};

export default DashboardLayout;


