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

                    <div className='text-center'>
                        <h1 className='text-3xl mb-5 font-bold'>To get started click the button below</h1>
                        <Link
                            to={'/account-form'}

                            className="inline-block px-6 py-4  text-white font-medium  leading-tight rounded shadow-md bg-blue-900 hover:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mb-3" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                            CLICK ME
                        </Link>
                    </div>


                </div>
            </main>
        </DocLayout>
    );
}

export default Dashboard;