import { useEffect, useState } from 'react';

import classes from './Pages.module.css';
import { authenticate } from '../util/http';
import { useAuth } from "../hooks/useAuth";
import { notify } from './RootLayout';
import { useNavigate } from 'react-router-dom';

const Login = () => { 

    const [authInfo, setAuthInfo] = useState({
        username: "",
        password: "",
        valid: false
    });    
    
    const { login } = useAuth()
    const navigate = useNavigate();

    const hadleChange = (event: any) => {
        setAuthInfo((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = async (event: any) => {             
        event.preventDefault();
        if(isValid()) {
            const auth = await authenticate(authInfo);
            if(auth.authicated) {
                login(true, () => navigate('/'));                
            } else {
                notify(false, auth.error?.message as string);
            }
        } else {
            notify(false, "Name or password is invalid!");
        }
    };

    const isValid = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(authInfo.password) && authInfo.username.length > 0;
    } 

    return (
        <form className={classes.item} onSubmit={handleSubmit}>   
            <h2>Login</h2>            
            <input value={authInfo.username} onChange={hadleChange} name="username" width={400} />
            <input value={authInfo.password} onChange={hadleChange} name="password" width={400} />
                        
            <p className={classes.formActions}>                    
                <input type='button' value='Reset'  />  
                <input type='submit' value="Login" />
            </p>                
        </form>
    )
};

export default Login;