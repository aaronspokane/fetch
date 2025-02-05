import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './hooks/useAuth';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import { queryClient } from './useAuthCheck';
import { ProtectedRoute } from './pages/ProtectedRoute';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <Login /> },
      { 
        path: '/', 
        element: <ProtectedRoute><HomePage /></ProtectedRoute>                 
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
