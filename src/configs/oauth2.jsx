const fastify = require('fastify')({ logger: { level: 'trace' } })
const oauthPlugin = require('@fastify/oauth2')

fastify.register(oauthPlugin, {
    name: 'instagram',
    credentials: {
      client: {
          id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
          secret: process.env.INSTAGRAM_CLIENT_SECRET,
      },
      auth: {
        tokenHost: 'https://api.instagram.com',
        tokenPath: '/oauth/access_token',
        authorizePath: '/oauth/authorize',
      },
    },
    // register a fastify url to start the redirect flow
    startRedirectPath: '/login/instagram',
    // facebook redirect here after the user login
    callbackUri: '/login/instagram/callback'
})


// This is the new endpoint that initializes the OAuth2 login flow
fastify.get('/login/instagram', {}, (req, reply) => {
    fastify.instagram.generateAuthorizationUri(
      req,
      reply,
      (err, authorizationEndpoint) => {
       if (err) console.error(err)
       reply.redirect(authorizationEndpoint)
      }
    );
  });

  fastify.get('/login/instagram/callback', async function (request, reply) {
    const { token } = await this.instagram.getAccessTokenFromAuthorizationCodeFlow(request)
    
    console.log(token.access_token)
  
    // if later need to refresh the token this can be used
    // const { token: newToken } = await this.getNewAccessTokenUsingRefreshToken(token)
  
    reply.send({ access_token: token.access_token })
  })
