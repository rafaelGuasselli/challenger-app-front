const { REGION, USER_POOL_ID, USER_POOL_CLIENT_ID, HTTP_API } = {};

const awsconfig = {
	Auth: {
		Cognito: {
			userPoolId: "sa-east-1_5fkumoUWm",
			userPoolClientId: '1dkj2jorvqp0c72ov1tsf50pce',
			loginWith: { email: true },     
			allowGuestAccess: false, 
		},
	}
};

export default awsconfig;