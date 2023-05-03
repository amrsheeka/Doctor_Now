import React, { useState } from "react";
import MapSelect from "../admin/MapSelect";
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
import Thk2 from "../screens/Thk2";
import Appointment from "../screens/Appointment";
import Appointment2 from "../screens/Appointment2";
import Chatbox from "../subcomponents/Chatbox";
import Payment from "../subcomponents/Payments";
import Edit_user from "../subcomponents/Edit_user";
import Doctorbage from "../subcomponents/Doctorbage";
import AllDoctors from "../screens/AllDoctors";
import Userpage from "../subcomponents/Userpage";
import AppointmentConfirmation from "../screens/AppointmentConfirmation";
import Details_user_to_appointment from "../screens/Details_user_to_appointment";
import Thk from "../screens/Thk";
import Thk3 from "../screens/Thk3";
import All_details_to_appointment from "../subcomponents/All_details_to_appointment";
import CurrentUser from "../consts/CurrentUser";
import AdminHome from "../admin/AdminHome";
import AddDoctor from "../admin/AddDoctor";
import AppointmentList from "../admin/AppointmentList";
import Sign_UP_2th_Screen from "../screens/Sign_UP_2th_Screen";
import Info from "../Doctor_Page/info";
import MapScreen from "../screens/MapScreen";
import Doc_card_appointment from "../subcomponents/doc_card_appointment";
import Update_patient from "../subcomponents/Update_patient";
import Chatbox_photo from "../subcomponents/Chatbox_photo";
import Thk4 from "../screens/Thk4";
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const Homefunc = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
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
        name="Appointment2"
        component={Appointment2}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
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
        name="All_details_to_appointment"
        component={All_details_to_appointment}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Thk2"
        component={Thk2}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Thk3"
        component={Thk3}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Doc_card_appointment"
        component={Doc_card_appointment}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Update_patient"
        component={Update_patient}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          // headerShown: false,
          // tabBarVisible: false,
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

      <Stack.Screen
        name="Chatbox"
        component={Chatbox}
        options={{
          //headerShown: false,
          //tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />

      <Stack.Screen
        name="Chatbox_photo"
        component={Chatbox_photo}
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
       <Stack.Screen
        name="Edit_user"
        component={Edit_user}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          headerTitle: () => null,
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign_UP_2th_Screen"
        component={Sign_UP_2th_Screen}
        options={{
          headerShown: false,
        }}
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
      <Stack.Screen
        name="AdminStackNavigator"
        component={AdminStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DoctorStackNavigator"
        component={DoctorStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllDoctors"
        component={AllDoctors}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDoctor"
        component={AddDoctor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppointmentList"
        component={AppointmentList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Appointment2"
        component={Appointment2}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Update_patient"
        component={Update_patient}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
        }}
      />
      <Stack.Screen
        name="MapSelect"
        component={MapSelect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Thk4"
        component={Thk4}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    
  );
};

const DoctorStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Info}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export {
  StackNavigator,
  AdminStackNavigator,
  DoctorStackNavigator,
  Homefunc,
};
