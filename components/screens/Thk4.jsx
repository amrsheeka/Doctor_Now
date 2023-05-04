
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';


const Thk4 = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, padding: 20, display: "flex" }}>
            <View style={styles.header}>
                <Text style={styles.heading}>Confirmation</Text>
                <AntDesign name="checkcircle" size={120} style={styles.icon} />
            </View>
            <View style={styles.body}>
                <Text numberOfLines={5} style={styles.text}>
                    The doctor has been added successfully.
                </Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("AdminHome")}>
                    <Text style={styles.buttonText}>Thanks</Text>
                </TouchableOpacity>
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
        paddingTop: 15

    },
    body: {
        flex: 3,
        padding: 10
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    text: {
        fontSize: 18,
        lineHeight: 35 * 0.75,
        paddingTop: 35 - (38 * 0.75),
        marginVertical: 20,
    },
    button: {
        fontSize: 18,
        paddingHorizontal: "40%",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#ffffff",
        backgroundColor: "#288771",
        justifyContent: "center",
        height: 50
    },
    buttonText: {
        textAlign: "center",
    },
    icon: {

        color: "#288771",
        padding: 20,

    }
});

export default Thk4;
