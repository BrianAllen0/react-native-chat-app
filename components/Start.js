import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from "react-native";

const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("black");

    return (
        <View style={styles.container}>
            <ImageBackground style={[styles.container, styles.backgroundImage]} source={require("../assets/background.png")}>
                <Text style={[styles.appTitle, styles.fontPoppins]}>Chat App</Text>
                <View style={styles.startBox}>
                    <TextInput style={[styles.userNameInput, styles.fontPoppins]} value={name} onChangeText={setName} placeholder="Your name" />
                    <Text style={[styles.paddedSmallBottom, styles.fontPoppins]}>Choose Background Color:</Text>
                    <View style={styles.span}>
                        <TouchableOpacity style={styles.spanItem}>
                            <View style={[styles.circle, styles.colorBlack]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.spanItem}>
                            <View style={[styles.circle, styles.colorGrey]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.spanItem}>
                            <View style={[styles.circle, styles.colorSlate]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.spanItem}>
                            <View style={[styles.circle, styles.colorOlive]}></View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => navigation.navigate("Chat", { name: name, backgroundColor: backgroundColor })}
                    >
                        <Text style={[styles.fontPoppins, styles.fontWhite]}>Start Chatting</Text>
                    </TouchableOpacity>
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
    span: {
        flex: 1,
        flexGrow: 0,
        flexBasis: 50,
        flexDirection: "row",
        justifyContent: "center",
    },
    spanItem: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    fontPoppins: {
        fontFamily: "Poppins",
    },
    circle: {
        minHeight: 50,
        minWidth: 50,
        maxHeight: 50,
        maxWidth: 50,
        borderRadius: 25,
    },
    colorBlack: { backgroundColor: "black" },
    colorGrey: { backgroundColor: "grey" },
    colorSlate: { backgroundColor: "lightslategrey" },
    colorOlive: { backgroundColor: "olive" },
    fontWhite: { color: "white" },
    backgroundImage: {
        width: "100%",
    },
    appTitle: {
        height: "51%",
        fontSize: 60,
        fontWeight: "600",
        color: "white",
    },
    paddedSmallBottom: {
        paddingBottom: 15,
    },
    startBox: {
        height: "44%",
        width: "88%",
        backgroundColor: "white",
        alignItems: "center",
    },
    startButton: {
        flex: 0.7,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        width: "88%",
        backgroundColor: "dimgray",
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
