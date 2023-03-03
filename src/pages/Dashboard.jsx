import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import jwtDecode from "jwt-decode"
import setAuthToken from './Util/setAuthToken';

let logUser

if (localStorage.jwt) {
    const jwt = localStorage.getItem("jwt")
    setAuthToken(jwt)
   logUser = jwtDecode(jwt)
}
function Dashboard() {
  const [user, setUser] = useState(logUser)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let tokenTimeout = setTimeout(() => {
      // Clear token from localStorage and log out user
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Reset timer on user activity
    const resetTimer = () => {
      clearTimeout(tokenTimeout);
      tokenTimeout = setTimeout(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      }, 30 * 60 * 1000);
    };
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);

    // Remove event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keydown", resetTimer);
    };
  }, []);


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner user={user} />

            {/* Dashboard actions */}
            {/* <div className="sm:flex sm:justify-between sm:items-center mb-8"> */}

              {/* Left: Avatars */}

              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"> */}
                {/* Filter button */}

                {/* <FilterButton /> */}

                {/* Datepicker built with flatpickr */}
                {/* <Datepicker /> */}
                {/* Add view button */}
                {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button> */}
              {/* </div> */}

            {/* </div> */}

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 /> */}
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 /> */}
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Doughnut chart (Top Countries) */}
              {/* <DashboardCard06 /> */}
              {/* Table (Top Channels) */}
              {/* <DashboardCard07 /> */}
              {/* Line chart (Sales Over Time) */}
              {/* <DashboardCard08 /> */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* <DashboardCard09 /> */}
             
              {/* Card (Reasons for Refunds) */}
              <DashboardCard11 />

               {/* Card (Income/Expenses) */}
               <DashboardCard13 />
               
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
             
               {/* Card (Customers) */}
               <DashboardCard10 />
            </div>

          </div>
        </main>


      </div>
    </div>
  );
}

export default Dashboard;