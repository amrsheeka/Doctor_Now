import React from "react";

import { View, Text, StyleSheet,TouchableOpacity,} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";
import Icon4 from "react-native-vector-icons/FontAwesome5";


const Clinic_Info = ({nameClinic, numberClinic, exmain, follow_up, duration, nameAssistant, numberAssistant, fun1, fun2, fun3}) => {
    const main_color = "#288771";
    return (
      <View>
        <TouchableOpacity onPress={fun1}>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginTop: 5,
              },
            ]}
          >
            <Icon2
              name={"info"}
              size={25}
              color={main_color}
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Clinic Name and Number{" "}
            </Text>
            <Icon name={"edit"} size={25} color={main_color} />
          </View>

          {nameClinic !== "" && numberClinic !== "" ? (
            <View style={[styles.content, { paddingVertical: 15 }]}>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                }}
              >
                {nameClinic}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingHorizontal: 20,
                }}
              >
                {numberClinic}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>

        {/* //////////////////////////////////////////////////////////////////// */}

        <TouchableOpacity>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              },
            ]}
          >
            <Icon3
              name={"photograph"}
              size={25}
              color={main_color}
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Clinic Photos{" "}
            </Text>
            <Icon name={"edit"} size={25} color = {main_color} />
          </View>
        </TouchableOpacity>

        {/* /////////////////////////////////////////////////////////////// */}

        <TouchableOpacity onPress={fun2}>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
              },
            ]}
          >
            <Icon4
              name={"file-invoice-dollar"}
              size={25}
              color={main_color}
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Exmination and Follow-up{" "}
            </Text>
            <Icon name={"edit"} size={25} color={main_color} />
          </View>
          {exmain !== "" && follow_up !== "" ? (
            <View style={[styles.content, { paddingVertical: 15 }]}>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                    width: "80%",
                  }}
                >
                  {" "}
                  Exmaination Fees{" "}
                </Text>
                <Text>{exmain} EGP</Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 20,
                    paddingBottom: 10,
                    width: "80%",
                  }}
                >
                  {" "}
                  Follow-up Fees{" "}
                </Text>
                <Text> {follow_up} EGP </Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    paddingHorizontal: 20,
                    width: "80%",
                  }}
                >
                  {" "}
                  Follow-up Duration{" "}
                </Text>
                <Text> {duration} Days </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>

        {/* ////////////////////////////////////////////////////////////////////////////// */}

        <TouchableOpacity>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginVertical: 5,
              },
            ]}
          >
            <Icon2
              name={"location-pin"}
              size={25}
              color={main_color}
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Clinic Address{" "}
            </Text>
            <Icon name={"edit"} size={25} color={main_color} />
          </View>
        </TouchableOpacity>

        {/* ///////////////////////////////////////////////////////////// */}

        <TouchableOpacity onPress={fun3}>
          <View
            style={[
              styles.content,
              {
                flexDirection: "row",
                paddingVertical: 15,
                marginTop: 5,
              },
            ]}
          >
            <Icon2
              name={"info"}
              size={25}
              color={main_color}
              style={{ width: "7%" }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                paddingHorizontal: 5,
                width: "85%",
              }}
            >
              {" "}
              Assistant Name and Number{" "}
            </Text>
            <Icon name={"edit"} size={25} color={main_color} />
          </View>
          {nameAssistant !== "" &&numberAssistant !== "" ? (
            <View
              style={[styles.content, { paddingVertical: 15, marginDown: 10 }]}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                }}
              >
                {nameAssistant}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  paddingHorizontal: 20,
                }}
              >
                {numberAssistant}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({ 
    content: {
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#f7eceb",
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      padding: 7,
  
      // marginBottom: 3,
      marginHorizontal: 3,
    },
  });

  export default Clinic_Info;