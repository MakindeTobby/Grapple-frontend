import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './modules/Doctor/Dashboard';
import Register from './Auth/Register'
import NotFound from './pages/Notfound';
import AdminAuth from './Auth/AdminLogin';
import PrivateRoutes from './Private/PrivateRoutes'
import AppointmentList from './modules/Doctor/Appointment/AppointmentList';
import VerifyOtp from './Auth/VerifyOtp';
import AdminDashboard from './modules/Admin/Dashboard';
import Submit from './components/Submit';
import Login from './Auth/Login';
import SetupForm from './modules/Doctor/SetupForm';
import AccountForm from './modules/Doctor/AccountForm';
import PatientLogin from './Auth/patientLogin';
import DocProfile from './modules/Doctor/Profile';
import ThankYou from './modules/Doctor/ThankYou';

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
        <Route exact path="/admin" element={<AdminAuth />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/patient-login" element={<PatientLogin />} />
        <Route exact path="/verifyotp" element={<VerifyOtp />} />
        <Route exact path="/adminDashboard" element={<AdminDashboard />} />
        <Route exact path="/submit" element={<Submit />} />
        <Route exact path="*" element={<NotFound />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path='dashboard' />
          <Route element={<SetupForm />} path='setup' />
          <Route element={<AccountForm />} path='account-form' />
          <Route element={<ThankYou />} path='thank-you' />
          <Route element={<DocProfile />} path='profile' />
          <Route exact path="/appointmentList" element={<AppointmentList />} />




        </Route>

      </Routes>
    </>
  );
}

export default App;
