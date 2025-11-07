export const cognitoConfig = {
  userPoolId: "ap-south-1_rBoUt6th2",
  userPoolClientId: "5jhccavqudl83o7347e4jqjlnd",
  region: "ap-south-1",
  oauth: {
    domain: "ap-south-1rbout6th2.auth.ap-south-1.amazoncognito.com",
    scope: ["email", "openid", "profile"],
    redirectSignIn: "http://localhost:3000/",
    redirectSignOut: "http://localhost:3000/",
    responseType: "code",
  },
};