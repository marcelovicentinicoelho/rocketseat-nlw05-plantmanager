import
  React, {
  useEffect, 
  useState
  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import objColors from '../styles/colors';
import objFonts from '../styles/fonts';
import objAPI from '../services/api';
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [ environments, setEnvironments ] = useState<EnvironmentProps[]>([]);
  const [ plants, setPlants ] = useState<PlantProps[]>([]);
  const [ filteredPlants, setFilteredPlants ] = useState<PlantProps[]>([]);
  const [ environmentSelected, setEnvironmentSelected ] = useState('all');
  const [ loading, setLoading ] = useState(true);
  const [ page, setPage ] = useState(1);
  const [ loadingMore, setLoadingMore ] = useState(false);
  const navigation = useNavigation();

  async function fetchPlant() {
    const { data } = await objAPI.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data)
      return setLoading(true);
    
    if (page > 1) {
      setPlants(oldValue => [... oldValue, ... data])
      setFilteredPlants(oldValue => [... oldValue, ... data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment == 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant => plant.environments.includes(environment));
    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlant();
  }

  function handlePlantSelect(plant: PlantProps) {
    /*
       O parâmetro 'plant' possui todas as informações da planta selecionada
       e está sendo passado da tela 'PlantSelect' para a tela 'PlantSave'
    */
    navigation.navigate('PlantSave', { plant });
  }

  // useEffect é um hook do React que executa antes da tela ser exibida
  useEffect( () => {
    async function fetchEnvironment() {
      const { data } = await objAPI.get('plants_environments?_sort=title&_order=asc');
      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ... data
      ]);
    }
    fetchEnvironment();
  }, [] )

  useEffect( () => {
    fetchPlant();
  }, [] )
  
  if (loading) 
    return <Load />

  return(
    <View style={objStyle.container}>
      <View style={objStyle.header}>
        <Header />
        <Text style={objStyle.title}>
          Em qual ambiente
        </Text>
        <Text style={objStyle.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View>
        <FlatList
          data={environments}
          keyExtractor={( item ) => String(item.key)}
          renderItem={ ({ item }) => ( // () => se refere a uma função anônima
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={objStyle.environmentList}
        />
      </View>
      <View style={objStyle.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={( item ) => String(item.id)}
          renderItem={ ({ item }) => ( // () => se refere a uma função anônima
            <PlantCardPrimary
              data={item}
              onPress={ () => handlePlantSelect(item) }
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={ ({ distanceFromEnd }) => handleFetchMore(distanceFromEnd) }
          ListFooterComponent={
            loadingMore ?                                   // Se tiver dados para carregar, 
            <ActivityIndicator color={objColors.green} /> : // Então exibe a animação de carga,
            <></>                                           // Senão não carrega nada (desfragment)
          }
        />
      </View>
    </View>
  );
}

const objStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: objColors.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: objColors.heading,
    fontFamily: objFonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    color: objColors.heading,
    fontFamily: objFonts.text,
    lineHeight: 20
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
});