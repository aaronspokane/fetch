import { NavLink, useNavigate } from "react-router-dom";
import classes from './MainNavigation.module.css';
import { logoutUser } from '../util/http';
import { notify } from '../pages/RootLayout';
import { logOutUser, Authenticated } from "../util/auth";

const MainNavigation = () => {
    const navigate = useNavigate();    

    const isAuthenticated = Authenticated();
    
    const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();       
        const auth = await logoutUser();   

        if(auth.error) 
            notify(false, auth.error.message);
      
            logOutUser();
            navigate('/login');          
    };

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                       <NavLink to="/" className={(isActive) => isActive ? classes.active : undefined} end >Home</NavLink> 
                    </li>                    
                    <li>
                        {
                            isAuthenticated ? <NavLink to="" onClick={handleClick} className={(isActive) => isActive ? classes.active : undefined}>Logout</NavLink> : undefined
                        }                        
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default MainNavigation;
