import { useEffect, useState } from "react";
import { getBreeds } from '../util/http';
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {

    const [breeds, setBreeds] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        const getDogBreeds = async () => {
            const response = await getBreeds();   
            if(response.authicated && !response.error) {
                console.log(response.breeds);
            } else {
                logout();
            }
        }

        getDogBreeds();
     
    }, [])

    return (
        <>
           Home
        </>
    )
}

export default HomePage;