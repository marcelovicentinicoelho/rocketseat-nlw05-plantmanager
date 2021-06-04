import
React, {
  useEffect
} from 'react';
import AppLoading from 'expo-app-loading';
import * as objNotifications from 'expo-notifications';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  function addSpacesToConsoleLog() {
    let nCont: number;
    const sCaracter: string = ' ';
    for (nCont = 1; nCont <= 3; nCont++) {
      console.log(sCaracter.repeat(nCont));
    }
  }

  // Cria um listener para as notificações que chegam
  // /*
  useEffect(() => {
    const objListener = objNotifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        addSpacesToConsoleLog();
        console.log('>>> CHEGOU UMA NOTIFICAÇÃO! <<<');
        console.log(data);
      });

    return () => objListener.remove();
  }, [])
  // */

  // Lista todas as notificações salvas no dispositivo
  /*
  useEffect(() => {
    async function checkNotifications() {
      const data = await objNotifications.getAllScheduledNotificationsAsync();
      addSpacesToConsoleLog();
      console.log('>>> NOTIFICAÇÕES AGENDADAS <<<');
      console.log(data);
    };

    checkNotifications();
  }, [])
  */

  // Remove todas as notificações salvas no dispositivo
  /*
  useEffect(() => {
    async function removeAllNotifications() {
      await objNotifications.cancelAllScheduledNotificationsAsync();

      const data = await objNotifications.getAllScheduledNotificationsAsync();
      addSpacesToConsoleLog();
      console.log('>>> NOTIFICAÇÕES AGENDADAS <<<');
      console.log(data);
    }

    removeAllNotifications();
  }, [])
  */

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  )
}
