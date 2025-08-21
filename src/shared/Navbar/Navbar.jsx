// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router';
// import { IoIosNotifications } from "react-icons/io";
// import useAuth from '../../hooks/useAuth';
// import { FaUser } from "react-icons/fa";
// import useAnnouncement from '../../hooks/useAnnouncement';
// import Logo from '../../assets/images/carrier-pigeon.png'
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const { user, logOutUser } = useAuth()
//   const navigate = useNavigate()
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const { count, isLoading } = useAnnouncement();

//   useEffect(() => {
//     if (user) {
//       setDropdownOpen(false);
//     }
//   }, [user]);



//   const handleLogin = () => {
//     navigate('/login')
//   }


//   const handleLogout = () => {
//     logOutUser()
//       .then(() => {
//         // console.log('Log Out')
//         navigate('/login')
//         toast.success(`Logout  Successfully `, {
//           position: "top-right",
//         });
//       })
//       .catch((error) => {
//         // console.log(error)
//         toast.error(error, {
//           position: "top-right",
//         });
//       })
//   }

//   const navItems =
//     <>

//       <li>
//         <NavLink to="/">
//           {({ isActive }) => (
//             <span className={isActive ? "active font-bold" : ""}>Home</span>
//           )}
//         </NavLink>
//       </li>

     
//       <li>
//         <NavLink to="/all-posts">
//           {({ isActive }) => (
//             <span className={isActive ? "active font-bold" : ""}>All Post</span>
//           )}
//         </NavLink>
//       </li>

//       <li>
//         <NavLink to="/membership">
//           {({ isActive }) => (
//             <span className={isActive ? "active font-bold" : ""}>Membership</span>
//           )}
//         </NavLink>
//       </li>

//       <li>
//         <NavLink to="/dashboard">
//           {({ isActive }) => (
//             <span className={isActive ? "active font-bold" : ""}>Dashboard</span>
//           )}
//         </NavLink>
//       </li>

//     </>
//   return (
//     <div className="navbar bg-base-100 shadow-sm  fixed top-0 left-0 w-full z-10">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//             {navItems}
//           </ul>
//         </div>
//         <div className='flex  items-center'>
//           <p className=" text-lg font-medium">BartAlap
//           </p>
//           <img className='w-10 h-10' src={Logo} alt="Logo" />
//         </div>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navItems}
//         </ul>
//       </div>
//       <div className="navbar-end space-x-2">
//         {/* <IoIosNotifications /> */}

//         <div className="relative">
//           <IoIosNotifications size={26} />
//           {!isLoading && count > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//               {count}
//             </span>
//           )}
//         </div>

//         {/* <a className="btn" onClick={handleLogin}>Join Us</a> */}

//         {
//           user ?
//             <div className="relative">


//               {user?.photoURL ? (
//                 <img
//                   onClick={() => setDropdownOpen(!isDropdownOpen)}
//                   className="cursor-pointer w-8 h-8 rounded-full border-2 border-gray-300"
//                   // src={user.photoURL}
//                   src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
//                   alt="User"
//                 />
//               ) : (
//                 <FaUser
//                   onClick={() => setDropdownOpen(!isDropdownOpen)}
//                   className="w-8 h-8 p-1 rounded-full border-2 border-gray-300 cursor-pointer text-gray-600"
//                 />
//               )}

//               {isDropdownOpen && (
//                 <ul className="absolute right-0 mt-2  bg-white border shadow-md rounded-md z-20">
//                   <li className="px-4 py-0 text-sm font-medium text-gray-700">
//                     {user?.displayName || "Anonymous User"}
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => {
//                         navigate('/dashboard');
//                         setDropdownOpen(false);
//                       }}
//                       className="w-full text-left px-4 py-0 text-sm hover:underline cursor-pointer"
//                     >
//                       Dashboard
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-0 text-sm text-red-600 hover:underline cursor-pointer"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//             :
//             <> <a className="btn" onClick={handleLogin}>Join Us</a></>
//         }


//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { IoIosNotifications } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import { FaUser } from "react-icons/fa";
import useAnnouncement from '../../hooks/useAnnouncement';
import Logo from '../../assets/images/carrier-pigeon.png'
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { count, isLoading } = useAnnouncement();

  // 🌙 Theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // ✅ Toggle handler
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // ✅ Apply theme on change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", localTheme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      setDropdownOpen(false);
    }
  }, [user]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        navigate('/login');
        toast.success(`Logout Successfully`, { position: "top-right" });
      })
      .catch((error) => {
        toast.error(error, { position: "top-right" });
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active font-bold" : "")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-posts" className={({ isActive }) => (isActive ? "active font-bold" : "")}>
          All Post
        </NavLink>
      </li>
      <li>
        <NavLink to="/membership" className={({ isActive }) => (isActive ? "active font-bold" : "")}>
          Membership
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active font-bold" : "")}>
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-10 dark:bg-gray-800 dark:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <div className="flex items-center">
          <p className="text-lg font-medium">BartAlap</p>
          <img className="w-10 h-10" src={Logo} alt="Logo" />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end space-x-2">

       
        {/* <label className="swap swap-rotate">
          <input type="checkbox" onChange={handleToggle} checked={theme === 'dark'} />
         
          <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17Z..." />
          </svg>
        
          <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14..." />
          </svg>
        </label> */}

        <div>
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleToggle} checked={theme === 'light' ? false : true} />
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* Notifications */}
        <div className="relative">
          <IoIosNotifications size={26} />
          {!isLoading && count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </div>

        {/* Auth Buttons */}
        {user ? (
          <div className="relative">
            {user?.photoURL ? (
              <img
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="cursor-pointer w-8 h-8 rounded-full border-2 border-gray-300"
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
              <ul className="absolute right-0 mt-2  border shadow-md rounded-md z-20 ">
                <li className="px-4 py-0 text-sm font-medium">
                  {user?.displayName || "Anonymous User"}
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-0 text-sm hover:underline"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-0 text-sm text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <a className="btn" onClick={handleLogin}>Join Us</a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
