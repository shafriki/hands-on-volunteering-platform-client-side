import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './providers/AuthProvider.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}> 
        <RouterProvider router={router} />
    </QueryClientProvider> 
    </AuthProvider>
  </React.StrictMode>
)
