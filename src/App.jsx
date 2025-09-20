// src/App.jsx
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';



import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import DeletarConta from './pages/deletarConta';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ title: "Entrar" }}>
          {(props) => <Login {...props} signIn={signIn} />}
        </Stack.Screen>
        <Stack.Screen name="Cadastro" options={{ title: "Criar Conta" }}>
          {(props) => <Cadastro {...props} signUp={signUp} />}
        </Stack.Screen>
        <Stack.Screen name="DeletarConta" component={DeletarConta} options={{ title: "Deletar Conta" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
