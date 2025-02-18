import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import { queryClient } from './useAuthCheck';
import { authLoader } from './util/auth';
import { homePageLoader } from './pages/HomePage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,       
    children: [
      { 
        path: '/login', 
        element: <Login />,
        loader: authLoader 
      },
      { 
        path: '/', 
        element: <HomePage />,  
        loader: homePageLoader
      } 
    ]
  }
]);

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider> 
  );
}

export default App;



