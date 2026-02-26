/**
 * Shopify Customer API - Storefront API
 * Login, Register, Orders, Addresses, Profile
 */

import { storefrontApiRequest } from './shopify';

// --- Mutations ---

export const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_UPDATE_MUTATION = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        email
        firstName
        lastName
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_RECOVER_MUTATION = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_CREATE = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_UPDATE = `
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_DELETE = `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_DEFAULT_ADDRESS_UPDATE = `
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// --- Queries ---

export const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      defaultAddress {
        id
        address1
        address2
        city
        province
        zip
        country
        firstName
        lastName
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            zip
            country
            firstName
            lastName
            phone
          }
        }
      }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 50) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    title
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
            shippingAddress {
              address1
              city
              zip
              country
            }
            statusUrl
          }
        }
      }
    }
  }
`;

// --- Types ---

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  defaultAddress: ShopifyAddress | null;
  addresses: { edges: Array<{ node: ShopifyAddress }> };
  orders: { edges: Array<{ node: ShopifyOrder }> };
}

export interface ShopifyAddress {
  id: string;
  address1: string;
  address2: string | null;
  city: string;
  province: string | null;
  zip: string;
  country: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: { amount: string; currencyCode: string };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          title: string;
          price: { amount: string; currencyCode: string };
          image: { url: string; altText: string | null } | null;
        } | null;
      };
    }>;
  };
  shippingAddress: { address1: string; city: string; zip: string; country: string } | null;
  statusUrl: string;
}

// --- API Functions ---

export async function loginCustomer(email: string, password: string) {
  const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE, {
    input: { email, password },
  });
  const result = data?.data?.customerAccessTokenCreate;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
  return result?.customerAccessToken;
}

export async function registerCustomer(input: { email: string; password: string; firstName?: string; lastName?: string }) {
  const data = await storefrontApiRequest(CUSTOMER_CREATE_MUTATION, { input });
  const result = data?.data?.customerCreate;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
  return result?.customer;
}

export async function logoutCustomer(accessToken: string) {
  await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_DELETE, { customerAccessToken: accessToken });
}

export async function fetchCustomer(accessToken: string): Promise<ShopifyCustomer | null> {
  const data = await storefrontApiRequest(CUSTOMER_QUERY, { customerAccessToken: accessToken });
  return data?.data?.customer || null;
}

export async function updateCustomer(accessToken: string, updates: { firstName?: string; lastName?: string; email?: string; phone?: string }) {
  const data = await storefrontApiRequest(CUSTOMER_UPDATE_MUTATION, {
    customerAccessToken: accessToken,
    customer: updates,
  });
  const result = data?.data?.customerUpdate;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
  return result?.customer;
}

export async function recoverCustomer(email: string) {
  const data = await storefrontApiRequest(CUSTOMER_RECOVER_MUTATION, { email });
  const result = data?.data?.customerRecover;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
}

export async function createAddress(accessToken: string, address: Omit<ShopifyAddress, 'id'>) {
  const data = await storefrontApiRequest(CUSTOMER_ADDRESS_CREATE, {
    customerAccessToken: accessToken,
    address,
  });
  const result = data?.data?.customerAddressCreate;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
  return result?.customerAddress;
}

export async function updateAddress(accessToken: string, id: string, address: Partial<Omit<ShopifyAddress, 'id'>>) {
  const data = await storefrontApiRequest(CUSTOMER_ADDRESS_UPDATE, {
    customerAccessToken: accessToken,
    id,
    address,
  });
  const result = data?.data?.customerAddressUpdate;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
  return result?.customerAddress;
}

export async function deleteAddress(accessToken: string, id: string) {
  const data = await storefrontApiRequest(CUSTOMER_ADDRESS_DELETE, {
    customerAccessToken: accessToken,
    id,
  });
  const result = data?.data?.customerAddressDelete;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
}

export async function setDefaultAddress(accessToken: string, addressId: string) {
  const data = await storefrontApiRequest(CUSTOMER_DEFAULT_ADDRESS_UPDATE, {
    customerAccessToken: accessToken,
    addressId,
  });
  const result = data?.data?.customerDefaultAddressUpdate;
  if (result?.customerUserErrors?.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
}
