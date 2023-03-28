import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { StackNavigator, StackNavigator2 } from "./components/navigation/StackNavigator";
import CurrentUser from "./components/consts/CurrentUser";
import { getDoctors } from "./database/Doctors";
import { getCurrentUser } from "./database/Users";

export default function App() {
  useEffect(() => {
    CurrentUser.user = getCurrentUser();
    getDoctors();
  });

  if (Object.keys(CurrentUser.user).length == 0
  ) return (

    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
  else
    return (

      <NavigationContainer>
        <StackNavigator2 />
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
