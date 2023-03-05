import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

function DocLayout({ children }) {
    const { docUser } = useContext(ThemeContext)
    const [sidebarOpen, setSidebarOpen] = useState(false);



    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar user={docUser} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {children}


            </div>
        </div>
    );
}

export default DocLayout;