import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

export const AdicionarComodo = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  const [comodo, setComodo] = useState('');
  const [altura, setAltura] = useState('');
  const [largura, setLargura] = useState('');
  const [precoPorMetro, setPrecoPorMetro] = useState('');

  async function saveData() {
    if (comodo === "" || altura === "" || largura === "" || precoPorMetro === "") {
      alert("Não  é permitido ter campos vazios")
      return
    }
    try {
      const newComodo = {
        comodo,
        altura,
        largura,
        precoPorMetro,
      };

      // Obtenha os dados existentes do AsyncStorage
      const existingData = await AsyncStorage.getItem('orcamento');
      const existingList = existingData ? JSON.parse(existingData) : [];

      // Encontre o item correto pelo nome do cliente (item.nomeCliente) na lista existente
      const updatedList = existingList.map((orc) => {
        if (orc.nomeCliente === item.nomeCliente) {
          // Adicione o novo cômodo à lista existente
          return {
            ...orc,
            comodos: [...(orc.comodos || []), newComodo],
          };
        }
        return orc;
      });

      // Salve a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('orcamento', JSON.stringify(updatedList));

      // Volte para a tela anterior (ListaOrcamento)
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar o novo cômodo:', error);
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#040D12" barStyle="light-content" />

      <View style={styles.form}>
        <Text style={styles.nomeClienteText}>Cliente: {item.nomeCliente}</Text>

        <TextInput
          placeholderTextColor="#93B1A6"
          style={[styles.input, { borderTopRightRadius: 0, borderTopLeftRadius: 0 }]}
          placeholder="Novo cômodo"
          value={comodo}
          onChangeText={setComodo}
        />
        <TextInput
          placeholderTextColor="#93B1A6"
          style={styles.input}
          placeholder="Altura"
          keyboardType='numeric'

          value={altura}
          onChangeText={setAltura}
        />
        <TextInput
          placeholderTextColor="#93B1A6"
          style={styles.input}
          placeholder="Largura"
          value={largura}
          keyboardType='numeric'
          onChangeText={setLargura}
        />
        <TextInput
          placeholderTextColor="#93B1A6"
          style={styles.input}
          placeholder="Preço por metro"
          keyboardType='numeric'
          value={precoPorMetro}
          onChangeText={setPrecoPorMetro}
        />
      </View>

      <View style={styles.containerBtns}>
        <TouchableOpacity style={[styles.btns, { backgroundColor: '#ff0000' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns} onPress={saveData}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
    gap: 12

  },
  nomeClienteText: {
    fontSize: 26,
    textAlign: 'center',
    color: '#dddaaa',
    fontWeight: '500',
    backgroundColor: '#FF7400',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: -18,
    paddingVertical: 6

  },
  form: {
    width: '96%',
    marginHorizontal: '2%',
    marginVertical: 18,
    gap: 18
  },
  input: {
    borderWidth: 1,
    borderColor: '#93B1A6',
    borderRadius: 7,
    color: '#fff',
    fontSize: 19,
    height: 55,
    paddingLeft: 12
  },

  containerBtns: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',

  },
  btns: {
    width: '46%',
    height: 55,
    backgroundColor: '#FF7400',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20.

  }
})