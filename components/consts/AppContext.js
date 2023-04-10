import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [favourite, setFavourite] = useState([]);
    const [doctors, setDoctors] = useState([]);
    return (
        <AppContext.Provider value={{ favourite, setFavourite,doctors,setDoctors }}>
            {children}
        </AppContext.Provider>
    );
};