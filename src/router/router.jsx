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


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/posts',
        Component: Posts
      },
      {
        path: '/post/:id',
        loader: ({ params }) => fetch(`https://server-forum.vercel.app/post/${params.id}`, {
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
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/forbidden',
        Component: Forbidden
      }
    ]
  },

  {
    path: '/dashboard',
    element: <PrivateRoute> <DashBoardLayout></DashBoardLayout></PrivateRoute>,


    children: [
      {
        index: true,
        Component: DashBoardHome,
      },

      {
        path: 'myProfile',
        Component: MyProfile
      },
      {
        path: 'addPost',
        Component: AddPost
      },
      {
        path: 'myPost',
        Component: MyPost
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



