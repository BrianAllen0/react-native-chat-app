import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, onSnapshot, where, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db, isConnected }) => {
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState();

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

    const renderInputToolbar = (props) => {
        if (isConnected) {
            return <InputToolbar {...props} />;
        } else {
            return null;
        }
    };

    useEffect(() => {
        navigation.setOptions({ title: name, headerStyle: { backgroundColor: backgroundColor }, headerTintColor: "white" });
        let unsubMessages;
        if (isConnected) {
            // unregister previous listener to avoid memory leaks
            if (unsubMessages) {
                unsubMessages();
                unsubMessages = null;
            }
            const messageQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(messageQuery, (documentsSnapshot) => {
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
                    unsubMessages = null;
                }
            };
        } else {
            loadCachedMessages();
        }
    }, [isConnected]);

    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
        setMessages(JSON.parse(cachedMessages));
    };

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
            setMessages(newMessages);
        } catch (error) {
            console.log(error.message);
        }
    };

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) {
                setImage(result.assets[0]);
            } else {
                setImage(null);
            }
        }
    };

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();

        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();

            if (!result.canceled) {
                let mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();

                if (mediaLibraryPermissions?.granted) await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);

                setImage(result.assets[0]);
            } else setImage(null);
        }
    };

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
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
