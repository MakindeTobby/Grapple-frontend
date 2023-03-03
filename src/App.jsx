import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/Notfound';
import Staffs from './pages/UserManagement/Staff';
import AdminAuth from './pages/Auth/AdminRegister';
import PrivateRoutes from './pages/Private/PrivateRoutes'
import AppointmentList from './pages/Appointment/AppointmentList';
import VerifyOtp from './pages/Auth/VerifyOtp';
import AdminDashboard from './pages/AdminDashboard';
import Submit from './components/Submit';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes >

        {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin-auth" element={<AdminAuth />} />
        <Route exact path="/" element={<Login />} errorElement={<NotFound />} />
        <Route exact path="/staffs" element={<Staffs />} />
        <Route exact path="/appointmentList" element={<AppointmentList />} />
        <Route exact path="/verifyotp" element={<VerifyOtp />} />
        <Route exact path="/adminDashboard" element={<AdminDashboard />} />
        <Route exact path="/submit" element={<Submit />} />
        <Route exact path="*" element={<NotFound />} />

        <Route element={<PrivateRoutes />}>
       <Route element={<Dashboard />} path='dashboard' />
       </Route> 

      </Routes>
    </>
  );
}

export default App;
