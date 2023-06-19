import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favourite, setFavourite] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointments_History, setAppointments_History] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [curruser, setCurrUser] = useState({});
  const [night, setNight] = useState(false);
  const [doctor, setDoctor] = useState({});
  const [type, setType] = useState("appointments");
  const [schedules, setSchedules] = useState([]);
  const [rev, setRev] = useState([]);
  const [Days, setDays] = useState([]);
  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);
  const [numberOfPatients, setNumberOfPatients] = useState([]);
  const [flag, setFlag] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [f, setF] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentIsExist, setCommentIsExist] = useState(false);
  const [rateNumber, setRateNumber] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [ Apps_doc_user, setApps_doc_user ] = useState([]);

  return (
    <AppContext.Provider
      value={{
        Apps_doc_user, setApps_doc_user,
        commentIsExist, setCommentIsExist,
        commentText, setCommentText,
        rateNumber, setRateNumber,
        comments, setComments,
        f, setF,
        flag, setFlag,
        startTime, setStartTime,
        endTime, setEndTime,
        numberOfPatients, setNumberOfPatients,
        favourite,
        setFavourite,
        doctors,
        setDoctors,
        appointments,
        setAppointments,
        timeList,
        setTimeList,
        curruser,
        setCurrUser,
        night,
        setNight,
        type,
        setType,
        doctor,
        setDoctor,
        schedules,
        setSchedules,
        rev,
        setRev,
        appointments_History,
        setAppointments_History,
        Days,
        setDays,
        refreshing,
        setRefreshing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
