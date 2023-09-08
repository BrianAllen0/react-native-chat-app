import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase.config";

const Chat = ({ route, navigation, isConnected }) => {
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

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} onSend={onSend} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: backgroundColor },
      headerTintColor: "white",
    });
    let unsubMessages;
    if (isConnected) {
      // unregister previous listener to avoid memory leaks
      if (unsubMessages) {
        unsubMessages();
        unsubMessages = null;
      }
      const messageQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );
      unsubMessages = onSnapshot(messageQuery, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "height" : null}
    >
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          onSend={(message) => onSend(message)}
          user={{
            _id: userID,
            name: name,
          }}
        />
      </View>
    </KeyboardAvoidingView>
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
