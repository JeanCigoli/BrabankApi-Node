import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './login';
import CadastrarUser from './cadastro';
import Home from './home';

const Stack = createStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShow: false,
                    }}
                />

                <Stack.Screen
                    name="Cadastro"
                    component={CadastrarUser}
                    options={{
                        title: 'Faça seu cadastro',
                    }}
                />

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShow: false,
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default App;