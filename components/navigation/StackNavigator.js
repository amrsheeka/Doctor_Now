import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import User from "../screens/User";
import Home from "../screens/Home";
import Favorite from "../screens/Favorite";
import Chat from "../screens/Chat";
import Appointment from "../screens/Appointment";
import Chatbox from "../subcomponents/Chatbox";
import Doctorbage from "../subcomponents/Doctorbage";
import AllDoctors from "../screens/AllDoctors";
import Userpage from "../subcomponents/Userpage";
import AppointmentConfirmation from "../screens/AppointmentConfirmation";
import Details_user_to_appointment from "../screens/Details_user_to_appointment";
import Thk from "../screens/Thk";
import CurrentUser from "../consts/CurrentUser";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const Homefunc = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
          headerShown: false,
        }}
      />
      
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="favorite-border" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarIcon: () => <Fontisto name="date" size={24} color="black" />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Thk"
        component={Thk}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,

        }}
      />
      <Tab.Screen
        name="Details_user_to_appointment"
        component={Details_user_to_appointment}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,

        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />

      
      <Tab.Screen
        name="Chatbox"
        component={Chatbox}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,

        }}

      />
      <Tab.Screen
        name="Doctorbage"
        component={Doctorbage}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          headerTitle: () => null,

        }}
      />
      <Tab.Screen
        name="AppointmentConfirmation"
        component={AppointmentConfirmation}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="AllDoctors"
        component={AllDoctors}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="Userpage"
        component={Userpage}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          headerTitle: () => null,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
const StackNavigator2 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homefunc"
        component={Homefunc}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}
const StackNavigator = () => {

  console.log(CurrentUser.user);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Homefunc"
        component={Homefunc}
        options={{
          headerShown: false,
        }}
      />


    </Stack.Navigator>
  );

};

export {StackNavigator,StackNavigator2};
