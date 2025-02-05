import { createContext, useContext, useMemo, useState } from "react";

const initialContext = {auth: false, login: (data: boolean, callback: Function) => {}, logout: () => {}}
const AuthContext = createContext(initialContext);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [auth, setAuth] = useState(false);
   
    
    const login = async (data: boolean, callback: Function) => {
        setAuth(data);   
        callback();     
    }    

    const logout = async () => {
        setAuth(false);        
    }

    const value = useMemo(() => ({
        auth,   
        login,
        logout
    }), [auth]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

    

