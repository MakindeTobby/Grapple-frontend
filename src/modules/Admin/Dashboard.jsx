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
import { FaCheckSquare, FaEye, FaRegEdit, FaTrash, FaUser, FaUserMd, FaUsers } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import BarChart01 from '../../charts/BarChart01';
import BarChart02 from '../../charts/BarChart02';
import LineChart02 from '../../charts/LineChart02';
import DashboardCard01 from '../../partials/dashboard/DashboardCard01';
import DashboardCard13 from '../../partials/dashboard/DashboardCard13';
import DashboardCard12 from '../../partials/dashboard/DashboardCard12';
import http from '../../Auth/Api/http';

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
    const [doctors, setDoctors] = useState([])


    useEffect(() => {
        async function Fetch() {
            try {
                const response = await Promise.all([
                    http.get('/getAllDoctor'),
                    http.get('/getDoctorById/14'),


                ])
                const doctors = response[0].data;
                const details = response[1].data;
                setDoctors(doctors);
                console.log(details);

            } catch (error) {
                console.log(error);
            }
        }
        Fetch()

    }, [])




    return (
        <Layout>

            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


                    {/* <AdminWelcome user={user} /> */}
                    <div className=" grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6 mb-5">
                        <Widget
                            icon={<FaUserMd className="h-8 w-8" />}
                            title={"Doctors"}
                            subtitle={"0"}
                        />
                        <Widget
                            icon={<FaUser className="h-7 w-7" />}
                            title={"Pharmacists"}
                            subtitle={"0"}
                        />
                        <Widget
                            icon={<BsFillPeopleFill className="h-8 w-8" />}
                            title={"Health Workers"}
                            subtitle={"0"}
                        />
                        <Widget
                            icon={<FaUsers className="h-8 w-8" />}
                            title={"Patients"}
                            subtitle={"0"}
                        />

                    </div>


                    <div className="grid gap-6">
                        {/* <DashboardCard12 /> */}

                        {/* <AdminList /> */}
                        <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                            <header className="px-5 py-4 border-b border-slate-100">
                                <h2 className="font-semibold text-slate-800">Doctors Request</h2>
                            </header>
                            <div className="p-3">

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        {/* Table header */}
                                        <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                                            <tr>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Name</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Email</div>
                                                </th>
                                                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Spent</div>
                </th> */}
                                                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Country</div>
                </th> */}
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Phone Number</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Action</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {/* Table body */}
                                        <tbody className="text-sm divide-y divide-slate-100">
                                            {
                                                doctors.map(doctors => {
                                                    return (
                                                        <tr key={doctors.DoctorId}>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-slate-800">{doctors.SurName} {doctors.FirstName}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left">{doctors.Email}</div>
                                                            </td>
                                                            {/* <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{}</div>
                      </td> */}
                                                            {/* <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{customer.location}</div>
                      </td> */}
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div >{doctors.PhoneNumber}</div>
                                                            </td>

                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex  gap-4">

                                                                    <button title='View'><FaEye className='text-sky-500 text-xl' /></button>
                                                                    <button title='Delete'><FaTrash className='text-red-500 text-xl' /></button>


                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </Layout>

    );
}

export default AdminDashboard;