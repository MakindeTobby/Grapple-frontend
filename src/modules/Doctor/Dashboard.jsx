import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import jwtDecode from "jwt-decode"
import { useContext } from 'react';
import { ThemeContext } from '../../context';
import DocLayout from '../../layouts/DocLayout';
import setAuthToken from '../../Auth/Util/setAuthToken';
import { Link } from 'react-router-dom';
import { FaCalendar, FaMoneyCheckAlt, FaUserInjured } from 'react-icons/fa';

let logUser

if (localStorage.jwt) {
    const jwt = localStorage.getItem("jwt")
    setAuthToken(jwt)
    logUser = jwtDecode(jwt)
}
function Dashboard() {
    const [user, setUser] = useState(logUser)
    const { docUser } = useContext(ThemeContext)
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
    console.log(docUser);

    return (
        <DocLayout>
            <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                    {/* Welcome banner */}
                    <WelcomeBanner user={docUser} />
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                        {/* Card */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                                <FaUserInjured />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">
                                    Total Patient
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    0
                                </p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                                <FaCalendar />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">
                                    Total Appointments
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    0
                                </p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                                <FaCalendar />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">
                                    Today's appointment
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    0
                                </p>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                                <FaMoneyCheckAlt />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">
                                    total service
                                </p>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                    0
                                </p>
                            </div>
                        </div>
                    </div>

                    {
                        docUser.Status === 0 ?
                            <div className='text-center'>
                                <h1 className='text-3xl mb-5 font-bold'>To get started click the button below</h1>
                                <Link
                                    to={'/account-form'}

                                    className="inline-block px-6 py-4  text-white font-medium  leading-tight rounded shadow-md bg-cyan-900 hover:bg-cyan-800 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mb-3" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                    Proceed
                                </Link>
                            </div> : <div className=''>


                                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                    <span className="font-bold">Your documents have been submitted and currenly undergoing review!</span>
                                </div>


                            </div>

                    }


                </div>
            </main>
        </DocLayout>
    );
}

export default Dashboard;