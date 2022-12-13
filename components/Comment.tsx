import {  StyleSheet, Text, View } from "react-native";
import { timeSince } from "../utils/helpers";
import Avatar from "./Avatar";

type CommentProps = {
  id: number;
  createdAt: any;
  comment: string;
  profile: {
    id: number;
    username: string;
  };
};

const Comment = ({
  id,
  createdAt,
  comment,
  profile: { id: profile_id, username },
}: CommentProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Avatar username={username} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.time}>{timeSince(new Date(parseInt(createdAt)))}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20
  },
  user: {
    flexDirection: "row",
  },
  username: {
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 5,
  },
  comment: {
    marginLeft: 35
  },
  time: {
    marginLeft: 35,
    fontSize: 12,
    color: "gray",
  }
});

export default Comment;
