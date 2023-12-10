import React, { useState } from 'react'
import { Text, View, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Editar = () => {
  const route = useRoute()
  const navigation = useNavigation();
  const { item, id, editComodo } = route.params

  const [nomeCliente, setNomeCliente] = useState(item.nomeCliente);
  const [comodo, setComodo] = useState(editComodo.comodo)
  const [altura, setAltura] = useState(editComodo.altura);
  const [largura, setLargura] = useState(editComodo.largura);
  const [precoPorMetro, setPrecoPorMetro] = useState(editComodo.precoPorMetro);



  async function saveDataComodo() {
    try {
      const existingData = await AsyncStorage.getItem('orcamento');
      if (existingData) {
        const existingList = JSON.parse(existingData);

        // Encontre o cliente pelo nome
        const clientToUpdate = existingList.find((item) => item.nomeCliente === nomeCliente);

        if (clientToUpdate) {
          // Encontre o comodo pelo ID
          const comodoToUpdate = clientToUpdate.comodos.find((comodoItem) => comodoItem.id === editComodo.id);

          if (comodoToUpdate) {
            // Atualize os dados do comodo existente
            comodoToUpdate.comodo = comodo;
            comodoToUpdate.altura = altura;
            comodoToUpdate.largura = largura;
            comodoToUpdate.precoPorMetro = precoPorMetro;

            // Salve os dados atualizados no AsyncStorage
            await AsyncStorage.setItem('orcamento', JSON.stringify(existingList));
            navigation.navigate("Lista orçamentos")
          } else {
            console.error('Cômodo não encontrado no orçamento existente.');
          }
        } else {
          console.error('Orçamento não encontrado na lista existente.');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar/salvar os dados:', error);
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#040D12" barStyle="light-content" />

      <View style={styles.form}>
        <TextInput

          style={[styles.input, { color: 'gray' }]}
          value={nomeCliente}
          editable={false}
          onChangeText={setNomeCliente}
        />
        <TextInput
          placeholderTextColor="#93B1A6"
          style={styles.input}
          placeholder="cômodo"
          value={comodo}
          onChangeText={setComodo}
        />
        <TextInput
          placeholderTextColor="#93B1A6"
          style={styles.input}
          placeholder="altura"
          keyboardType='numeric'
          value={altura}
          onChangeText={setAltura}
        />
        <TextInput
          placeholderTextColor="#93B1A6"
          style={styles.input}
          placeholder="largura"
          keyboardType='numeric'

          value={largura}
          onChangeText={setLargura}
        />
        <TextInput
          placeholderTextColor="#93B1A6"
          style={styles.input}
          placeholder="preço por metro"
          keyboardType='numeric'
          value={precoPorMetro}
          onChangeText={setPrecoPorMetro}
        />
      </View>


      <View style={styles.containerBtns}>
        <TouchableOpacity style={[styles.btns, { backgroundColor: '#BD1700' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns} onPress={() => saveDataComodo(id)}>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};



// #ff4747
// #00bcb4
// #c4e86b
// #ffb547
// #e1ee32
// #FF7400
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
    gap: 12
  },
  mainTitle: {
    color: '#93B1A6',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 18,
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
    width: '45%',
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