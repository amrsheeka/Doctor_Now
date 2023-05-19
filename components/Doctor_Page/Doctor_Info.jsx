import React from "react";

import { View, Text, StyleSheet,TouchableOpacity,} from "react-native";



import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Fontisto";




const Doctor_Info = ({desc ,fun1}) => {
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
              About the Doctor{" "}
            </Text>
            <Icon name={"edit"} size={25} color={main_color} />
          </View>

          {desc !== "" ? (
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
                  {desc}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>

        {/* ///////////////////////////////////////////// */}

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
              name={"graduation-cap"}
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
              Education{" "}
            </Text>
            <Icon name={"edit"} size={25} color={main_color} />
          </View>
        </TouchableOpacity>

        {/* /////////////////////////////////////////////////////////////////// */}

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
              name={"world"}
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
              Spoken Languages{" "}
            </Text>
            <Icon name={"edit"} size={25} color="#288759" />
          </View>
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


  export default Doctor_Info;