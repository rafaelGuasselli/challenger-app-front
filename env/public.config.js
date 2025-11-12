export default {
  Amplify: {
    Auth: {
      Cognito: {
        userPoolId: "sa-east-1_5fkumoUWm",
        userPoolClientId: "1dkj2jorvqp0c72ov1tsf50pce",
        loginWith: {
			email: true,
			oauth: {
			  domain: "https://challengers-app.auth.sa-east-1.amazoncognito.com",
			  scopes: ["openid", "email", "profile"],
			  redirectSignIn: [
				"mychallengersapp://"
			  ],
			  redirectSignOut: [
				"mychallengersapp://"
			  ],
	
			  responseType: "code",
			}
        },

        signUpVerificationMethod: "link",
      },
    },
  },
};
