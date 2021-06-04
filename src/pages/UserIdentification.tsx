import 
  React, { 
  useState 
} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import objColors from '../styles/colors';
import objFonts from '../styles/fonts';
import { Button } from '../components/Button';

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }
  
  function handleInputFocus() {
    setIsFocused(true);
  }

  /*
     ----------
     Na função abaixo, as duas exclamações antes do parâmetro 'value'
     indica o uso similar do IS NULL, ou seja, se tem conteúdo em 'value',
     retorna VERDADEIRO senão, retorna FALSO
     ----------
  */
  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }
  
  async function handleSubmit() {
    if (!name)
      return Alert.alert('Qual seu nome? 😉');
    
    try {
      await AsyncStorage.setItem('@plantmanager:user', name);

      navigation.navigate(
        'Confirmation', {
          title: 'Prontinho!',
          subTitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
          buttonTitle: 'Começar',
          icon: 'smile',
          nextScreen: 'PlantSelect'
        }
      );
    } catch {
      Alert.alert('Não foi possível salvar o seu nome. 😱');
    }
  }

  return (
    <View style={objStyle.container}>
      <KeyboardAvoidingView
        style={objStyle.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={objStyle.content}>
            <View style={objStyle.form}>
              <View style={objStyle.header}>
                <Text style={objStyle.emoji}>
                  { isFilled ? '😄' : '😃' }
                </Text>
                <Text style={objStyle.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>
              <TextInput
                style={[
                  objStyle.input,
                  (isFocused || isFilled) && { borderColor: objColors.green }
                ]}
                placeholder='Digite um nome'
                onBlur={handleInputBlur}   // LostFocus
                onFocus={handleInputFocus} // GotFocus
                onChangeText={handleInputChange}
              >
              </TextInput>
              <View style={objStyle.footer}>
                <Button
                  title='Confirmar'
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

const objStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54
  },
  emoji: {
    fontSize: 40
  },
  input: {
    borderBottomWidth: 1,
    borderColor: objColors.gray,
    color: objColors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: objColors.heading,
    fontFamily: objFonts.heading,
    marginTop: 20
  },
  header: {
    alignItems: 'center'
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }
});