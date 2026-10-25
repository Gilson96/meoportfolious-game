import {createStorefrontApiClient} from '@shopify/storefront-api-client';

const shopifyClient = createStorefrontApiClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION,
  publicAccessToken: import.meta.env.VITE_SHOPIFY_PUBLIC_ACCESS_TOKEN,
});

export const { data, errors } = await shopifyClient.request(`{ products(first: 12) { nodes { id title } } }`)