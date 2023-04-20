import React from "react";
import { View, Text, StyleSheet, FlatList, Image ,Button,TouchableOpacity} from "react-native";
import CurrentUser from "../consts/CurrentUser";
import { AntDesign, Feather, MaterialIcons, SimpleLineIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Userpage = ({ navigation }) => {
  const user = CurrentUser.user;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <Text style={styles.heading}> Your Profile</Text>
        </View>
      </View>
      <View style={styles.z2} >
          <TouchableOpacity onPress={() => navigation.navigate("Edit_user")}>
              <MaterialIcons name="mode-edit" size={24} color="white" style={styles.z1}/>
            </TouchableOpacity>
          </View>
      <View style={styles.content}>
        <View style={styles.profile}>
          <Image
            source={require("../assets/Herbal_Medicine_Male_Avatar.png")}
            style={styles.profilePhoto}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>{user.name}</Text>
            {/* <Text style={styles.profileSubtitle}>id:{user.id}</Text> */}
          </View>
        </View>
        <View style={styles.info}>
        <View style={{flexDirection:"row",gap:10}}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email address:</Text>
            <Text style={[styles.infoValue,]}>{user.email}</Text>
          </View>
          {/* <View>
                  <TouchableOpacity onPress={() => ""}>
                    <MaterialIcons name="mode-edit" size={24} color="green"  />
                  </TouchableOpacity>
                </View> */}
              </View>
          <View style={{flexDirection:"row",gap:10}}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <Text style={[styles.infoValue, ]}>{user.phone}</Text>
          </View>
          {/* <View>
                  <TouchableOpacity onPress={() => ""}>
                    <MaterialIcons name="mode-edit" size={24} color="green"  />
                  </TouchableOpacity>
                </View> */}
              </View>
          <View style={{flexDirection:"row",gap:10}}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>address:</Text>
            <Text style={[styles.infoValue, ]}>{user.address}</Text>
          </View>
          {/* <View>
                  <TouchableOpacity onPress={() => ""}>
                    <MaterialIcons name="mode-edit" size={24} color="green"  />
                  </TouchableOpacity>
                </View> */}
              </View>
          {
            user.address_2 ?
            <View style={{flexDirection:"row",gap:10}}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>address 2:</Text>
                <Text style={[styles.infoValue,]}>{(user.address_2)}</Text>
              </View>
                {/* <View>
                  <TouchableOpacity onPress={() => ""}>
                    <MaterialIcons name="mode-edit" size={24} color="green"  />
                  </TouchableOpacity>
                </View> */}
              </View>

               : <></>
          }
          <View style={{flexDirection:"row",gap:10}}>
           <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={[styles.infoValue, ]}>{user.gender}</Text>
          </View>
          {/* <View>
          <TouchableOpacity onPress={() => ""}>
              <MaterialIcons name="mode-edit" size={24} color="green"  />
            </TouchableOpacity>
          </View> */}
          </View>
          <View style={{flexDirection:"row",gap:10}}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={[styles.infoValue, ]}>{user.age} years old</Text>
          </View>
          {/* <View>
          <TouchableOpacity onPress={() => ""}>
              <MaterialIcons name="mode-edit" size={24} color="green"  />
            </TouchableOpacity>
          </View> */}
          </View>
        </View>
      </View>
    </View>
    // <View style={{ flexDirection: "row", gap: 100 }}>
    // <View>
    //   <Text style={styles.infoLabel}>Age:</Text>
    // </View>
    // <View>
    //   <Text style={[styles.infoValue,]}>{user.age} years old</Text>
    // </View>
    // <View>
    //   <TouchableOpacity onPress={() => ""}>
    //     <MaterialIcons name="mode-edit" size={24} color="green" style={styles.z1} />
    //   </TouchableOpacity>
    // </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical:20
  },
  header: {
    flexDirection:"row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    // marginBottom: 20,

  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    

  },
  
  Go_Back: {
    // marginTop:15,
    // // width:"10%",
    // justifyContent: "flex-start",
    // justifyContent: "flex-start",
    width:"10%",
    // left:1
    },
    Go_Back1: {
      // marginTop:15,
      width:"35%",
      // justifyContent: "flex-start",
      // justifyContent: "flex-start",
  
      },
  content: {
    paddingHorizontal: 10,
    flexDirection:"column",
    gap:10
  },
  profile: {
      // backgroundColor: "#ffffff",
      width:"60%",
      flexDirection:"column",
      // height:"50%",
      // marginVertical: 6,
      // margin: 5,
      // padding: 10,
      
    },
  profilePhoto: {
    width: "100%",
    height:"50%",
    borderRadius: 60,
    padding:"50%",
    // marginLeft:"35%"
    marginLeft:"35%",
    marginRight:"25%",
  },
  profileInfo: {
    alignContent:"center",
    alignItems:"center",
    margin:10,
    left:"35%",
    right:"25%"
    // borderWidth:2,
    // borderRadius: 10,
    // backgroundColor: "#ffffff",
    // marginLeft:"55%"
    },
  profileTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileSubtitle: {
    fontSize: 16,
    color: "#555",
  },
  info: {
    // flex:1
    // marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    width:"100%"
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
  },
  z1:{
    width:"7%",
    // height:"35%",
    backgroundColor:"green",
    borderRadius:10,
    left:"90%",
    
  },
  z2:{
    width:"100%",
    // height:"35%",
   

  }
});

export default Userpage;
