import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon2 from "react-native-vector-icons/Entypo";
const PricingPlanBadge = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const getPlanInfo = (plan) => {
    switch (plan) {
      case "basic":
        return "499 EGP gives you 5 patients";
      case "premium":
        return "999 EGP gives you 12 patients";
      case "pro":
        return "1,249 EGP gives you 20 patients";
      default:
        return "";
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={[styles.header, { flexDirection: "row" }]}>
        <Icon2
          name={"arrow-left"}
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
          style={{ width: "7%", marginHorizontal: 10 }}
        />
        <Text style={styles.label}> Subscription Packages </Text>
      </View>

      <ScrollView>
        <View style={{ marginVertical: 10, alignSelf: "center" }}>
          <Image
            source={require("../assets/payment.png")}
            style={{ height: 250, width: 250 }}
          />
        </View>
        <Text style={styles.heading}>Choose a Payment Plan</Text>
        <TouchableOpacity
          style={[
            styles.planButton,
            selectedPlan === "basic" && styles.selectedPlan,
          ]}
          onPress={() => handlePlanSelect("basic")}
        >
          <Text style={styles.planText}>Basic Plan</Text>
          <Text style={styles.planDetails}>{getPlanInfo("basic")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.planButton,
            selectedPlan === "premium" && styles.selectedPlan,
          ]}
          onPress={() => handlePlanSelect("premium")}
        >
          <Text style={styles.planText}>Premium Plan</Text>
          <Text style={styles.planDetails}>{getPlanInfo("premium")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.planButton,
            selectedPlan === "pro" && styles.selectedPlan,
          ]}
          onPress={() => handlePlanSelect("pro")}
        >
          <Text style={styles.planText}>Pro Plan</Text>
          <Text style={styles.planDetails}>{getPlanInfo("pro")}</Text>
        </TouchableOpacity>
        
          <View style={styles.selectedPlanContainer}>
            <TouchableOpacity
              style={[styles.payButton , {  backgroundColor: selectedPlan? "#288771" : 'grey',}]}
              disabled = {!selectedPlan}
              onPress={() => {
                navigation.navigate("Payments", { selectedPlan });
              }}
            >
              <Text style={styles.payButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#288771",
    width: "100%",
    height: "12%",
    // alignItems: "center",
    paddingTop: "12%",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: "white",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    alignSelf: "center",
    color: "#333",
  },
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
  planButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    // width: "100%",
    backgroundColor: "#fff",
    elevation: 2,
    marginHorizontal: 7,
  },
  selectedPlan: {
    backgroundColor: "#4caf50",
    borderWidth: 0,
    elevation: 4,
  },
  planText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf: "center",
    color: "#333",
  },
  planDetails: {
    fontSize: 16,
    alignSelf: "center",
    color: "#777",
  },
  selectedPlanContainer: {
    marginVertical: 24,
    alignItems: "center",
  },
  selectedPlanText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  selectedPlanInfo: {
    fontSize: 16,
    color: "#777",
  },
  payButton: {
    borderRadius: 15,
    paddingVertical: 12,
    width: '90%',
    // paddingHorizontal: 24,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: "bold",
  },
});

export default PricingPlanBadge;
