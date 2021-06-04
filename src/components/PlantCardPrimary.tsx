import React from 'react';
import { 
  StyleSheet,
  Text 
} from 'react-native';
import { 
  RectButton, 
  RectButtonProps 
} from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import objColors from '../styles/colors';
import objFonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export const PlantCardPrimary = ( {data, ... rest} : PlantProps ) => {
  return(
    <RectButton
      style={objStyle.container}
      { ... rest }
    >
      <SvgFromUri
        uri={data.photo}
        width={80}
        height={80}
      />
      <Text style={objStyle.text}>
        { data.name }
      </Text>
    </RectButton>
  )
}

const objStyle = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: objColors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: objColors.green_dark,
    fontFamily: objFonts.heading,
    marginVertical: 16
  }
})