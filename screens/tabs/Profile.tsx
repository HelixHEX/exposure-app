import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import { useProfileQuery } from "../../graphql/generated";
import { LinearGradient } from "expo-linear-gradient";
import Photos from "../../components/PhotoGrid";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, StackParamList } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { UserContext } from "../../utils/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const {setUser} = useContext(UserContext);
  const { data, isLoading, error } = useProfileQuery({
    me: true,
    username: "",
  });

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>An error has occurred</Text>
      </SafeAreaView>
    );
  }

  let photos = data?.profile.post.map((photo, i: number) => {
    return { url: photo.image_url };
  });

  const logout =  () => {
    AsyncStorage.removeItem("token");
    setUser(null)
    navigation.navigate("Login");
  }

  return (
    <>
      <LinearGradient
        colors={["#D397FA", "#8364E8"]}
        style={styles.container}
        start={{ x: 0, y: 0.7 }}
      >
        <View style={styles.header}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Image
                style={styles.backBtnImage}
                source={require("../../assets/back.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={{alignSelf:'center'}}>
              <MaterialIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.user}>
            <Avatar
              username={data?.profile.username!}
              w={100}
              h={100}
              backgroundColor="#8364E8"
              fontSize={30}
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{data?.profile.name}</Text>
              <Text style={styles.username}>@{data?.profile.username}</Text>
              <Text style={styles.bio}>{data?.profile.bio}</Text>
            </View>
          </View>
        </View>

        <StatusBar style="light" />
      </LinearGradient>
      <ScrollView style={styles.body}>
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.title}>Posts</Text>
          {/* <PhotoGrid PhotosList={photos} borderRadius={10} /> */}
          <Photos PhotosList={photos!} borderRadius={10} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8364E8",
    height: 300,
    width: "100%",
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
  },
  backBtnImage: {
    width: 25,
    height: 25,
    alignSelf: "center",
  },
  user: {
    marginTop: 20,
    flexDirection: "row",
  },
  userInfo: {
    marginLeft: 20,
    alignSelf: "center",
  },
  name: {
    color: "white",
    fontSize: 50,
  },
  username: {
    color: "white",
    fontSize: 12,
  },
  bio: {
    color: "white",
    fontSize: 12,
    marginTop: 10,
  },
  body: {
    backgroundColor: "#F9F9F9",
    width: "100%",
    height: "100%",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#373737",
  },
});

export default Profile;
