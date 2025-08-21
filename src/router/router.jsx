import React from 'react';
import {
  createBrowserRouter,

} from "react-router";
import RootLayout from '../Layouts/RootLayout';
import Home from '../pages/Home/Home';
import Membership from '../pages/Membership/Membership';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
// import MyProfile from '../pages/MyProfile/MyProfile';
import DashBoardLayout from '../Layouts/DashboardLayout';
import AddPost from '../pages/AddPost/AddPost';
import MyPost from '../pages/MyPost/MyPost';
import PrivateRoute from '../routes/PrivateRoute';
import Posts from '../pages/Posts/Posts';
import PostDetails from '../pages/PostDetails/PostDetails';
import MyProfile from '../pages/MyProfile/MyProfile';
import AdminRoute from '../routes/AdminRoute';
import AdminProfile from '../pages/AdminProfile/AdminProfile';
import DashBoardHome from '../pages/Dashboard/DashboardHome';
import ManageUsers from '../pages/ManageUsers/ManageUsers';
import ReportedComments from '../pages/ReportedComments/ReportedComments';
import MakeAnnouncement from '../pages/MakeAnnouncement/MakeAnnouncement';
import Forbidden from '../pages/Forbidden/Forbidden';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import AllPost from '../pages/AllPost/AllPost';
import Comments from '../pages/Comments/Comments';



export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
       element:<Home></Home>
      },
      
      {
        path: '/all-posts',
        element: <AllPost></AllPost>
      },
      {
        path: '/comments',
        element: <Comments></Comments>
      },
      {
        path: '/posts',
        element:<Posts></Posts>
      },
      {
        path: '/post/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/post/${params.id}`, {
          credentials: 'include',
        }),
        element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>
      },

      {
        path: '/membership',
        element: <PrivateRoute><Membership></Membership></PrivateRoute>
      },
      {
        path: '/login',
        element:<Login></Login>
      },
      {
        path: '/register',
        element:<Register></Register>
      },
      {
        path: '/forbidden',
        element:<Forbidden></Forbidden>
      }
    ]
  },

  {
    path: '/dashboard',
    element: <PrivateRoute> <DashBoardLayout></DashBoardLayout></PrivateRoute>,


    children: [
      {
        index: true,
        element:<DashBoardHome></DashBoardHome>
      },

      {
        path: 'myProfile',
        element:<MyProfile></MyProfile>
      },
      {
        path: 'addPost',
        element:<AddPost></AddPost>
      },
      {
        path: 'myPost',
        element:<MyPost></MyPost>
      },
      {
        path: 'adminProfile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'reportComments',
        element: <AdminRoute><ReportedComments></ReportedComments></AdminRoute>
      },
      {
        path: 'makeAnnouncement',
        element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
      }

    ]
  }
]);



