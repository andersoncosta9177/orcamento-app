import React, { useState } from 'react'
import { Text,View, StyleSheet,StatusBar, TextInput,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Adicionar = () => {

  const navigation = useNavigation();

  const [nomeCliente, setNomeCliente] = useState('');
  const [comodo, setComodo] = useState('');
  const [altura, setAltura] = useState('');
  const [largura, setLargura] = useState('');
  const [precoPorMetro, setPrecoPorMetro] = useState('');


  // async function saveData() {

  //   if(nomeCliente === "" || comodo === "" || altura ==="" || largura === "" || precoPorMetro === ""){
  //     alert("Não  é permitido ter campos vazios")
  //     return
  //   }
  //   try {
  //     // Gere um ID único para este orçamento (por exemplo, usando um timestamp)
  //     const timestamp = Date.now();
  //     const id = `orcamento_${timestamp}`;
  
  //     const comodoData = {
  //       comodo,
  //       altura,
  //       largura,
  //       precoPorMetro,
  //     };
  
  //     const orcamentoItem = {
  //       id,
  //       nomeCliente,
  //       comodos: [comodoData], // Inicialmente, apenas um cômodo no array
  //     };
  
  //     console.log('Novos dados a serem salvos:', orcamentoItem);
  
  //     const existingData = await AsyncStorage.getItem('orcamento');
  
  //     console.log('Dados existentes no AsyncStorage:', existingData);
  
  //     const existingList = existingData ? JSON.parse(existingData) : [];
  
  //     console.log('Lista existente:', existingList);
  
  //     const updatedList = Array.isArray(existingList) ? existingList : [];
  //     updatedList.push(orcamentoItem);
  
  //     console.log('Lista atualizada:', updatedList);
  
  //     const updatedData = JSON.stringify(updatedList);
  
  //     console.log('Dados atualizados em formato JSON:', updatedData);
  
  //     await AsyncStorage.setItem('orcamento', updatedData);
  
  //     console.log('Dados salvos com sucesso.');
  
  //     // Limpe os campos de entrada após salvar
  //     setNomeCliente('');
  //     setComodo('');
  //     setAltura('');
  //     setLargura('');
  //     setPrecoPorMetro('');
  //     navigation.navigate('Lista orçamentos');
  //   } catch (error) {
  //     console.error('Erro ao salvar os dados:', error);
  //   }
  // }
  
  async function saveData() {
    if (nomeCliente === "" || comodo === "" || altura === "" || largura === "" || precoPorMetro === "") {
      alert("Não é permitido ter campos vazios");
      return;
    }
  
    try {
      const timestamp = Date.now(); // Gerar um ID baseado no timestamp
      const comodoId = `comodo_${timestamp}`;
  
      const comodoData = {
        id: comodoId, // Usar o ID gerado para o comodo
        comodo,
        altura,
        largura,
        precoPorMetro,
      };
  
      const orcamentoItem = {
        id: `orcamento_${timestamp}`, // Usar um ID único para o orçamento
        nomeCliente,
        comodos: [comodoData], // Inicialmente, apenas um cômodo no array
      };
  
      const existingData = await AsyncStorage.getItem('orcamento');
      const existingList = existingData ? JSON.parse(existingData) : [];
  
      const updatedList = Array.isArray(existingList) ? existingList : [];
      updatedList.push(orcamentoItem);
  
      const updatedData = JSON.stringify(updatedList);
      await AsyncStorage.setItem('orcamento', updatedData);
  
      // Limpar os campos de entrada após salvar
      setNomeCliente('');
      setComodo('');
      setAltura('');
      setLargura('');
      setPrecoPorMetro('');
      navigation.navigate('Lista orçamentos');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  }
  




return (
  <View style={styles.container}>
    <StatusBar backgroundColor="#040D12" barStyle="light-content" />

    <View style={styles.form}>
      <TextInput
        placeholderTextColor="#93B1A6"
        style={styles.input}
        placeholder="Cliente"
        value={nomeCliente}
        onChangeText={setNomeCliente}
      />
      <TextInput
        placeholderTextColor="#93B1A6"
        style={styles.input}
        placeholder="Cômodo"
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
        value={precoPorMetro}
        onChangeText={setPrecoPorMetro}
        keyboardType='numeric'

      />
    </View>


    <View style={styles.containerBtns}>
      <TouchableOpacity style={[styles.btns, {backgroundColor: '#00bcb4'}]} onPress={() => navigation.navigate("Lista orçamentos")}>
        <Text style={styles.btnText}>Orçamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns} onPress={saveData}>
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
  container:{
    flex: 1,
    backgroundColor: '#040D12',
    gap: 12
  },
  mainTitle:{
    color: '#93B1A6',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 18,
  },
  form:{
    width: '96%',
    marginHorizontal: '2%',
    marginVertical: 18,
    gap: 18
  },
  input:{
    borderWidth: 1,
    borderColor: '#93B1A6',
    borderRadius: 7,
    color: '#fff',
    fontSize: 19,
    height: 55,
    paddingLeft: 12
  },
  containerBtns:{
    justifyContent:'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',

  },
  btns:{
     width: '46%',
     height: 55,
     backgroundColor: '#FF7400',
     borderRadius: 12,
     justifyContent: 'center',
     alignItems: 'center'
  },
   btnText:{
    color: '#fff',
    fontWeight: '500',
    fontSize: 20.

   }
})