import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";

const Chat = ({ route, navigation }) => {
    const { name } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Welcome to chat!</Text>
            <Text>(We're still building it)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Chat;