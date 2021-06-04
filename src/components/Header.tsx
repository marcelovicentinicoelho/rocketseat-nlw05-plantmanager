import
  React, {
  useEffect,
  useState
} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  StatusBar
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import imgUser from '../assets/marcelo.png';
import objColors from '../styles/colors';
import objFonts from '../styles/fonts';

export function Header() {
  const [ userName, setUserName ] = useState<string>();

  useEffect (() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }

    loadStorageUserName();
  }, []);

  return (
    <View style={objStyle.container}>
      <View>
        <Text style={objStyle.greeting}>
          Olá,
        </Text>
        <Text style={objStyle.userName}>
          {userName}
        </Text>
      </View>
      <Image
        source={imgUser}
        style={objStyle.image}
      >
      </Image>
    </View>
  );
}

const objStyle = StyleSheet.create ({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight()
  },
  greeting: {
    fontSize: 32,
    color: objColors.heading,
    fontFamily: objFonts.text
  },
  userName: {
    fontSize: 32,
    fontFamily: objFonts.heading,
    lineHeight: 40
  },  
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  }
});