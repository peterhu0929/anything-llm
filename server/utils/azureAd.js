const { Issuer } = require('openid-client');

let clientPromise;
async function getAzureClient() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const tenant = process.env.AZURE_AD_TENANT_ID || 'common';
      const issuer = await Issuer.discover(`https://login.microsoftonline.com/${tenant}/v2.0`);
      return new issuer.Client({
        client_id: process.env.AZURE_AD_CLIENT_ID,
        client_secret: process.env.AZURE_AD_CLIENT_SECRET,
        redirect_uris: [process.env.AZURE_AD_REDIRECT_URI],
        response_types: ['code'],
      });
    })();
  }
  return clientPromise;
}

module.exports = { getAzureClient };
