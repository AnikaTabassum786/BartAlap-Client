// import React from 'react';
// import fourOfour from '../../assets/images/404.png'
// import { useNavigate } from 'react-router';


// const ErrorPage = () => {
//     const navigate = useNavigate()
//     const handleChange=()=>{
//         navigate('/')
//     }
//     return (
//         <div>
          

//             <div className='mt-2'>
//          <div >
//             <div className='flex justify-center items-center'>
//             <img className='mt-4 w-1/3 h-1/4 rounded-md'  src={fourOfour} alt="Page not found" />
            
//         </div>
//         <div className='my-4'><p className='text-2xl text-red-600 text-center'>Page Not Found</p></div>
//         </div>

//         <div className='flex justify-center items-center hover:scale-95 duration-300'><button onClick={handleChange} className='btn text-white btn-primary'>Home Page</button></div>
//        </div>
//         </div>
//     );
// };

// export default ErrorPage;

import React from 'react';
import fourOfour from '../../assets/images/404.png';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      {/* Image */}
      <div className="max-w-lg w-full flex justify-center">
        <img
          className="w-1/2 h-1/3 object-contain animate-fadeIn"
          src={fourOfour}
          alt="Page not found"
        />
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white text-center">
        Oops! Page Not Found
      </h1>

      {/* Subtext */}
      <p className="mt-2 text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-center">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      {/* Home Button */}
      <div className="mt-6">
        <button
          onClick={handleNavigateHome}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:-translate-y-1 duration-300"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
