import React,{useEffect} from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./components/navigation/StackNavigator";
import { getDoctors } from "./database/Doctors";

export default function App() {
  useEffect(() => {
    getDoctors();
  });
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
