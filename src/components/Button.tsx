import React from 'react';
import { 
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps 
} from 'react-native';

import objColors from '../styles/colors';
import objFonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button( { title, ... rest } : ButtonProps ) {
  return (
    <TouchableOpacity
      style={objStyle.container}
      { ... rest }
    >
      <Text style={objStyle.texto}>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

const objStyle = StyleSheet.create({
  container: {
    backgroundColor: objColors.green,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  texto: {
    fontSize: 16,
    color: objColors.white,
    fontFamily: objFonts.heading
  }
});