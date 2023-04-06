import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [favourite, setFavourite] = useState([]);

    return (
        <AppContext.Provider value={{ favourite, setFavourite }}>
            {children}
        </AppContext.Provider>
    );
};