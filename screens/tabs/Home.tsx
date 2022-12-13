import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import { queryClient } from "../../graphql";
import { usePostsQuery } from "../../graphql/generated";
import { HomeStackParamList } from "../../types";

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      queryClient.invalidateQueries(["Posts"]);
      console.log("refocused");
    });
    return unsubscribe;
  }, [navigation]);

  const { data, isLoading, isError } = usePostsQuery();

  const onRefresh = () => {
    setIsFetching(true);
    queryClient.invalidateQueries(["Posts"]);
    setIsFetching(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView>
        <Text>An error has occurred </Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <Header />
        <FlatList
          data={data?.posts}
          renderItem={({ item }) => <Post {...item} />}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          initialNumToRender={7}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
        <StatusBar style="dark" />
      </View>
    </>
  );
};

export default Home;
