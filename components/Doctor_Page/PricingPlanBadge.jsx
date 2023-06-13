import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons} from "@expo/vector-icons";

const PricingPlanBadge = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const getPlanInfo = (plan) => {
    switch (plan) {
      case 'basic':
        return 'Basic Plan: $499 gives you 5 patients';
      case 'premium':
        return 'Premium Plan: $999 gives you 12 patients';
      case 'pro':
        return 'Pro Plan: $1,249 gives you 20 patients';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View  style={styles.Go_Back1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.Go_Back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      <Text style={styles.heading}>Choose a Pricing Plan</Text>
      <TouchableOpacity
        style={[
          styles.planButton,
          selectedPlan === 'basic' && styles.selectedPlan,
        ]}
        onPress={() => handlePlanSelect('basic')}
      >
        <Text style={styles.planText}>Basic Plan</Text>
        <Text style={styles.planDetails}>{getPlanInfo("basic")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.planButton,
          selectedPlan === 'premium' && styles.selectedPlan,
        ]}
        onPress={() => handlePlanSelect('premium')}
      >
        <Text style={styles.planText}>Premium Plan</Text>
        <Text style={styles.planDetails}>{getPlanInfo("premium")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.planButton,
          selectedPlan === 'pro' && styles.selectedPlan,
        ]}
        onPress={() => handlePlanSelect('pro')}
      >
        <Text style={styles.planText}>Pro Plan</Text>
        <Text style={styles.planDetails}>{getPlanInfo("pro")}</Text>
      </TouchableOpacity>
      {selectedPlan && (
        <View style={styles.selectedPlanContainer}>
          <Text style={styles.selectedPlanText}>
            Selected Plan: {selectedPlan}
          </Text>
          <Text style={styles.selectedPlanInfo}>{getPlanInfo(selectedPlan)}</Text>
          <TouchableOpacity style={styles.payButton} onPress={()=>{navigation.navigate("Payments",{selectedPlan})}}>
            <Text style={styles.payButtonText}>Go to Pay</Text>
          </TouchableOpacity>
        </View>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  planButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 2,
  },
  selectedPlan: {
    backgroundColor: '#4caf50',
    borderWidth: 0,
    elevation: 4,
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  planDetails: {
    fontSize: 16,
    color: '#777',
  },
  selectedPlanContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  selectedPlanText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  selectedPlanInfo: {
    fontSize: 16,
    color: '#777',
  },
  payButton: {
    backgroundColor: "#288771",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PricingPlanBadge;
