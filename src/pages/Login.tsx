import { useEffect, useRef, useState } from 'react';

import { authenticate } from '../util/http';
import { notify } from './RootLayout';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../util/auth';
import { useLoaderContext } from '../hooks/useLoader';
import classes from './Login.module.css';

const Login = () => { 

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);    
  
    const navigate = useNavigate();
    const { setActiveState } = useLoaderContext()
    console.log('login rendered...');    

    const handleClick = async (event: any) => {             
        event.preventDefault();
        setActiveState(true);
        const name = nameRef.current?.value ?? "";
        const email = emailRef.current?.value ?? "";        

        if(isValid(name, email)) {
            const auth = await authenticate({name, email});
            if(auth.authicated) {
                setLogin();                   
                setTimeout(() => {
                    setActiveState(false); 
                    navigate('/');
                }, 500);    
            } else {
                notify(false, auth.error?.message as string);
            }
        } else {
            notify(false, "Name or password is invalid!");
            setActiveState(false);
        }
    };

    const isValid = (name: string, email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email) && name.trim().length > 0;
    } 

    return (
        <form className={classes.form}>   
            <h1>Login</h1>            
            <p>
                <label htmlFor="username">Name</label>
                <input ref={nameRef} name="name" required />
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input ref={emailRef} name="email" required />
            </p>
            <div className={classes.actions} onClick={handleClick}>              
                <button>Login</button>                   
            </div>                         
        </form>
    )
};

export default Login;