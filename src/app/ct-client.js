import {
    ClientBuilder,
    createHttpClient,
    createAuthForClientCredentialsFlow,
  } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import fetch from 'node-fetch'
import { commerceToolsConfig } from '../../config/config';

const { projectKey, clientId, clientSecret, apiUrl, authUrl } = commerceToolsConfig;

const authMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    oauthUri: '',
    scopes: [`manage_project:${projectKey}`],
    fetch,
  }
  
  const httpMiddlewareOptions = {
    host: apiUrl,
    fetch,
  }
  
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withMiddleware(createAuthForClientCredentialsFlow(authMiddlewareOptions))
    .withMiddleware(createHttpClient(httpMiddlewareOptions))
    .withUserAgentMiddleware()
    .build()
  
  const apiRoot = createApiBuilderFromCtpClient(client)

  function getProjectDetails() {
    return apiRoot.withProjectKey({ projectKey }).get().execute()
  }

  function getCategories() {
    return apiRoot.withProjectKey({ projectKey }).categories().get().execute()
  }
  
  module.exports = {
    getProjectDetails,
    getCategories
  }
  

// import { createClient, createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-client';
// import { createMiddleware } from '@commercetools/sdk-middleware-http';
// import { createAuthMiddlewareForClientCredentialsFlowWithLogout } from '@commercetools/sdk-middleware-auth';
// import { commerceToolsConfig } from '../../config/config';

// const { projectKey, clientId, clientSecret, apiUrl } = commerceToolsConfig;

// const client = createClient({
//   middlewares: [
//     createAuthMiddlewareForClientCredentialsFlow({
//       host: apiUrl,
//       projectKey,
//       credentials: {
//         clientId,
//         clientSecret,
//       },
//       scopes: [],
//     }),
//     createMiddleware({
//       host: apiUrl,
//     }),
//   ],
// });

// export default client;
