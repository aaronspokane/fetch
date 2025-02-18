import React, { createContext, useMemo, useState, Dispatch, SetStateAction, useContext, useCallback } from "react";
import FindMatch from "./FindMatch";

type Dog = {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

type Paginate = {
    next: string;
    total: number;
}

const initialPageContext = { 
    dogs: [], 
    paginate: {next: '', total: 0}, 
    setData: (dogs?: [], pageData?: Paginate) => {}, 
    updateMatch: (id: string, addRemove: string) => {}, 
    match: Array<string>(),
    clearMatches: () => {}
};

const PageContainerContext = createContext(initialPageContext);

const PageContainer = ({children}: any) => {      
    
    const [dogs, setDogs] = useState([]);    
    const [paginate, setPaginate] =  useState<Paginate>({next: '', total: 0});
    const [match, setMatch] = useState<string[]>([]);

    const setData = (dogs?: [], pageData?: Paginate) => {       

        if(dogs)
            setDogs(dogs);

        if(pageData)
            setPaginate(pageData);
    }

    const updateMatch =   (id: string, addRemove: string) => {
        if(addRemove === 'remove') {
            const newArray = match?.filter(x => x !== id);
            setMatch(newArray);    
        } else {
            if(!match.includes(id))
                setMatch([...match, id]);            
        }
    }

    const clearMatches = () => {
        setMatch([]); 
    }   

     const contextValue = {
        dogs,
        paginate,
        setData,
        updateMatch,
        match,
        clearMatches
    };   

    return (
        <>  
        <PageContainerContext.Provider value={contextValue}>    
          {children}   
          {
            match?.length > 0 && 
                <FindMatch />
          }
        </PageContainerContext.Provider>           
        </>
    )
}

export const useDogsContext = () => {
   const ctx =  useContext(PageContainerContext);

   if(!ctx)
    throw Error("Error creating context");

   return ctx;
}

export default PageContainer;