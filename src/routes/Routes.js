import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../pages/Home'
import { Adicionar } from '../pages/Adicionar'
import { Editar } from '../pages/Editar'
import { AdicionarComodo } from '../pages/AdicionarComodo'
import { ListaOrcamento } from '../pages/ListaOrcamento'
const Routes = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>




            <Stack.Screen name='Home' options={{
                headerShown: false
            }} component={Home} />

            <Stack.Screen name='CADASTRO' options={{
                headerStyle: {
                    backgroundColor: '#040D12',

                },
                headerTitleAlign: 'center',
                headerTintColor: '#ddd'
            }} component={Adicionar} />

            <Stack.Screen options={{
                headerStyle: {
                    backgroundColor: '#040D12'
                },
                headerTintColor: '#ddd',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 22
                }
            }} name='Editar orçamento' component={Editar} />

            <Stack.Screen name='Lista orçamentos' options={{
                headerStyle: {
                    backgroundColor: '#040D12',
                },
                headerTintColor: '#ddd',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 26
                }
            }} component={ListaOrcamento} />


            <Stack.Screen options={{
                headerStyle:{
                    backgroundColor: '#040D12'
                },
                headerTintColor: '#ddd',
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontSize: 25
                }

            }} name='Adicionar comodo' component={AdicionarComodo} />
        </Stack.Navigator>

    )
}

export default Routes