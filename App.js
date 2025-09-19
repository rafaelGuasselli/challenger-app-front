import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { Amplify } from 'aws-amplify';
import { StyleSheet, Text, View } from 'react-native';
import { signUp, signIn, signOut, getCurrentUser, fetchUserAttributes, fetchAuthSession } from "@aws-amplify/auth";


Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: "sa-east-1_5fkumoUWm",
			userPoolClientId: '1dkj2jorvqp0c72ov1tsf50pce',
			loginWith: {
				email: true
			},
			signUpVerificationMethod: 'code',
		},
	}
});


function App() {
	handleSignIn().then(() => {
		console.log("End");
	});


	return (
		<View style={styles.container}>
			<Text>Hello world! </Text>
		</View>
	);
}

async function handleSignIn() {

	try {
		await signOut();
		//await signOut();
		console.log("a");
		const user = await signIn({
			username: "rafael.g.l.silva@gmail.com",
			password: "Banana12",
			options: {
				authFlowType: 'USER_PASSWORD_AUTH'
			}
		}).catch(err=>console.log(err));

		console.log("Sign-in successful:", user);

		const userInfo = await getCurrentUser();
  		console.log('User:', userInfo);

		const attrs = await fetchUserAttributes();
		console.log('Attributes:', attrs);
		
		const session = await fetchAuthSession();
		console.log(session);

		// user object contains session data, challenge info, etc.
	} catch (error) {
		console.error("Error signing in:", error);
	}
}


export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
