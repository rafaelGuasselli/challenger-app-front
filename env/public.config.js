export default {
  Amplify: {
    Auth: {
      Cognito: {
        userPoolId: "sa-east-1_5fkumoUWm",
        userPoolClientId: "1dkj2jorvqp0c72ov1tsf50pce",
        loginWith: {
			email: true,
			oauth: {
			  // Cognito Hosted UI domain WITHOUT protocol
			  // Example: "your-domain.auth.sa-east-1.amazoncognito.com"
			  domain: "https://challengers-app.auth.sa-east-1.amazoncognito.com",
			  scopes: ["openid", "email", "profile"],
			  redirectSignIn: [
				"myapp://"
			  ],
	
			  redirectSignOut: [
				"myapp://"
			  ],
	
			  responseType: "code",
			}
        },

        signUpVerificationMethod: "link",
      },
    },
  },
};
