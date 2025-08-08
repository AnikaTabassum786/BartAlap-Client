import React from 'react';
import fourOfour from '../../assets/images/404.png'
import { useNavigate } from 'react-router';


const ErrorPage = () => {
    const navigate = useNavigate()
    const handleChange=()=>{
        navigate('/')
    }
    return (
        <div>
          

            <div className='mt-2'>
         <div >
            <div className='flex justify-center items-center'>
            <img className='mt-4 w-1/3 h-1/4 rounded-md'  src={fourOfour} alt="Page not found" />
            
        </div>
        <div className='my-4'><p className='text-2xl text-red-600 text-center'>Page Not Found</p></div>
        </div>

        <div className='flex justify-center items-center hover:scale-95 duration-300'><button onClick={handleChange} className='btn text-white btn-primary'>Home Page</button></div>
       </div>
        </div>
    );
};

export default ErrorPage;