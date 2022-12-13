import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

const Avatar = ({
  username,
  w = 30,
  h = 30,
  backgroundColor = "#8364E8",
  fontSize = 15,
}: {
  username: string;
  w?: number;
  h?: number;
  backgroundColor?: string;
  fontSize?: number;
}) => {
  return (
    <View style={[styles.avatar, { width: w, height: h, backgroundColor }]}>
      <Text style={[styles.avatarText, { fontSize }]}>
        {username.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,

    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default Avatar;
