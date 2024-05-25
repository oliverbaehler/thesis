const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const fetch = require('node-fetch');
const { AuthorizationCode } = require('simple-oauth2');
const admin = require('firebase-admin').initializeApp(functions.config().firebase);
const serviceAccount = require('../serviceAccount.json');


const app = express();
app.use(cookieParser());

const credentials = {
  client: {
    id: functions.config().instagram.client_id,
    secret: functions.config().instagram.client_secret,
  },
  auth: {
    tokenHost: 'https://api.instagram.com',
    tokenPath: '/oauth/access_token',
    authorizePath: '/oauth/authorize',
  },
};

const oauth2 = new AuthorizationCode(credentials);

const OAUTH_REDIRECT_PATH = '/auth/redirect';
const OAUTH_CALLBACK_PATH = '/auth/instagram-callback';
const OAUTH_SCOPES = 'basic';

app.get(OAUTH_REDIRECT_PATH, (req, res) => {
  const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
  const secureCookie = req.get('host').indexOf('localhost:') !== 0;
  res.cookie('state', state, { maxAge: 3600000, secure: secureCookie, httpOnly: true });
  
  const redirectUri = oauth2.authorizeURL({
    redirect_uri: `https://${req.get('host')}${OAUTH_CALLBACK_PATH}`,
    scope: OAUTH_SCOPES,
    state: state,
  });
  
  res.redirect(redirectUri);
});

app.get(OAUTH_CALLBACK_PATH, async (req, res) => {
  const { code, state } = req.query;
  const cookies = req.cookies;

  if (!cookies.state || cookies.state !== state) {
    return res.status(400).send('State validation failed');
  }

  try {
    const tokenConfig = {
      code: code,
      redirect_uri: `https://${req.get('host')}${OAUTH_CALLBACK_PATH}`,
    };
    const accessTokenResult = await oauth2.getToken(tokenConfig);
    const { access_token } = accessTokenResult.token;

    const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
    const userData = await userResponse.json();

    const uid = `instagram:${userData.id}`;
    await admin.auth().updateUser(uid, {
      displayName: userData.username,
    }).catch(async (error) => {
      if (error.code === 'auth/user-not-found') {
        await admin.auth().createUser({
          uid: uid,
          displayName: userData.username,
        });
      } else {
        throw error;
      }
    });

    const firebaseToken = await admin.auth().createCustomToken(uid);
    res.json({ firebaseToken });

  } catch (error) {
    console.error('Error during Instagram OAuth callback:', error);
    res.status(500).send('Authentication error');
  }
});

exports.instagramAuth = functions.https.onRequest(app);