import React, { createContext, useContext, useMemo, useState, Dispatch, useCallback } from "react";
import { LoadingOverlay } from '@achmadk/react-loading-overlay';

const initialContext = {setActiveState: (value: boolean) => {}}
const LoaderContext = createContext(initialContext);

export const LoaderProvider = ({children}: any) => {   

    const [active, setActive] = useState<boolean>(false);

    const setActiveState = useCallback((value: boolean) => {
        setActive(value);               
    }, []);

    return (
        <LoaderContext.Provider value={{setActiveState}}>
            <LoadingOverlay
                active={active}
                spinner
                text='Loading...'
                styles={{
                    overlay: (base) => ({
                      ...base,
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      overflow: 'auto', 
                      color: '#fab833',                     
                    })
                  }}       
                >
                 {children}
            </LoadingOverlay>
        </LoaderContext.Provider>
    )
}

export const useLoaderContext = () => {
    const ctx = useContext(LoaderContext);

    if(!ctx)
        throw Error("Error creating context");

    return ctx;
}

    

