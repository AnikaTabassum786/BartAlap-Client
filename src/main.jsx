import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {

  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AnnouncementProvider from './context/AnnouncementProvider.jsx';
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AnnouncementProvider>
        <RouterProvider router={router} />
      </AnnouncementProvider>
      
    </AuthProvider>  
    </QueryClientProvider>
  </StrictMode>,
)
