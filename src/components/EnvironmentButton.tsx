import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import {
  RectButton, 
  RectButtonProps
} from 'react-native-gesture-handler';

import objColors from '../styles/colors';
import objFonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean; // O caracter '?' indica que a propriedade não é obrigatória
}

export function EnvironmentButton( {
  title,
  active = false, // Como a propriedade não é obrigatória, assume 'false' caso não tenha sido passada
  ... rest 
} : EnvironmentButtonProps ) {
  return(
    <RectButton
      style={[
        objStyle.container,
        active && objStyle.containerActive
      ]}
      { ... rest }
    >
      <Text style={[
        objStyle.text,
        active && objStyle.textActive
      ]}>
        { title }
      </Text>
    </RectButton>
  );
}

const objStyle = StyleSheet.create({
  container: {
    backgroundColor: objColors.shape,
    width: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {
    backgroundColor: objColors.green_light
  },
  text: {
    color: objColors.heading,
    fontFamily: objFonts.text
  },
  textActive: {
    fontFamily: objFonts.heading,
    color: objColors.green_dark
  }
});