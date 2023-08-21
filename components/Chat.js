import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useEffect, useState } from "react";

const Chat = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);

    const { name } = route.params;
    const { backgroundColor } = route.params;

    const onSend = (newMessages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000",
                    },
                    left: {
                        backgroundColor: "#FFF",
                    },
                }}
            />
        );
    };

    useEffect(() => {
        navigation.setOptions({ title: name, headerStyle: { backgroundColor: backgroundColor }, headerTintColor: "white" });
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: "This is a system message",
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainText: {
        color: "white",
        fontFamily: "Poppins",
    },
});

export default Chat;
