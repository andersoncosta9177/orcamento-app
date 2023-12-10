import React from 'react'
import { Text, View, StyleSheet,StatusBar, Image,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
export const Home = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
         <StatusBar
        backgroundColor="#FF7400" // Defina a cor de fundo da barra de status
        barStyle="light-content" // Define o estilo do texto na barra de status (pode ser 'default', 'light-content', ou 'dark-content')
      />
      <View style={styles.logo}>
        <Image style={styles.logoImg} source={require("../assets/logo.png")} />
        <Text style={styles.logoText}>EL SHADDAY</Text>
        <Text style={styles.logoText}>PINTURAS</Text>
        <Text style={styles.slogan}>A arte de pintar!</Text>

      </View>

      <View style={styles.containerBtns}>
      <TouchableOpacity style={[styles.btns,{backgroundColor:"#00bcb4"}]} onPress={()=>navigation.navigate("Lista orçamentos")}>
        <Text style={styles.btnText}>Orçamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btns} onPress={()=>navigation.navigate("CADASTRO")}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      </View>
    </View>
  )
}


// #ff4747
// #00bcb4
// #c4e86b
// #ffb547
// #e1ee32
// #FF7400
// #040D12
// #93B1A6
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D12',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7400',
    height: '50%',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,

  },

  logoImg: {
    marginBottom: 15,
    // width: '50%'

  },

  logoText: {
    fontSize: 27,
    padding: 5,
    letterSpacing: 7,
    color: '#ddd',
    fontWeight: '500',
    // paddingBottom: 6
  },
  slogan:{
    fontSize: 22,
    color: '#fff',
    letterSpacing: 6,
    paddingVertical: 7,
    textAlign:'center',
    marginBottom: 14,
  

  },

  containerBtns:{
    justifyContent:'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: '50%',
    width: '96%',
    marginHorizontal: '2%',

  },
  btns:{
     width: '47%',
     height: 55,
     backgroundColor: '#FF7400',
     borderRadius: 12,
     justifyContent: 'center',
     alignItems: 'center',
  },
   btnText:{
    color: '#fff',
    fontWeight: '500',
    fontSize: 20.

   }
})