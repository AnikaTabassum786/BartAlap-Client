import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { toast } from 'react-toastify';
import { FaUser, FaPlus, FaFileAlt, FaUsers, FaComments, FaBullhorn, FaHome, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../assets/images/carrier-pigeon.png'

const DashBoardLayout = () => {
    const { role, roleLoading } = useUserRole()
    // console.log(role)
    const { logOutUser } = useAuth()
    const navigate = useNavigate()

    const handleHomePage = () => {
        navigate('/')
    }

    const handleLogout = () => {
        logOutUser()
            .then(() => {
                // console.log('Log Out')
                toast.success(`Logout  Successfully `, {
                  position: "top-right",
                });
                navigate('/login')
            })
            .catch((error) => {
                // console.log(error)
                toast.error(error, {
                  position: "top-right",
                });
            })
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                {/* Page content here */}
                <div className='p-4'>
                    <Outlet></Outlet>
                </div>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">

                    <div className='ml-3 cursor-pointer ' onClick={handleHomePage}>
                        <div className='flex  items-center'>
                                  <p className=" text-lg font-medium">BartAlap
                                </p>
                                <img className='w-10 h-10' src={Logo} alt="Logo" />
                                </div>
                    </div>



                    {
                        !roleLoading && role === 'user' && (
                            <>
                                <li className='mt-6'>
                                    <NavLink to="/dashboard/myProfile">
                                        {({ isActive }) => (
                                          <>
                                           <FaUser /> <span className={isActive ? "active font-bold" : ""}>My Profile</span>
                                          </>
                                        )}
                                        
                                    </NavLink>

                                </li>

                                <li>
                                    <NavLink to="/dashboard/addPost">
                                        {({ isActive }) => (
                                          <>
                                          <FaPlus /> <span className={isActive ? "active font-bold" : ""}>Add Post</span>
                                          </>
                                        )}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/myPost">
                                        {({ isActive }) => (
                                           <>
                                           <FaFileAlt /> <span className={isActive ? "active font-bold" : ""}>My Post</span>
                                           </>
                                        )}
                                    </NavLink>
                                </li>
                            </>
                        )
                    }


                    {
                        !roleLoading && role === 'admin' && (
                            <>
                                <li className='mt-6'>
                                    <NavLink to="/dashboard/adminProfile">
                                        {({ isActive }) => (
                                           <>
                                            <FaUser /> <span className={isActive ? "active font-bold" : ""}>Admin Profile</span>
                                           </>
                                        )}
                                    </NavLink>
                                </li>


                                <li>
                                    <NavLink to="/dashboard/manageUsers">
                                        {({ isActive }) => (
                                            <>
                                            <FaUsers /><span className={isActive ? "active font-bold" : ""}>Manage Users</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/reportComments">
                                        {({ isActive }) => (
                                            <>
                                            <FaComments /><span className={isActive ? "active font-bold" : ""}> Reported Comments</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/makeAnnouncement">
                                        {({ isActive }) => (
                                            <>
                                            <FaBullhorn /><span className={isActive ? "active font-bold" : ""}>  Make Announcement</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            </>
                        )
                    }



                    <li>
                        <button
                            onClick={handleLogout}
                            className="mt-4 w-full text-left  text-sm text-red-600 hover:underline cursor-pointer"
                        >
                          <FaSignOutAlt />  Logout
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;

