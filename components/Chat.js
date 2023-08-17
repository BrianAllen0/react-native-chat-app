import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";

const Chat = ({ route, navigation }) => {
    const { name } = route.params;
    const { backgroundColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name, headerStyle: { backgroundColor: backgroundColor }, headerTintColor: "white" });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <Text style={styles.mainText}>Welcome to chat!</Text>
            <Text style={styles.mainText}>(We're still building it)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainText: {
        color: "white",
        fontFamily: "Poppins",
    },
});

export default Chat;
