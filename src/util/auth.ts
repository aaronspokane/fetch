import { redirect } from "react-router-dom";

export const getAuth = () => {
    return localStorage.getItem('fetchAppLoggedIn');
}

export const logOutUser = () => {
    return localStorage.removeItem('fetchAppLoggedIn');
}

export const setLogin = () => {
    localStorage.setItem('fetchAppLoggedIn',  JSON.stringify({timeStamp: new Date()}));    
}   

export const Authenticated = () => {
    let authenticated = false;
    const endTimestamp = new Date();

    try {
        const auth = getAuth();
        if(auth){  
            const storedAuth = JSON.parse(auth);            
            const dtdiff = endTimestamp.getTime() - (new Date(storedAuth.timeStamp)).getTime();

            if(Math.round(dtdiff / (1000 * 60)) <= 59)
            {
                authenticated = true;
            }
        }        
    }
    catch(e) {
        console.log(`exception in authenticated ${e}`);
    }

    return authenticated;
}

export const authLoader = () => {      
    if(Authenticated())        
        return redirect("/");
    else if(getAuth()) 
        logOutUser();      

    return null;   
}