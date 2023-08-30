import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, onSnapshot, where, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const [messages, setMessages] = useState([]);

    const { userID } = route.params;
    const { name } = route.params;
    const { backgroundColor } = route.params;

    const onSend = (message) => {
        addDoc(collection(db, "messages"), message[0]);
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
        const messageQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(messageQuery, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) });
            });
            cacheMessages(newMessages);
            setMessages(newMessages);
        });
        return () => {
            if (unsubMessages) {
                unsubMessages();
            }
        };
    }, []);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(message) => onSend(message)}
                user={{
                    _id: userID,
                    name: name,
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
