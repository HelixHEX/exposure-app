import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Comments: { postId: number };
  UserProfile: { username: string };
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  PostScreen: { postId: number };
};

export type NativeStackScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
