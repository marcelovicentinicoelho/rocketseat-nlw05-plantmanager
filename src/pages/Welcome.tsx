import React from 'react';
import {
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useNavigation } from '@react-navigation/core';
import { 
  Entypo,
  Feather
} from '@expo/vector-icons';

import imgWatering from '../assets/watering.png';
import objColors from '../styles/colors';
import objFonts from '../styles/fonts';

export function Welcome() {
  const navigation = useNavigation();

  function handlerStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <View style={objStyle.container}>
      <View style={objStyle.wrapper}>
        <Text style={objStyle.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>
        <Image
          source={imgWatering} 
          style={objStyle.image} 
          resizeMode='contain'
        />
        <Text style={objStyle.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>
        <TouchableOpacity
          style={objStyle.button}
          activeOpacity={0.7}
          onPress={handlerStart}
        >
          <Feather
            name="chevron-right"
            style={objStyle.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const objStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight()
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: objColors.heading,
    marginTop: 38,
    fontFamily: objFonts.heading,
    lineHeight: 34
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: objColors.heading,
    fontFamily: objFonts.text
  },
  button: {
    backgroundColor: objColors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  buttonText: {
    color: objColors.white,
    fontSize: 24
  },
  buttonIcon: {
    color: objColors.white,
    fontSize: 32
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  }
});
