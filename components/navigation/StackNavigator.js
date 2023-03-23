import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Home from "../screens/Home";
import User from "../screens/User";
import Favorite from "../screens/Favorite";
import Chat from "../screens/Chat";
import Appointment from "../screens/Appointment";
import Chatbox from "../subcomponents/Chatbox";
import Doctorbage from "../subcomponents/Doctorbage";
import Userpage from "../subcomponents/Userpage";
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
        name="User"
        component={User}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
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
          headerTitle: () => null,
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
        name="Userpage"
        component={Userpage}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => null,
          headerTitle: () => null,
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
      {/* <Stack.Screen
        name="HomeScreen"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
