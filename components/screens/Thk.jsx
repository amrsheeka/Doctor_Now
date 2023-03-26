
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const Details_user_to_appointment = ({ navigation, route }) => {
    let item = route.params.route.params.item
    // let item = { id: 1, name: 'Dr. John Doe', photo: require('../assets/Herbal_Medicine_Male_Avatar.png') }
    return (
        <View style={{ flex: 1, padding: 20,display:"flex" }}>
            <View style={styles.header}>
                <Text style={styles.text}>Confirmation</Text>
                <AntDesign name="checkcircle" size={120} color="#288771" />
            </View>
            <View style={styles.body}>
                <Text numberOfLines={5}  style={styles.text}>
                    Your appointment booking has successfully completed
                    with {item.name}  and he will massage you soon.
                </Text>
            </View>
            <View style={styles.footer}>
                <Button title="Thanks" color={"#288771"}
                    onPress={() => navigation.navigate("Home")}
                ></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 3,
        padding:10
    },
    footer: {
        flex: 0.5,
        borderRadius: 10,
        elevation: 6,
        borderColor: '#288771',
        marginHorizontal: 4,
        marginVertical: 6,
        paddingHorizontal: 40,
        paddingVertical: 10
    },
    text: {
        fontSize: 18,
        lineHeight: 35 * 0.75,
        paddingTop: 35 - (38 * 0.75),
        marginVertical:20, 
    },
});

export default Details_user_to_appointment;
