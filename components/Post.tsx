import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Vibration } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { timeSince } from "../utils/helpers";
import { UserContext } from "../utils/context";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../graphql/generated";
import { Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../types";
import Avatar from "./Avatar";
import Heart from "../assets/heart.svg";
import HeartO from "../assets/heart-o.svg";
import CommentO from "../assets/comment-o.svg";

type Likes = {
  id: number;
  profile_id: number;
};

type PostProps = {
  id: number;
  createdAt: any;
  description: string;
  image_url: string;
  profile: {
    id: number;
    username: string;
  };
  likes: Likes[];
};

const Post = ({
  id,
  createdAt,
  description,
  image_url,
  profile: { id: profile_id, username },
  likes,
}: PostProps) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const windowWidth = Dimensions.get("window").width;

  const [height, setHeight] = useState<number | string>(windowWidth + 130);
  const [expand, setExpand] = useState(false);
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState<number | null>(null);
  const [lastTap, setLastTap] = useState<number | null>(null);

  useEffect(() => {
    if (likes.length > 0) {
      likes.forEach((like) => {
        if (like.profile_id === user?.profile.id) {
          setLiked(true);
          setLikeId(like.id);
        }
      });
    }
  }, []);

  const { mutate: likeMutate, data } = useLikePostMutation();
  const { mutate: unlikeMutate } = useUnlikePostMutation();

  useEffect(() => {
    if (data?.likePost.like) {
      setLikeId(data.likePost.like.id);
    }
  }, [data]);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      handleLike();
    } else {
      setLastTap(now);
    }
  };
  const handleExpand = () => {
    setExpand(!expand);
    if (expand) {
      setHeight(520);
    } else {
      setHeight("auto");
    }
  };

  const handleLike = () => {
    if (liked) {
      unlikeMutate({ postId: id, likeId: likeId as number });
      setLiked(false);
    } else {
      likeMutate({ postId: id });
      setLiked(true);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.user}>
        <Avatar username={username} />
        <View style={styles.userData}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", { username: username })
            }
          >
            <Text style={styles.username}>{username}</Text>
          </TouchableOpacity>
          <Text style={styles.created}>
            {timeSince(new Date(parseInt(createdAt)))}
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={handleDoubleTap}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: image_url }}
          style={[
            styles.image,
            { width: windowWidth + 1, height: windowWidth + 1 },
          ]}
        />
      </TouchableWithoutFeedback>
      <View style={styles.interactions}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => handleLike()}
        >
          {liked ? (
            <Heart width={25} height={25} fill="#8364E8" />
          ) : (
            <HeartO width={25} height={25} fill="#8364E8" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Comments", { postId: id })}
          style={{ marginLeft: 10 }}
        >
          <CommentO width={25} height={25} fill="#8364E8" />
        </TouchableOpacity>
      </View>
      {expand ? (
        <View style={styles.descriptionExpanded}>
          <Text style={{ width: "100%" }}>{description}</Text>
          <TouchableOpacity
            style={{ marginTop: 5, alignSelf: "flex-end" }}
            onPress={handleExpand}
          >
            <Text style={{ color: "#8364E8" }}>View Less</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.description}>
          <Text numberOfLines={1} style={styles.descriptionText}>
            {description}
          </Text>
          <TouchableOpacity
            onPress={handleExpand}
            style={{ display: description.length > 50 ? "flex" : "none" }}
          >
            <Text style={{ color: "#8364E8" }}>Read more</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 10,
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: 0,
  },

  image: {
    alignSelf: "center",
    resizeMode: "contain",
  },
  user: {
    flexDirection: "row",
    marginTop: 0,
    padding: 10,
  },
  userData: {
    flexDirection: "column",
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
  },
  created: {
    fontSize: 12,
    color: "gray",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  descriptionExpanded: {
    padding: 10,
  },
  descriptionText: {
    width: "75%",
    fontWeight: "bold",
  },
  interactions: {
    flexDirection: "row",
    paddingLeft: 10,
    marginTop: 10,
  },
});

export default Post;
