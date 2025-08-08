// import React from 'react';
// import useUserRole from '../../hooks/useUserRole';
// import MyProfile from '../MyProfile/MyProfile';
// import AdminProfile from '../AdminProfile/AdminProfile';


// const DashBoardHome = () => {
//     const {role,roleLoading} = useUserRole();

//     if(roleLoading){
//        return '...loading'
//     }

//     if(role === 'user'){
//         return <MyProfile></MyProfile>
//     }

//     else if(role === 'admin'){
//         return <AdminProfile></AdminProfile>
//     }

//     else{
//         return 'Forbidden'
//     }
   
// };

// export default DashBoardHome;



import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserRole from '../../hooks/useUserRole';


const DashBoardHome = () => {
  const navigate = useNavigate();
  const { role, roleLoading } = useUserRole();

  useEffect(() => {
    if (!roleLoading) {
      if (role === 'admin') {
        navigate('/dashboard/adminProfile');
      } else {
        navigate('/dashboard/myProfile');
      }
    }
  }, [role, roleLoading, navigate]);

  return null;
};

export default DashBoardHome;
