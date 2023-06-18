import React, { useState } from "react";
import MapSelect from "../admin/MapSelect";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path, SvgProps } from "react-native-svg";
import { Fontisto } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import Payments from "../Doctor_Page/Payments";
import SignUpScreen from "../screens/SignUpScreen";
import User from "../screens/User";
import Home from "../screens/Home";
import Favorite from "../screens/Favorite";
import Chat from "../screens/Chat";
import Thk2 from "../screens/Thk2";
import Appointment from "../screens/Appointment";
import Appointment2 from "../screens/Appointment2";
import Chatbox from "../subcomponents/Chatbox";
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
import AppointmentHistory from "../subcomponents/AppointmentHistory";
import MapScreen from "../screens/MapScreen";
import Doc_card_appointment from "../subcomponents/Doc_card_appointment";
import Update_patient from "../subcomponents/Update_patient";
import Chatbox_photo from "../subcomponents/Chatbox_photo";
import Thk4 from "../screens/Thk4";
import { useContext } from "react";
import { AppContext } from "../consts/AppContext";
import PricingPlanBadge from "../Doctor_Page/PricingPlanBadge";
import Chat_D from "../Doctor_Page/Chat_D";
const Tab = createBottomTabNavigator();
type Props = {
  barColor: string,
};
const Stack = createStackNavigator();
const TabBg: React.FC<Props> = ({ color = "#FFFFFF", ...props }) => {
  return (
    <Svg width={75} height={61} viewBox="0 0 75 61" {...props}>
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  );
};
const TabBarAdvancedButton: React.FC<Props> = ({ bgColor, ...props }) => {
  const { flag, setFlag } = useContext(AppContext);
  return (
    <View style={styles.cont} pointerEvents="box-none">
      <TabBg color={bgColor} style={styles.background} />
      <TouchableOpacity
        style={[styles.button, flag && styles.button2]}
        onPress={props.onPress}
      >
        <AntDesign name="home" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};
const Homefunc: React.FC<Props> = ({ barColor }) => {
  const { flag, setFlag } = useContext(AppContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => (
        <View style={styles.navigatorContainer}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        tabBarLabelPosition: {},

        tabBarLabelStyle: {
          opacity: 0.0,
        },
        tabBarStyle: {
          // backgroundColor:"#288771",

          // width:"90%",
          showIcon: true,
          backgroundColor: "transparent",
          style: styles.navigator,
          tabStyle: {
            backgroundColor: barColor,
          },
        },
        tabBarItemStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialIcons
              name={focused ? "favorite" : "favorite-border"}
              color={"#288771"}
              size={focused ? 35 : 25}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
              name={focused ? "ios-calendar" : "calendar-sharp"}
              color={"#288771"}
              size={focused ? 35 : 25}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => {
            return <TabBarAdvancedButton bgColor={barColor} {...props} />;
          },
          // tabBarIcon: () => <AntDesign name="home" size={24}  />,
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
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              color={"#288771"}
              size={focused ? 35 : 25}
            />
          ),
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Chatbox"
        component={Chatbox}
        options={{
          headerShown: false,
          tabBarVisible: false,
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
        name="Appointments History"
        component={AppointmentHistory}
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

      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              color={"#288771"}
              size={focused ? 35 : 25}
            />
          ),
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
        name="Payments"
        component={Payments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PricingPlanBadge"
        component={PricingPlanBadge}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat_D"
        component={Chat_D}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chatbox"
        component={Chatbox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chatbox_photo"
        component={Chatbox_photo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export { StackNavigator, AdminStackNavigator, DoctorStackNavigator, Homefunc };
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cont: {
    position: "relative",
    width: 75,
    alignItems: "center",
  },
  navigatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // SHADOW
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
  },

  background: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: "#288771",
  },
  button2: {
    
  },
  buttonIcon: {
    fontSize: 16,
    color: "#F6F7EB",
  },
});
