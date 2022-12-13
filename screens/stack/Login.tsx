import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { queryClient } from "../../graphql";
import { useLoginMutation } from "../../graphql/generated";
import { StackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../utils/context";
import { useFonts } from "expo-font";

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, data, isLoading, isError } = useLoginMutation();
  const { user } = useContext(UserContext);

 
  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user]);
  useEffect(() => {
    if (data?.login.token) {
      AsyncStorage.setItem("token", data.login.token);
      queryClient.invalidateQueries(["CurrentUser"]);
      navigation.navigate("Home");
      setEmail("");
      setPassword("");
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setErrorMessage("Incorrect email or password");
    }
  }, [isError]);

  const [loaded] = useFonts({
    AmaticSC: require("../../assets/fonts/AmaticSC-Regular.ttf"),
  });
  /* eslint-enable global-require */
  if (!loaded) return null;


  const login = () => {
    setErrorMessage("");
    if (email && password) {
      mutate({ email, password });
    } else {
      setErrorMessage("Please enter your email and password to login");
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          justifyContent: "center",
          height: "100%",
          width: "100%",

          backgroundColor: "#8364E8",
        }}
      >
        <View style={{ width: "70%", alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 60,
              alignSelf: "center",
              color: "white",
              fontFamily: "AmaticSC",
            }}
          >
            Welcome Back!
          </Text>
          <TextInput
            style={{
              color: "white",
              marginTop: 30,
              height: "auto",
              paddingVertical: 5,
              borderRadius: 5,
              borderColor: "white",
              borderBottomWidth: 1,
            }}
            keyboardType="email-address"
            cursorColor={'white'}
            placeholder="Email"
            placeholderTextColor={"white"}
            value={email}
            onChangeText={(text) => {
              setErrorMessage("");
              setEmail(text);
            }}
          />
          <TextInput
            style={{
              color: "white",
              marginTop: 30,
              height: "auto",
              paddingVertical: 5,
              borderRadius: 5,
              borderColor: "white",
              borderBottomWidth: 1,
            }}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={"white"}
            cursorColor={'white'}
            value={password}
            onChangeText={(text) => {
              setErrorMessage("");
              setPassword(text);
            }}
          />
          {errorMessage ? (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 20,
                alignSelf: "center",
              }}
            >
              {errorMessage}
            </Text>
          ) : null}
          <TouchableOpacity
            disabled={isLoading}
            style={{
              backgroundColor: "white",
              height: 50,
              marginTop: 30,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={login}
          >
            <Text
              style={{ color: "#8364E8", fontSize: 20, fontWeight: "bold" }}
            >
              Login
            </Text>
          </TouchableOpacity>
          {/* <Pressable
              // onPress={() => RootNavigation.navigate('Username', {})}
              style={{ alignSelf: "flex-end", marginTop: 10 }}
            >
              <Text style={{ fontSize: 15 }}>Sign up {"->"}</Text>
            </Pressable> */}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
