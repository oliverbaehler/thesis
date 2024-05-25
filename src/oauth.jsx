const credentials = {
  client: {
    id: process.env.INSTAGRAM_CLIENT_ID,
    secret: process.env.INSTAGRAM_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://api.instagram.com',
    tokenPath: '/oauth/access_token'
  }
 };

const oauth2 = require('simple-oauth2').create(credentials);