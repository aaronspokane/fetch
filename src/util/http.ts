import axios from "axios";

type Auth = {
    username: string,
    password: string
}

type AuthResponse = {
    authicated: boolean,
    breeds?: [],
    error?: {message: string, status: number}
}

const axiosClient = axios.create({
    baseURL: 'https://frontend-take-home-service.fetch.com',    
    withCredentials: true
  });

export const authenticate = async ({username, password}: Auth) => {
    let authResponse: AuthResponse = {authicated: false};
    try {   
        const response = await axiosClient.post('/auth/login', {
            name: username,
            email: password        
        });
        authResponse.authicated = true; 
    } catch(error: any) {
        authResponse.error = error; 
    }   
    return authResponse;
}

export const getBreeds = async () => {  
    let authResponse: AuthResponse = {authicated: false};
    try {
        const { data } = await axiosClient.get('/dogs/breeds'); 
        authResponse.authicated = true;   
        authResponse.breeds = data;
    } catch(error: any) {
        authResponse.error = error;
    }  
    return authResponse;
}