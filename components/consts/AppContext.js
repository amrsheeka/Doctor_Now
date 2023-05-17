import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [favourite, setFavourite] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const [curruser, setCurrUser] = useState({});
    const [night, setNight] = useState(false);
    const [doctor, setDoctor] = useState({});
    const [type, setType] = useState("appointments");
    const [schedules, setSchedules] = useState([]);
    const [flag, setFlag] = useState(false);
    return (
        <AppContext.Provider value={{ 
            favourite, setFavourite,
            doctors,setDoctors,
            appointments,setAppointments,
            timeList, setTimeList,
            curruser, setCurrUser,
            night,setNight,
            type,setType,
            doctor,setDoctor,
            schedules,setSchedules
        }}>
            {children}
        </AppContext.Provider>
    );
};