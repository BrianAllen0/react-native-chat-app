import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Start from "./components/Start";
import Chat from "./components/Chat";

export default function App() {
    const Stack = createNativeStackNavigator();
    const [fontsLoaded] = useFonts({ Poppins: require("./assets/fonts/Poppins-Regular.ttf") });

    const firebaseConfig = {
        apiKey: "AIzaSyBfTgteXaImoE-Skq3Mp48C9zRmvxzh9P0",
        authDomain: "shopping-list-demo-4d8ce.firebaseapp.com",
        projectId: "shopping-list-demo-4d8ce",
        storageBucket: "shopping-list-demo-4d8ce.appspot.com",
        messagingSenderId: "12273369232",
        appId: "1:12273369232:web:965af1733344299d599815",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Chat">{(props) => <Chat db={db} {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
