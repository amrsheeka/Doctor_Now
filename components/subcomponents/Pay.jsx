import { PaymentSheet, StripeProvider, usePaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { View, Text, StyleSheet, FlatList, Image ,Button,TouchableOpacity,TextInput} from "react-native";
import React, { useState,useEffect } from "react";
const  Pay=()=> {
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();
  const [loading, setLoading] = useState(false);
  //const API_URL ="https://buy.stripe.com/test_8wM02Odq93FA4IU8ww";
  const fetchPaymentSheetParams = async () => {
    // const response = await fetch(`${API_URL}/payment-sheet`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    const paymentIntent ="";
    const ephemeralKey="3";
    const customer="1";

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };


  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <StripeProvider
      publishableKey="pk_test_51N9sDqFEGJdDCRMjjHLAwViTJxczP3BXs8LoOnKlRtwXP7pHzLGCQui556mgv0E8A6nKZfYA76MZrkhUZQEckoJA00nEdv5EqZ"
      urlScheme="https://buy.stripe.com/test_8wM02Odq93FA4IU8ww" // required for 3D Secure and bank redirects
    >
      <Button
        variant="primary"
        //disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </StripeProvider>
  );
}
export default Pay;