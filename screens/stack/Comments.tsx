import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Comment from "../../components/Comment";
import Loading from "../../components/Loading";
import { queryClient } from "../../graphql";
import {
  useCommentsQuery,
  useCreateCommentMutation,
} from "../../graphql/generated";
import { StackParamList } from "../../types";

type CommentsScreenRouteProp = RouteProp<StackParamList, "Comments">;

const Comments = () => {
  const route = useRoute<CommentsScreenRouteProp>();
  const { postId } = route.params;
  const { data, isLoading, isError } = useCommentsQuery({ postId });
  const [isFetching, setIsFetching] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const [disabled, setDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const { mutate, isSuccess } = useCreateCommentMutation();

  const onRefresh = () => {
    setIsFetching(true);
    queryClient.invalidateQueries(["Posts"]);
    setIsFetching(false);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["Comments"]);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>An error has occurred </Text>
      </View>
    );
  }

  const handleComment = () => {
    mutate({ postId, comment });
    setComment("");
    setDisabled(true);
  };

  return (
    <View style={{flex: 1, height: 20, backgroundColor: 'white'}}>
      <FlatList
        data={data?.comments}
        renderItem={({ item }) => <Comment {...item} />}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        initialNumToRender={7}
        onRefresh={onRefresh}
        refreshing={isFetching}
        style={{
          paddingHorizontal: 10,
          height: 20,
          paddingVertical: 0,
          marginBottom: 71
        }}
      />
      <KeyboardAvoidingView
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          // paddingVertical: 0,
          backgroundColor: "white",
          // height: "100%",
        }}
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 20}
      >
        <View style={styles.commentInput}>
          <TextInput
            value={comment}
            onChangeText={(text) => {
              setComment(text);
              setDisabled(text.length === 0);
            }}
            placeholder="Add a comment..."
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleComment}
            disabled={disabled}
            style={styles.button}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: disabled ? "#A1A1A1" : "#8364E8",
                },
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  header: {
    backgroundColor: "white",
    width: "100%",
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F1F1",
  },
  headerText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  commentInput: {
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderColor: "#F1F1F1",
    backgroundColor: "white",
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: "90%",
  },
  button: {
    alignSelf: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default Comments;
