import axios from "axios";
import qs from "qs";

type Auth = {
    name: string,
    email: string
}

type AuthResponse = {
    authicated?: boolean,
    data?: [],
    ids?: DogIds,
    match?: string;
    error?: {message: string, status: number}
}

type DogIds = {
    next: string,
    resultIds: [],
    total: number
}

type Filter = {
    breeds: [],
    zip: number, 
    sort: string
}

const axiosClient = axios.create({
    baseURL: 'https://frontend-take-home-service.fetch.com',    
    withCredentials: true
  });

export const authenticate = async ({name, email}: Auth) => {
    let authResponse: AuthResponse = {authicated: false};
    try {   
        await axiosClient.post('/auth/login', {
            name: name,
            email: email        
        });
        authResponse.authicated = true; 
    } catch(error: any) {
        authResponse.error = error; 
    }   
    return authResponse;
}

export const logoutUser = async () => {
    let authResponse: AuthResponse = {authicated: false};
    try {   
        await axiosClient.post('/auth/logout');        
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
        authResponse.data = data;
    } catch(error: any) {
        authResponse.error = error;
    }  
    return authResponse;
}

export const getIds = async (filter: Filter) => {
    let authResponse: AuthResponse = {authicated: false};

    try {
        
        const paramData = {breeds: filter.breeds, sort: `breed:${filter.sort}`} as any;
        if(filter.zip > 0) {
            paramData["zipCodes"] = [filter.zip]
        }

        const { data } = await axiosClient.get('/dogs/search', {
        params: paramData,
        paramsSerializer: params => {
            return qs.stringify(params)
        }
        });        
         
        authResponse.ids = data;
    } catch(error: any) {
        authResponse.error = error;
    }  
    return authResponse;
}

export const getDogs = async (resultIds: [] | undefined) => {   
    console.log(resultIds);
    let authResponse: AuthResponse = {authicated: false};
    try {        
        const { data } = await axiosClient.post('/dogs', resultIds);         
        authResponse.data = data;
    } catch(error: any) {
        authResponse.error = error;
    }  
    return authResponse;
}

export const fetchDogs = async (url: string) => {
    let authResponse: AuthResponse = {authicated: false};
    try {        
        const { data } = await axiosClient.get(url);         
        authResponse.ids = data;
    } catch(error: any) {
        authResponse.error = error;
    }  
    return authResponse;
}

export const findMatch = async (ids: string[]) => {
    let authResponse: AuthResponse = {authicated: false};
    try {        
        const { data } = await axiosClient.post('/dogs/match', ids);         
        authResponse.match = data;
    } catch(error: any) {
        authResponse.error = error;
    }  
    return authResponse;
}