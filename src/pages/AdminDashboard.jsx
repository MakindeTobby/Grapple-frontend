import React, { useState, useEffect } from 'react';

import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import jwtDecode from "jwt-decode"
import setAuthToken from './Util/setAuthToken';
import AdminSidebar from '../partials/AdminSidebar';
import AdminHeader from '../partials/AdminHeader';
import AdminWelcome from '../partials/dashboard/AdminWelcome';
import AdminList from '../partials/dashboard/AdminList';

let logUser

if (localStorage.token) {
    const jwt = localStorage.getItem("token")
    setAuthToken(jwt)
   logUser = jwtDecode(jwt)
}
function AdminDashboard() {
  const [user, setUser] = useState(logUser)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <AdminWelcome user={user} />

          
            <div className="grid gap-6">
         
            <AdminList />
              {/* <DashboardCard11 />

               <DashboardCard13 />
               
   
              <DashboardCard12 />
             
   
              //  <DashboardCard10 /> */}
            </div>

          </div>
        </main>


      </div>
    </div>
  );
}

export default AdminDashboard;