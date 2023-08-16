import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from "react-native";

const Start = ({ navigation }) => {
    const [name, setName] = useState("");

    return (
        <View style={styles.container}>
            <ImageBackground style={[styles.container, styles.backgroundImage]} source={require("../assets/background.png")}>
                <Text style={styles.appTitle}>Chat App</Text>
                <View style={styles.startBox}>
                    <TextInput style={styles.userNameInput} value={name} onChangeText={setName} placeholder="Your name" />

                    <Button title="Start chatting" onPress={() => navigation.navigate("Chat", { name: name })} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        width: "100%",
    },
    appTitle: {
        flex: 0.56,
        fontSize: 60,
        fontWeight: "600",
    },
    startBox: {
        flex: 0.39,
        height: "44%",
        width: "88%",
        backgroundColor: "white",
        alignItems: "center",
    },
    userNameInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
});

export default Start;
