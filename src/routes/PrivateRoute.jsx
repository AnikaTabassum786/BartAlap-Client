import React from 'react';

import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {

    const {user,loading} = useAuth()
    const location = useLocation();

    if(loading){
        return <div className='flex justify-center h-[50vh]'><span className="loading loading-dots loading-xl"></span></div>
    }

    if(!user){
       return <Navigate state={{from: location.pathname}} to='/login'></Navigate>
    }
    
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;