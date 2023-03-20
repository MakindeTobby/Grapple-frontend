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
                    http.get('/getDoctorById/16'),


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


                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                            Doctors Request
                        </h4>
                        <div className="w-full overflow-hidden rounded-lg shadow-xs">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Phone Number</th>
                                            <th className="px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {
                                            doctors.map(doctors => {
                                                return (
                                                    <tr className="text-gray-700 dark:text-gray-400">
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center text-sm">
                                                                {/* Avatar with inset shadow */}
                                                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                                    <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt loading="lazy" />
                                                                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold">{doctors.SurName} {doctors.FirstName}</p>
                                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                        Doctor
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            {doctors.Email}
                                                        </td>
                                                        <td className="px-4 py-3 text-xs">
                                                            <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                                Pending
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">
                                                            {doctors.PhoneNumber}
                                                        </td>
                                                        <td className="px-4 py-3">

                                                            {/* <div className="flex items-center space-x-4 text-sm">
                                                                <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                                                    <FaEye className='text-sky-500 text-xl' />
                                                                </button>
                                                                <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                            </div> */}

                                                            <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none 
                                                            focus:ring-blue-300">View Details</button>


                                                        </td>
                                                    </tr>

                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                <span className="flex items-center col-span-3">
                                    Showing 1-20 of 00
                                </span>
                                <span className="col-span-2" />
                                {/* Pagination */}
                                <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                    <nav aria-label="Table navigation">
                                        <ul className="inline-flex items-center">
                                            <li>
                                                <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                                                    <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </li>
                                            <li>
                                                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                                    1
                                                </button>
                                            </li>
                                            <li>
                                                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                                    2
                                                </button>
                                            </li>
                                            <li>
                                                <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                                                    3
                                                </button>
                                            </li>
                                            <li>
                                                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                                    4
                                                </button>
                                            </li>
                                            <li>
                                                <span className="px-3 py-1">...</span>
                                            </li>
                                            <li>
                                                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                                    8
                                                </button>
                                            </li>
                                            <li>
                                                <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                                    9
                                                </button>
                                            </li>
                                            <li>
                                                <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                                                    <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </span>
                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </Layout>

    );
}

export default AdminDashboard;