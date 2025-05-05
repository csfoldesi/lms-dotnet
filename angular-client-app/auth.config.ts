export const authConfig = {
  auth: {
    domain: import.meta.env.NG_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.NG_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
      audience: import.meta.env.NG_APP_AUTH0_AUDIENCE,
      redirect_uri: window.location.origin,
    },
  },
  httpInterceptor: {
    allowedList: [
      { uri: `${import.meta.env.NG_APP_API_URL}/*`, allowAnonymous: true },
    ],
  },
};
