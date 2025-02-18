import React, { useState, useEffect, useRef } from 'react';
import { BsList, BsBookmark } from 'react-icons/bs';
import { SlEnvolope } from 'react-icons/sl';
import { BiArrowToRight } from 'react-icons/bi';
import { AiOutlineShoppingCart, AiOutlineSecurityScan } from 'react-icons/ai';
import { CiSettings, CiLocationOn, CiUser } from 'react-icons/ci';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';
import http from '../Auth/Api/http';
import { useContext } from 'react';
import { ThemeContext } from '../context';
import { FaCalendar, FaMoneyCheckAlt, FaTasks, FaUser, FaUsers } from 'react-icons/fa';

function Sidebar({ sidebarOpen, setSidebarOpen, user }) {

  const { docUser } = useContext(ThemeContext)

  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [id, setId] = useState(Number(user.DoctorId));

  const location = useLocation();
  const { pathname } = location;

  const logout = async (e) => {
    e.preventDefault();

    const out = {
      DoctorId: id
    }
    try {
      const { data } = await http.post('/logout', out)
      console.log(out);
      if (data.errors) {
        console.log(errors);
      } else {
        localStorage.removeItem("jwt");
        window.location = "/"
        console.log("successful log");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-blue-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-cyan-900 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center mb-4 pr-3 sm:px-2">

          <NavLink end to="/" className="block lg:hidden lg:sidebar-expanded:block 2xl:block">
            <div style={{ color: 'white', fontWeight: "bolder", fontSize: '25px' }}>
              <h1>Grapple</h1>
            </div>
            {/* <img src="/images/promax_logo 2.png" alt="logo" className='w-28' /> */}
          </NavLink>
          <div className=" hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
            <div className="px-3">
              <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                <span className="sr-only">Expand / collapse sidebar</span>
                <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                  <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                  <path className="text-slate-600" d="M3 23H1V1h2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className='mt-3 mb-3'>
          <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
              •••
            </span>
            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">DOCTOR</span>
          </h3>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${(pathname === '/' || pathname.includes('dashboard')) && 'hover:text-slate-200'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('dashboard')) && '!text-cyan-500'
                                  }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-cyan-600'}`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-cyan-200'}`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <NavLink to={'/dashboard'} end>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Dashboard
                              </span>
                            </NavLink>
                          </div>
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2"> */}
                          {/* <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg> */}
                          {/* </div> */}
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>




              {/* Profile */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('profile') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to={docUser.Status === 0 ? "/dashboard" : "/profile"}
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('profile') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <FaUsers className={`shrink-0 h-8 w-6 ${(pathname === '/' || pathname.includes('profile')) && 'text-cyan-600'}`} />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Profile </span>
                  </div>
                </NavLink>
              </li>
              {/* Schedule List */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('schedule') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to={docUser.Status === 0 ? "/dashboard" : "/schedule"}

                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('schedule') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <FaTasks className={`shrink-0 h-6 w-6 ${(pathname === '/' || pathname.includes('schedule')) && 'text-cyan-600'}`} />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Schedule</span>
                  </div>
                </NavLink>
              </li>
              {/* Schedule List */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('service') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to={docUser.Status === 0 ? "/dashboard" : "/service"}

                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('service') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <FaMoneyCheckAlt className={`shrink-0 h-6 w-6 ${(pathname === '/' || pathname.includes('service')) && 'text-cyan-600'}`} />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Service</span>
                  </div>
                </NavLink>
              </li>
              {/* Apointment List */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('inbox') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/appointmentList"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('inbox') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <BsList className="shrink-0 h-8 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Apointment List</span>
                  </div>
                </NavLink>
              </li>

              {/* Apointment Setting */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('calendar') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('calendar') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <CiSettings className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Apointment Setting
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Apointment Location */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('campaigns') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('campaigns') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <CiLocationOn className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Apointment Location
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Manage Setting */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('campaigns') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('campaigns') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <AiOutlineShoppingCart className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Manage Setting
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Manage Team */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('campaigns') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('campaigns') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <CiUser className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Manage Team
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Message */}
              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('settings') && 'hover:text-slate-200'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <SlEnvolope className="shrink-0 h-6 w-6" />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Message
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Inbox
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sent
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Trash
                              </span>
                            </NavLink>
                          </li>

                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Manage Articles */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('campaigns') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('campaigns') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <BsBookmark className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Manage Articles
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Account Setting */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('calendar') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('calendar') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <CiSettings className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Account Setting
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Security Setting */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('calendar') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('calendar') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <AiOutlineSecurityScan className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Security Setting
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Logout */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('calendar') && 'bg-slate-900'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('calendar') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <BiArrowToRight onClick={logout} className="shrink-0 h-6 w-6" />
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      <button onClick={logout}>
                        LogOut
                      </button>
                    </span>
                  </div>
                </NavLink>
              </li>

            </ul>
          </div>
          {/* More group */}
          {/* <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
            </h3>
          </div> */}
        </div>

        {/* Expand / collapse button */}

      </div>
    </div>
  );
}

export default Sidebar;