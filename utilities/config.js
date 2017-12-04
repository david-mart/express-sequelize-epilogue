/* eslint-disable no-process-env */

export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  isProd: () => process.env.NODE_ENV === 'production',
  authSecret: process.env.AUTH_SECRET,
  authTokenExpiration: process.env.AUTH_TOKEN_EXPIRATION || '7d',
  googleOauthScopes: ['email', 'openid', 'profile'],
  databaseConnection: {
    database: 'postgres',
    host: '/cloudsql/geo-cbre:us-central1:cbre-dev',
    dialect: 'postgres',
    username: 'postgres',
    password: '7CxBrzlfbpi9mHOJ'
  },
  connectionName: 'geo-cbre:us-central1:cbre-dev'
};