// import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
// import { navigate } from '../lib/helpers/RootNavigation';


const Header = () => {
  const route = useRoute();

  /* eslint-disable global-require */
  const [loaded] = useFonts({
    AmaticSC: require('../assets/fonts/AmaticSC-Regular.ttf'),
  });
  /* eslint-enable global-require */
  if (!loaded) return null;

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontFamily: 'AmaticSC', fontSize: 50 }}>Exposure</Text>
        {/* <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Feather size={20} name="search" />
        </TouchableOpacity> */}
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'space-around',
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigate('HomeFollowing', {})}>
          <Text
            style={{
              fontSize: 17,
              color: route.name === 'HomeFollowing' ? 'black' : '#A4A2A2',
            }}
          >
            Following
          </Text>
          {route.name === 'HomeFollowing' && <View style={styles.current} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('HomeDiscover', {})}>
          <Text
            style={{
              fontSize: 17,
              color: route.name === 'HomeDiscover' ? 'black' : '#A4A2A2',
            }}
          >
            Discover
          </Text>
          {route.name === 'HomeDiscover' && <View style={styles.current} />}
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Header;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 130,
    width: '100%',
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F1F1',
  },
  current: {
    backgroundColor: '#8364E8',
    borderRadius: 100,
    width: 8,
    height: 8,
    alignSelf: 'center',
  },
});