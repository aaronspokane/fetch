import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();       
    };

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li><NavLink to="/" className={(isActive) => isActive ? classes.active : undefined} end >Home</NavLink></li>
                    <li><NavLink to="/login" className={(isActive) => isActive ? classes.active : undefined}>Login</NavLink></li>
                </ul>
            </nav>
        </header>
    )
};

export default MainNavigation;