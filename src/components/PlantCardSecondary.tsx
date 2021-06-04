import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  Animated
} from 'react-native';
import { 
  RectButton, 
  RectButtonProps 
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';

import { Feather } from '@expo/vector-icons';

import objColors from '../styles/colors';
import objFonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export const PlantCardSecondary = ( {data, handleRemove, ... rest} : PlantProps ) => {
  return(
    <Swipeable
      overshootRight={false}
      renderRightActions={ () => (
        <Animated.View>
          <View>
            <RectButton
              style={objStyle.buttonRemove}
              onPress={handleRemove}
            >
              <Feather
                name='trash'
                size={32}
                color={objColors.white}
              />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton
        style={objStyle.container}
        { ... rest }
      >
        <SvgFromUri
          uri={data.photo}
          width={50}
          height={50}
        />
        <Text style={objStyle.title}>
          { data.name }
        </Text>
        <View style={objStyle.details}>
          <Text style={objStyle.timeLabel}>
            Regar às
          </Text>
          <Text style={objStyle.time}>
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

const objStyle = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: objColors.shape,
    marginVertical: 5
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: objFonts.heading,
    fontSize: 17,
    color: objColors.heading
  },
  details: {
    alignItems: 'flex-end'
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: objFonts.text,
    color: objColors.body_light
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: objFonts.heading,
    color: objColors.body_dark
  },
  buttonRemove: {
    width: 100,
    height: 85,
    backgroundColor: objColors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15
  }
})