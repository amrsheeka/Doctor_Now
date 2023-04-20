import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import {
  StackNavigator,
  StackNavigator2,
  AdminStackNavigator,
  DoctorStackNavigator,
} from "./components/navigation/StackNavigator";
import CurrentUser from "./components/consts/CurrentUser";
import { getDoctors } from "./database/Doctors";
import { getCurrentUser } from "./database/Users";
import Doctor from "./components/consts/Doctor";
import { AppContext } from "./components/consts/AppContext";
export default function Main() {
  const [currentUser, setCurrentUser] = useState(null);
  const {doctors, setDoctors} = useContext(AppContext);
  
  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
      console.log(user);
    }
    async function fetchDoctors() {
      const doc = await getDoctors();
      Doctor.doctors = doc;
      //console.log(doc);
      setDoctors(doc);
    }
    fetchUser();
    fetchDoctors();
  }, []);


    // return (
    //   <NavigationContainer>
    //     <DoctorStackNavigator />
    //   </NavigationContainer>
    // );

  if (currentUser == null) {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  } else if (currentUser.is_admin == "yes") {
    return (
      <NavigationContainer>
        <AdminStackNavigator />
      </NavigationContainer>
    );

  }
  else if (currentUser.is_doctor == "yes") {
    return (
      <NavigationContainer>
        <DoctorStackNavigator />
      </NavigationContainer>
    );
    
  }
   else {
    return (
        <NavigationContainer>
          <StackNavigator2 />
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
