import
React, {
  useState
} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { format, isBefore } from 'date-fns';

import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import imgWaterDrop from '../assets/waterdrop.png';
import objColors from '../styles/colors';
import objFonts from '../styles/fonts';
import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const route = useRoute();
  const { plant } = route.params as Params; // Obtem as informações passadas como parâmetro da tela 'PlantSelect' para a tela 'PlantSave'
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
  const navigation = useNavigation();

  function handleChangeTime(event: Event, datetime: Date | undefined) {
    if (Platform.OS === 'android')
      setShowDatePicker(oldState => !oldState);

    if (datetime && isBefore(datetime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if (datetime)
      setSelectedDateTime(datetime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate(
        'Confirmation', {
        title: 'Tudo certo!',
        subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar de sua plantinha com muito cuidado.',
        buttonTitle: 'Muito obrigado',
        icon: 'hug',
        nextScreen: 'MyPlants'
      }
      );
    } catch {
      Alert.alert('Não foi possível salvar. 😢');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={objStyle.container}
    >
      <View style={objStyle.container}>
        <View style={objStyle.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            width={150}
            height={150}
          />
          <Text style={objStyle.plantName}>
            {plant.name}
          </Text>
          <Text style={objStyle.plantAbout}>
            {plant.about}
          </Text>
        </View>
        <View style={objStyle.controller}>
          <View style={objStyle.tipContainer}>
            <Image
              style={objStyle.tipImage}
              source={imgWaterDrop}
            />
            <Text style={objStyle.tipText}>
              {plant.water_tips}
            </Text>
          </View>
          <Text style={objStyle.alertLabel}>
            Escolha o melhor horário para ser lembrado
          </Text>
          {
            showDatePicker && (
              <DateTimePicker
                value={selectedDateTime}
                mode='time'
                display='default'
                onChange={handleChangeTime}
              />
            )
          }
          {
            Platform.OS === 'android' && (
              <TouchableOpacity
                style={objStyle.dateTimePickerButton}
                onPress={handleOpenDateTimePickerForAndroid}
              >
                <Text style={objStyle.dateTimePickerText}>
                  {`${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }
          <Button
            title='Cadastrar planta'
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const objStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: objColors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: objColors.shape
  },
  plantName: {
    fontFamily: objFonts.heading,
    fontSize: 24,
    color: objColors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: objFonts.text,
    color: objColors.heading,
    fontSize: 17,
    marginTop: 10
  },
  controller: {
    backgroundColor: objColors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20 // Poderia usar o 'if' para o tipo de plataforma, mas no android é sempre 0 (zero)
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: objColors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: objFonts.text,
    color: objColors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: objFonts.complement,
    color: objColors.heading,
    fontSize: 14
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  },
  dateTimePickerText: {
    color: objColors.heading,
    fontSize: 36,
    fontFamily: objFonts.text
  }
})