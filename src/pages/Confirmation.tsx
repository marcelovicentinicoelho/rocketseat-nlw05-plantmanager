import React from 'react';
import { 
  Text,
  View, 
  StyleSheet
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';

import objColors from '../styles/colors';
import objFonts from '../styles/fonts';
import { Button } from '../components/Button';

interface Params {
  title: string;
  subTitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();
  
  const {
    title,
    subTitle,
    buttonTitle,
    icon,
    nextScreen
   } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }

  return (
    <View style={objStyle.container}>
      <View style={objStyle.content}>
        <Text style={objStyle.emoji}>
          {emojis[icon]}
        </Text>
        <Text style={objStyle.title}>
          {title || ''}
        </Text>
        <Text style={objStyle.subtitle}>
          {subTitle}
        </Text>
        <View style={objStyle.footer}>
          <Button
            title={buttonTitle}
            onPress={handleMoveOn}
          />
        </View>
      </View>
    </View>
  )
}

const objStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30
  },
  emoji: {
    fontSize: 78
  },
  title: {
    fontSize: 22,
    fontFamily: objFonts.heading,
    textAlign: 'center',
    color: objColors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    fontFamily: objFonts.text,
    textAlign: 'center',
    paddingVertical: 10,
    color: objColors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
});