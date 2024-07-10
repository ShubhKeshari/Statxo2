import { createContext, useState } from "react";

export const FetchContext = createContext();

export const FetchContextProvider = ({children})=>{
    const [shouldFetch,setShouldFetch] = useState(false);
    return (
        <FetchContext.Provider value={{shouldFetch,setShouldFetch}}>
            {children}
        </FetchContext.Provider>
    )
}