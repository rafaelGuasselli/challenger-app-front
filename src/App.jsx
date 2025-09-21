// src/App.jsx
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nProvider, useI18n } from "./i18n";
import { TouchableOpacity, Text } from "react-native";

import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Home from "./pages/home";
import Profile from "./pages/profile";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { fetchI18nText, lang, setLang } = useI18n();
  const toggleLang = () => setLang(lang === "pt" ? "en" : "pt");

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleLang} style={{ marginRight: 12 }}>
              <Text style={{ color: "#1976d2", fontWeight: "600" }}>
                {lang.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: fetchI18nText("nav.loginTitle") }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: fetchI18nText("nav.registerTitle") }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: fetchI18nText("nav.homeTitle"),
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: fetchI18nText("nav.profileTitle") }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <I18nProvider initialLang="pt">
      <AppNavigator />
    </I18nProvider>
  );
}
