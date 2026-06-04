import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import AddScreen from "../screens/AddScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";

export type TabParamList = {
  Home: undefined;
  Add: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function icon(label: string) {
  const map: Record<string, string> = {
    Home: "💰",
    Add: "➕",
    History: "📊",
  };
  return <Text style={{ fontSize: 20 }}>{map[label]}</Text>;
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => icon(route.name),
          tabBarActiveTintColor: "#1a1a1a",
          tabBarInactiveTintColor: "#aaa",
          tabBarStyle: {
            borderTopColor: "#e5e5e5",
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
