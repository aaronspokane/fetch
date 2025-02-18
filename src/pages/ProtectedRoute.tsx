import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
    console.log('got here...');
    //const { checkAuth } = useAuth();
    const navigate = useNavigate();
   
   // if (!checkAuth()) {
        //return <Navigate to="/login" />;
    //    console.log('trying to redirect...');
    //    navigate('/login');
    //}
 
    return children;  
    
};