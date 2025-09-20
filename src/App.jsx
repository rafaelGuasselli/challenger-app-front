import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { Amplify } from 'aws-amplify';
import Config from "../env/public.config";
import { signUp, signIn, signOut, getCurrentUser, fetchUserAttributes, fetchAuthSession } from "@aws-amplify/auth";


// import DeletarConta from './pages/deletarConta';
// import Cadastro from './pages/cadastro';
import Login from './pages/login';
// import MudarSenha from './pages/mudarSenha';


Amplify.configure(Config.Amplify);
export default ()=>{
	return (
		<Login></Login>
	);
};