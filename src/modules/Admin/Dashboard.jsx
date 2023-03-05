import React, { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode"
import setAuthToken from '../../Auth/Util/setAuthToken';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminHeader from '../../partials/AdminHeader';
import AdminWelcome from '../../partials/dashboard/AdminWelcome';
import AdminList from '../../partials/dashboard/AdminList';
import Layout from '../../layouts/AdminLayout';

import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from '../../components/widget/Widget';
import { FaUser, FaUserMd, FaUsers } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import BarChart01 from '../../charts/BarChart01';
import BarChart02 from '../../charts/BarChart02';
import LineChart02 from '../../charts/LineChart02';
import DashboardCard01 from '../../partials/dashboard/DashboardCard01';
import DashboardCard13 from '../../partials/dashboard/DashboardCard13';
import DashboardCard12 from '../../partials/dashboard/DashboardCard12';

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
        <Layout>

            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


                    {/* <AdminWelcome user={user} /> */}
                    <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6 mb-5">
                        <Widget
                            icon={<FaUserMd className="h-8 w-8" />}
                            title={"Doctors"}
                            subtitle={"50"}
                        />
                        <Widget
                            icon={<FaUser className="h-7 w-7" />}
                            title={"Pharmacists"}
                            subtitle={"75"}
                        />
                        <Widget
                            icon={<BsFillPeopleFill className="h-8 w-8" />}
                            title={"Health Workers"}
                            subtitle={"55"}
                        />
                        <Widget
                            icon={<FaUsers className="h-8 w-8" />}
                            title={"Patients"}
                            subtitle={"345"}
                        />

                    </div>


                    <div className="grid gap-6">
                        <DashboardCard12 />

                        <AdminList />

                    </div>

                </div>
            </main>
        </Layout>

    );
}

export default AdminDashboard;