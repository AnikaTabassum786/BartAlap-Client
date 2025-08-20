import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { IoIosNotifications } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import { FaUser } from "react-icons/fa";
import useAnnouncement from '../../hooks/useAnnouncement';
import Logo from '../../assets/images/carrier-pigeon.png'
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOutUser } = useAuth()
  const navigate = useNavigate()
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { count, isLoading } = useAnnouncement();

  useEffect(() => {
    if (user) {
      setDropdownOpen(false);
    }
  }, [user]);



  const handleLogin = () => {
    navigate('/login')
  }


  const handleLogout = () => {
    logOutUser()
      .then(() => {
        // console.log('Log Out')
        navigate('/login')
        toast.success(`Logout  Successfully `, {
          position: "top-right",
        });
      })
      .catch((error) => {
        // console.log(error)
        toast.error(error, {
          position: "top-right",
        });
      })
  }

  const navItems =
    <>

      <li>
        <NavLink to="/">
          {({ isActive }) => (
            <span className={isActive ? "active font-bold" : ""}>Home</span>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-posts">
          {({ isActive }) => (
            <span className={isActive ? "active font-bold" : ""}>All Post</span>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/membership">
          {({ isActive }) => (
            <span className={isActive ? "active font-bold" : ""}>Membership</span>
          )}
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <span className={isActive ? "active font-bold" : ""}>Dashboard</span>
          )}
        </NavLink>
      </li>

    </>
  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <div className='flex  items-center'>
          <p className=" text-lg font-medium">BartAlap
          </p>
          <img className='w-10 h-10' src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {/* <IoIosNotifications /> */}

        <div className="relative">
          <IoIosNotifications size={26} />
          {!isLoading && count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </div>

        {/* <a className="btn" onClick={handleLogin}>Join Us</a> */}

        {
          user ?
            <div className="relative">


              {user?.photoURL ? (
                <img
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="cursor-pointer w-8 h-8 rounded-full border-2 border-gray-300"
                  // src={user.photoURL}
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User"
                />
              ) : (
                <FaUser
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="w-8 h-8 p-1 rounded-full border-2 border-gray-300 cursor-pointer text-gray-600"
                />
              )}

              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2  bg-white border shadow-md rounded-md z-20">
                  <li className="px-4 py-0 text-sm font-medium text-gray-700">
                    {user?.displayName || "Anonymous User"}
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-0 text-sm hover:underline cursor-pointer"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-0 text-sm text-red-600 hover:underline cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
            :
            <> <a className="btn" onClick={handleLogin}>Join Us</a></>
        }


      </div>
    </div>
  );
};

export default Navbar;


