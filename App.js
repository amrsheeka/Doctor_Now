import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import {
  StackNavigator,
  StackNavigator2,
  AdminStackNavigator,
} from "./components/navigation/StackNavigator";
import CurrentUser from "./components/consts/CurrentUser";
import { getDoctors } from "./database/Doctors";
import { getCurrentUser } from "./database/Users";
import Doctor from "./components/consts/Doctor";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
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
  } else {
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
