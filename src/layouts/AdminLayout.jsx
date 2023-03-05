import { useState } from "react";
import AdminHeader from "../partials/AdminHeader";
import AdminSidebar from "../partials/AdminSidebar";

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {children}

            </div>
        </div>

    );
}

export default Layout;