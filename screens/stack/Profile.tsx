import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import { useProfileQuery } from "../../graphql/generated";
import { StackParamList } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import Photos from "../../components/PhotoGrid";
import { StackNavigationProp } from "@react-navigation/stack";

type ProfileScreenRouteProp = RouteProp<StackParamList, "UserProfile">;

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const route = useRoute<ProfileScreenRouteProp>();
  const { username } = route.params;

  const { data, isLoading, error } = useProfileQuery({
    username,
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

  return (
    <>
      <LinearGradient
        colors={["#D397FA", "#8364E8"]}
        style={styles.container}
        start={{ x: 0, y: 0.7 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backBtn}
          >
            <Image
              style={styles.backBtnImage}
              source={require("../../assets/back.png")}
            />
          </TouchableOpacity>
          <View style={styles.user}>
            <Avatar
              username={username}
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
    marginTop: -20,
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
