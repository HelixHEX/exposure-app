import AsyncStorage from "@react-native-async-storage/async-storage";

//get token from AsyncStorage
export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export const fetchImageFromUri = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const timeSince = (input: any) => {
  interface ITime {
    [key: string]: number;
  }

  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if ((ranges as ITime)[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / (ranges as ITime)[key];
      return formatter.format(
        Math.round(delta),
        key as Intl.RelativeTimeFormatUnit
      );
    }
  }
};