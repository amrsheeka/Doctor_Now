import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [favourite, setFavourite] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const [curruser, setCurrUser] = useState({});
    const [night, setNight] = useState(false);
    const [type, setType] = useState("appointments");
    return (
        <AppContext.Provider value={{ 
            favourite, setFavourite,
            doctors,setDoctors,
            appointments,setAppointments,
            timeList, setTimeList,
            curruser, setCurrUser,
            night,setNight,
            type,setType
        }}>
            {children}
        </AppContext.Provider>
    );
};