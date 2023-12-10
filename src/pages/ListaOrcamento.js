import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Alert } from 'react-native';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';


export const ListaOrcamento = () => {
  const navigation = useNavigation()
  const [orcamento, setOrcamento] = useState([]);
  const [valorTotalGeralComodos, setValorTotalGeralComodos] = useState(0);
  const [QuantidadeMetrosTotal, setQuantidadeMetrosTotal] = useState(0);




  // Função para gerar o PDF

  const gerarPdf = async (item) => {
    try {
      const content = item.comodos.map((comodo, index) => (
        `<div style="">

        <div style="display: flex; border-top-right-radius:15px; border-top-left-radius:15px; padding: 20px; flex-direction: row; width: 95%; justify-content: space-around; align-items: center; background-color: #FF7400;">
        <h2 style="font-size: 22px; margin: 0; color: #fff;">Cliente:</h2>
        <h2 style="font-size: 28px; margin: 0; color: #fff;">${item.nomeCliente}</h2>
      </div>

          <div  style="display: flex; background-color: gray; padding: 12; width: 97%; flex-direction: row; justify-content: space-around; align-items: center;">
          <h4 style="font-size: 18px; color: #fff; margin: 0;">Cômodo:</h4>
           <h4 style="font-size: 18px; color: #fff;  margin: 0;">${comodo.comodo}</h4>
          </div>
          <hr style="border-color: #ddd; border-width: 0.5px;">
          



          <div style="display: flex;   padding: 12; flex-direction: row; justify-content: space-around; align-items: center;">
          <h4 style="font-size: 18px; margin: 0;">Altura:</h4>
           <h4 style="font-size: 18px; margin: 0;">${comodo.altura} m²</h4>
          </div>
          <hr style="border-color: #ddd; border-width: 0.5px;">



          <div style="display: flex; padding: 12; flex-direction: row; justify-content: space-around; align-items: center;">
          <h4 style="font-size: 18px; margin: 0;">Largura:</h4>
           <h4 style="font-size: 18px; margin: 0;">${comodo.largura} m²</h4>
          </div>

          <hr style="border-color: #ddd; border-width: 0.5px;">
          

          <div style="display: flex; padding: 12;  flex-direction: row; justify-content: space-around; align-items: center;">
          <h4 style="font-size: 18px; margin: 0;">Valor por metro:</h4>
           <h4 style="font-size: 18px; margin: 0;">${parseFloat(comodo.precoPorMetro).toFixed(2)} R$</h4>
          </div>
          <hr style="border-color: #ddd; border-width: 0.5px;">
          
          <div style="display: flex; padding: 12;  flex-direction: row; justify-content: space-around; align-items: center;">
          <h4 style="font-size: 18px; margin: 0;">Metros cômodo:</h4>
           <h4 style="font-size: 18px; margin: 0;"> ${parseFloat(comodo.altura * comodo.largura).toFixed(2)} m²</h4>
          </div>
          <hr style="border-color: #ddd; border-width: 0.5px;">


          <div style="display: flex; padding: 12; flex-direction: row; justify-content: space-around; align-items: center;">
          <h4 style="font-size: 18px; margin: 0;">Valor cômodo:</h4>
           <h4 style="font-size: 18px; margin: 0;"> ${(comodo.altura * comodo.largura * comodo.precoPorMetro).toFixed(2)} R$</h4>
          </div>


      

        </div>`
      ));

      const htmlContent = `
        <html>
          <body style="background: #fff">
            <h2 style="margin: 18px; color: #123; text-align:center;">Orçamento</h2>
            ${content.join('')}
           
          <div style=" width: 100%;  margin-top: 15; justify-content:center; align-items: center; background-color: #FF7400;">


          <div style="display: flex;padding: 20; flex-direction: row; justify-content: space-around; align-items: center;">
          <p style="font-size: 20px; margin: 0;color: #fff">Total metros:</p>
          <p style="font-size: 20px; margin: 0;color: #fff">${item.comodos.reduce((total, comodo) => total + (comodo.altura * comodo.largura), 0).toFixed(2)}m²</p>
          </div>
          <hr style="border-color: #ddd; border-width: 0.5px;">


          <div style="display: flex; padding: 20; flex-direction: row; justify-content: space-around; align-items: center;">
          <p style="font-size: 20px; margin: 0;color: #fff">Valor total:</p>
          <p style="font-size: 20px; margin: 0;color: #fff">${item.comodos.reduce((total, comodo) => total + (comodo.altura * comodo.largura * comodo.precoPorMetro), 0).toFixed(2)} R$</p>
          
          </div>

             



               
          
          </div>

          <div style=" display:flex; margin-top: 20; border-bottom-left-radius:20px;border-bottom-right-radius:20px; background-color: #00bcb4; flex-direction: column; justify-content:center; align-itens:center;">
              <h1 style="font-size: 38px;color: #123; text-align: center"> EL SHADDAY PINTURAS </h1>
              
                <h2 style="font-size: 30px; margin-top: 10px;color: #123; text-align: center">A arte de pintar!</h2>
                <h2 style="font-size: 30px; margin-top: 10px;color: #123; text-align: center">Telefone: (66) 9 8428-4643</h2>
               
                  
             </div>
             
            </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: 'orcamento.pdf',
        directory: RNFS.DownloadDirectory,
      };

      const file = await RNHTMLtoPDF.convert(options);

      // Caminho para o arquivo PDF gerado
      const pdfFilePath = file.filePath;

      // Abrir opções de compartilhamento
      Share.open({
        url: `file://${pdfFilePath}`,
        type: 'application/pdf',
        title: 'Compartilhar PDF',
      });
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    async function fetchData() {
      try {
        const jsonData = await AsyncStorage.getItem('orcamento');

        if (jsonData) {
          const data = JSON.parse(jsonData);
          setOrcamento(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadOrcamentos = async () => {
        try {
          const existingData = await AsyncStorage.getItem('orcamento');
          const existingList = existingData ? JSON.parse(existingData) : [];
          // Atualize os estados com a lista carregada
          setOrcamento(existingList);
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      };

      // Chame a função para carregar os orçamentos toda vez que a tela for focada
      loadOrcamentos();
    }, [])
  );


 


  function deletar(item, index) {
    try {
      Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja excluir este item?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Crie uma cópia do objeto orcamento
              const updatedOrcamento = [...orcamento];
  
              // Encontre o orcamento correspondente pelo nome do cliente
              const orcamentoIndex = updatedOrcamento.findIndex((orc) => orc.nomeCliente === item.nomeCliente);
  
              if (orcamentoIndex !== -1) {
                // Verifique se o comodoIndexToDelete está dentro dos limites da lista de comodos
                if (index >= 0 && index < updatedOrcamento[orcamentoIndex].comodos.length) {
                  // Remova o comodo da lista de comodos dentro do orcamento
                  updatedOrcamento[orcamentoIndex].comodos.splice(index, 1);
  
                  // Verifique o número de comodos restantes
                  const remainingComodos = updatedOrcamento[orcamentoIndex].comodos.length;
  
                  if (remainingComodos === 0) {
                    // Se não houver mais comodos, remova toda a entrada
                    updatedOrcamento.splice(orcamentoIndex, 1);
                  }
  
                  // Atualize o estado com a lista atualizada
                  setOrcamento(updatedOrcamento);
  
                  // Salve a lista atualizada no AsyncStorage (se necessário)
                  AsyncStorage.setItem('orcamento', JSON.stringify(updatedOrcamento));
                } else {
                  console.error('Índice de comodo a ser excluído está fora dos limites.');
                }
              } else {
                console.error('Orçamento não encontrado na lista existente.');
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Erro ao excluir o comodo:', error);
    }
  }
  
  
  

  function adicionarComodo(item) {
    navigation.navigate('Adicionar comodo', { item })
  }




  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#040D12" barStyle="light-content" />
      {orcamento.length === 0 ? (
        <View style={styles.viewNoItens}>
          <TouchableOpacity>
            <MaterialIcons style={styles.add} name="playlist-remove" size={30} color="#ddd" />
          </TouchableOpacity>
          <Text style={styles.viewNoItensText}>Clique no botão abaixo para adicionar</Text>

          <TouchableOpacity >
            <Feather name="arrow-down" size={35} color="#FF7400" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnAddOrcamento} onPress={() => navigation.navigate('CADASTRO')}>
            <Feather style={styles.add} name="plus" size={50} color="#ddd" />
          </TouchableOpacity>
        </View>
      ) : (


        <FlatList
          data={orcamento}
          keyExtractor={(item, index) => index.toString()}

          renderItem={({ item }) => (
            <View style={styles.containerOrcamento}>
              {console.log(item)}
              <View style={styles.containerOrcamentoItemCliente}>
                <Text style={styles.orcamentoItemCliente}>CLIENTE</Text>

                <Text style={styles.orcamentoItemCliente}>{(item.nomeCliente).toUpperCase()}</Text>
              </View>

              {item.comodos?.map((comodo, index) => (
                <View key={index}>
                  {console.log(item.id)}


                  <View style={styles.containerOrcamentoItemComodo}>
                    <Text style={styles.orcamentoItem}>Cômodo:</Text>
                    <Text style={styles.orcamentoItem}>{comodo.comodo}</Text>
                  </View>


                  <View style={styles.containerOrcamentoItem}>
                    <Text style={styles.orcamentoItem}>Altura:</Text>
                    <Text style={styles.orcamentoItem}>{parseFloat(comodo.altura).toFixed(2)} m²</Text>
                  </View>

                  <View style={styles.containerOrcamentoItem}>
                    <Text style={styles.orcamentoItem}>Largura:</Text>
                    <Text style={styles.orcamentoItem}>{parseFloat(comodo.largura).toFixed(2)} m²</Text>
                  </View>

                  <View style={styles.containerOrcamentoItem}>
                    <Text style={styles.orcamentoItem}>Valor por metro:</Text>
                    <Text style={styles.orcamentoItem}>{parseFloat(comodo.precoPorMetro).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                  </View>

                  <View style={styles.containerOrcamentoItem}>
                    <Text style={styles.orcamentoItem}>Metros cômodo:</Text>
                    <Text style={styles.orcamentoItem}>
                      {parseFloat((comodo.altura * comodo.largura)).toFixed(2)} m²</Text>
                  </View>


                  <View style={styles.containerOrcamentoItem}>
                    <Text style={styles.orcamentoItem}>Valor cômodo:</Text>
                    <Text style={styles.orcamentoItem}>
                      {(comodo.altura * comodo.largura * comodo.precoPorMetro).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} </Text>
                  </View>








                  <View style={styles.containerbtns}>
                    {/* <View style={styles.line}></View> */}

                    <TouchableOpacity style={styles.btnIcon} onPress={() => deletar(item, index)}>
                      <Feather name="trash" size={36} color="#BD1700" />
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.btnIcon} onPress={() => navigation.navigate('Editar orçamento', { editComodo: comodo, id: item.id, item })}>
                      <Feather name="edit" size={36} color="#071952" />
                    </TouchableOpacity>


                  </View>

                  <View style={styles.line}></View>
                </View>
              ))}

              {/*     CONTAINER ONDE MOSTRA O TOTAL GERAL */}
              <View style={[styles.containerOrcamentoItemTotal, { marginTop: -3 }]}>
                <Text style={styles.orcamentoItemTotal}>Total metros:</Text>
                <Text style={styles.orcamentoItemTotal}> {item.comodos.reduce((total, comodo) => total + (comodo.altura * comodo.largura), 0).toFixed(2)}m²</Text>
              </View>
              <View style={[styles.containerOrcamentoItemTotal, { marginTop: -1.5 }]}>
                <Text style={styles.orcamentoItemTotal}>Valor total:</Text>
                <Text style={styles.orcamentoItemTotal}>{item.comodos.reduce((total, comodo) => total + (comodo.altura * comodo.largura * comodo.precoPorMetro), 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
              </View>


              {/* ./gradlew assembleRelease */}

              <View style={styles.containerbtnsLast}>

                <TouchableOpacity style={[styles.btnIconLast, { backgroundColor: '#D83F31' }]} onPress={() => gerarPdf(item)}>
                  <Text style={styles.btnIconText}>Imprimir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnIconLast, { backgroundColor: '#123' }]} onPress={() => adicionarComodo(item)}>
                  <Text style={[styles.btnIconText, { color: '#fff' }]}>+ cômodo</Text>
                </TouchableOpacity>


              </View>





            </View>
          )}
        />



      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
  },

  containerOrcamento: {
    width: '96%',
    marginHorizontal: '2%',
    backgroundColor: '#FF7400',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    gap: 2
  },

  containerOrcamentoItemCliente: {
    justifyContent: 'space-between',
    backgroundColor: '#D83F31',
    marginTop: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    flexDirection: 'row'
  },

  orcamentoItemCliente: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    marginHorizontal: '2%',
    fontWeight: '400'
  },

  // containerOrcamentoItemComodo:{
  //  backgroundColor: 'red'
  // },

  containerOrcamentoItemComodo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gray',
    marginTop: -3,
    paddingHorizontal: 15
  
  },

  containerOrcamentoItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: '2%',
    padding: 5,
  },

  orcamentoItem: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500'
  },

  line: {
    borderBottomWidth: 0.9,
    borderColor: '#ddd',
    width: '100%',
    // paddingVertical: 5,
  },

  containerbtns: {
    flexDirection: 'row',
    width: '96%',
    marginHorizontal: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7
  },

  viewNoItens: {

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'

  },
  viewNoItensText: {
    color: '#FF7400',
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  btn: {

  },


  btnAddOrcamento: {
    position: 'absolute', // Define a posição absoluta para o botão
    bottom: 40,
    right: 30,
    backgroundColor: '#FF7400',
    borderRadius: 30,
    width: 60,
    height: 60,
    color: '#123',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerbtnsLast: {
    flexDirection: 'row',
    width: '96%',
    marginHorizontal: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 14,
    padding: 10
    // marginTop: 10


  },

  btnIconLast: {
    backgroundColor: '#123',
    paddingHorizontal: 12,
    marginBottom: 6,
    borderRadius: 5,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: '2%'


  },
  btnIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'

  },

  containerbtnsLast: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,


  },
  containerOrcamentoItemTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    paddingHorizontal: 7,


  },
  orcamentoItemTotal: {
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 7


  }
});

