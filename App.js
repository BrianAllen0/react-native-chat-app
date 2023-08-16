import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Screen1">
                <Stack.Screen name="Screen1" component={Screen1} />
                <Stack.Screen name="Screen2" component={Screen2} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
