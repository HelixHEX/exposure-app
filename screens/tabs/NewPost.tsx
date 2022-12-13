import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../utils/context";
import { S3 } from "@aws-sdk/client-s3";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { fetchImageFromUri } from "../../utils/helpers";
import {
  //@ts-ignore
  AWS_ACCESS_KEY_ID as aws_access_key,
  //@ts-ignore
  AWS_SECRET_ACCESS_KEY as aws_secret_key, //@ts-ignore
} from "@env";
import { TextInput } from "react-native-gesture-handler";
import { useCreatePostMutation } from "../../graphql/generated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, StackParamList } from "../../types";
import { queryClient } from "../../graphql";

const client = new S3({
  region: Constants.expoConfig?.extra?.aws_s3_region,
  credentials: {
    accessKeyId: aws_access_key,
    secretAccessKey: aws_secret_key,
  },
});

const NewPost = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const { user } = useContext(UserContext);
  const [image, setImage] = useState<any>();
  const [description, setDescription] = useState("");
  const aws_s3_bucket = Constants.expoConfig?.extra?.aws_s3_bucket;
  const { mutate, isLoading, isError, isSuccess } = useCreatePostMutation();

  const chooseImage = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 1],
      quality: 1,
    }).then((result) => {
      // console.log(result)
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setImage("");
      setDescription("");
      await chooseImage();
    });
    return unsubscribe;
  }, [navigation]);

  const upload = async () => {
    if (image && description) {
      const fileName = `${user?.profile.username}-${Date.now()}.png`;
      await client
        .putObject({
          Bucket: aws_s3_bucket,
          Key: `uploads/${fileName}`,
          Body: await fetchImageFromUri(image.uri),
          ContentType: image.type,
        })
        .then(() => {
          const url = `https://${aws_s3_bucket}.s3.amazonaws.com/uploads/${fileName}`;
          mutate({
            description,
            image_url: url,
          });
          console.log("hehe");
          setDescription("");
          // setImage("");
          queryClient.invalidateQueries(["Posts"]);
          navigation.navigate("HomeScreen");
        });
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          paddingTop: 60,
          paddingBottom: 20,
          flexDirection: "row",
          justifyContent: "center",
          paddingRight: 10,
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>
          New Post
        </Text>
        {image && (
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginLeft: 10,
              backgroundColor: "#8364E8",
              padding: 5,
              borderRadius: 15,
              width: 60,
              display: image && description ? "flex" : "none",
            }}
            onPress={() => upload()}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {image && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: 10,
            paddingLeft: 10,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={chooseImage}
              style={{
                width: 30,
                backgroundColor: "white",
                position: "absolute",
                height: 30,
                borderRadius: 100,

                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#8364E8",
                  textAlign: "center",
                }}
              >
                x
              </Text>
            </TouchableOpacity>
            <Image
              source={{ uri: image.uri }}
              style={{
                backgroundColor: "white",
                width: 50,
                height: 50,
                marginTop: 10,
                marginLeft: 15,
                borderRadius: 5,
                resizeMode: "contain",
              }}
            />
          </View>
          <TextInput
            style={{
              width: "70%",
              backgroundColor: "white",
              borderRadius: 10,
              height: 100,
              padding: 10,
              marginLeft: 10,
            }}
            placeholder="What's on your mind?"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
      )}
    </>
  );
};

export default NewPost;
