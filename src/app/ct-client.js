import {
    ClientBuilder,
    createHttpClient,
    createAuthForClientCredentialsFlow,
  } from '@commercetools/sdk-client-v2'
import SdkAuth from '@commercetools/sdk-auth';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import fetch from 'node-fetch'
import { commerceToolsConfig } from '../../config/config';
import axios from 'axios';

const { projectKey, clientId, clientSecret, apiUrl, authUrl, username, password } = commerceToolsConfig;

const authClient = new SdkAuth({
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  disableRefreshToken: false,
  scopes: [`manage_project:${projectKey}`],
  fetch,
});

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

  function getCarts() {
    return apiRoot.withProjectKey({ projectKey }).carts().get().execute()
  }

  function getCartByUserId(customerId) {
    return apiRoot.withProjectKey({ projectKey }).carts().withCustomerId({customerId}).get().execute()
  }

  const getToken = async () => {
    try {
      const response = await axios.post(
        `${authUrl}/oauth/token`,
        null,
        {
          auth: {
            username: clientId,
            password: clientSecret,
          },
          params: {
            grant_type: 'client_credentials',
            scope: `manage_project:${projectKey}`,
          },
        }
      );
  
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };



  const obtainAccessToken = async () => {

    const customerToken = await authClient.customerPasswordFlow({
      username: username,
      password: password,
      });

        return customerToken;
    };

  const checkoutConfig = {
    projectKey: 'commercetools-dev-project-crkn',
    applicationKey: 'RY7vGZ1FMETr96',
    host: 'https://app.checkout.europe-west1.gcp.commercetools.com',
    callbackUrl: 'https://frontend-test.mms.precomposer.shop/en'
}

  module.exports = {
    getProjectDetails,
    getCategories,
    getCarts,
    getToken,
    obtainAccessToken,
    checkoutConfig,
    getCartByUserId
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
