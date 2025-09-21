// src/App.jsx
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { Amplify } from 'aws-amplify';
import Config from "../env/public.config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Profile from './pages/profile';

Amplify.configure(Config.Amplify);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: "Entrar" }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: "Criar Conta" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Perfil" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
