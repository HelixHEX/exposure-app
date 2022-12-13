import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { focusManager, QueryClientProvider } from "@tanstack/react-query";
import {
  AppStateStatus,
  Platform,
  AppState,
  View,
  ImageBackground,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { Feather } from "@expo/vector-icons";
import { queryClient } from "./graphql";
import { useEffect } from "react";
import { UserProvider } from "./utils/context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import HomeScreen from "./screens/tabs/Home";
import Login from "./screens/stack/Login";
import NewPost from "./screens/tabs/NewPost";
import Comments from "./screens/stack/Comments";
import ProfileStack from "./screens/stack/Profile";
import ProfileTab from "./screens/tabs/Profile";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const HomeTabs = createBottomTabNavigator();

const Home = () => {
  return (
    <HomeTabs.Navigator
      screenOptions={{ headerShown: false, tabBarLabel: () => null }}
    >
      <HomeTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather name="home" size={24} color="black" />
              {focused && (
                <View
                  style={{
                    borderRadius: 10,
                    marginTop: 5,
                    width: 24,
                    height: 2,
                    backgroundColor: "#8364E8",
                  }}
                />
              )}
            </View>
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: () => (
            <ImageBackground
              style={{
                borderRadius: 100,
                width: 40,
                height: 40,
                justifyContent: "center",
                borderColor: "#8364E8",
                flex: 1,
              }}
              source={{
                uri: "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%238364E8FF' stroke-width='7' stroke-dasharray='50%25%2c 30%25' stroke-dashoffset='57' stroke-linecap='butt'/%3e%3c/svg%3e",
              }}
            >
              {/* <View
                style={{
                  alignSelf: "center",
                  backgroundColor: "#8364E8",
                  borderRadius: 100,
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                }}
              > */}
                <Feather
                  style={{ alignSelf: "center" }}
                  name="plus"
                  size={24}
                  color="black"
                />
              {/* </View> */}
            </ImageBackground>
          ),
        }}
        name="NewPost"
        component={NewPost}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather name="user" size={24} color="black" />
              {focused && (
                <View
                  style={{
                    borderRadius: 10,
                    marginTop: 5,
                    width: 24,
                    height: 2,
                    backgroundColor: "#8364E8",
                  }}
                />
              )}
            </View>
          ),
        }}
        name="Profile"
        component={ProfileTab}
        initialParams={{
          me: true
        }}
      />
    </HomeTabs.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="UserProfile"
              component={ProfileStack}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTintColor: "black",
                headerBackTitleVisible: false,
                headerBackImageSource: require("./assets/back.png"),
              }}
              name="Comments"
              component={Comments}
            />
          </Stack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
        <Toast />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
